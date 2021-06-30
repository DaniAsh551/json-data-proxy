/**
 * @module json-proxy
 */
import fs from "fs/promises";
import fsS from "fs";
import path from "path";
import chokidar from "chokidar";
import IJsonProxyOptions from "./json-proxy-options";

/**
 * @description Provides an interface to manage JSON data parity between FS and in-code.
 * @example
 * ```js
 * const JsonProxy = require('json-proxy');
 * ```
 */
class JsonProxy<T extends object> {
  /**
   * @type {IJsonProxyOptions}
   */
  options: IJsonProxyOptions;
  /**
   * @type {string}
   */
  jsonFilePath: string;
  /**
   * @type {Array<VoidFunction>|Array<null>}
   */
  changeListeners: Array<((p: any) => void) | null> = [];

  /**
   * @type {T}
   */
  internalJson: T;

  /**
   * @description The proxy object representing the JSON data. Make sure you bring all changes to this object.
   * @type {T}
   */
  proxy: T | undefined;

  /**
   * @type {Array<VoidFunction>}
   */
  changes: Array<(p: any) => void> = [];

  busy = false;

  /**
   * @type {chokidar.FSWatcher?}
   */
  watcher: chokidar.FSWatcher | null;

  /**
   * Creates a new instance of JsonProxy
   * @param {string} jsonFilePath The json file path on disk. A new file will be created if does not exist, else the existing file and its data will be used.
   * @param {any} defaultData The initial data to use if the file is being created for the first time.
   * @param {number} commitInterval The interval to check for changes and committing them to the json file on disk in milliseconds. Defaults to 50.
   */
  constructor(
    jsonFilePath: string,
    defaultData: any = {},
    options: IJsonProxyOptions = { async: false, commitInterval: 10 }
  ) {
    this.jsonFilePath = path.join(process.cwd(), jsonFilePath);
    this.internalJson = defaultData;
    this.options = options;

    let _continue = () => {
      let initContent = fsS.readFileSync(this.jsonFilePath, {
        encoding: "utf8",
      });
      this.internalJson = JSON.parse(initContent);

      //proceed normal operations because file exists
      this.watcher = chokidar.watch(this.jsonFilePath);
      this.watcher.on("change", () => this._onContentChange(this));

      this._refreshProxy();

      if (options?.async) {
        let that = this;
        (async function () {
          if (!that.busy && that.changes.length > 0) {
            that._update();
          }
        })();
      }
      setInterval(() => {}, options?.commitInterval ?? 10);
    };

    this.watcher = null;

    //create file if not exists
    if (
      !fsS.existsSync(this.jsonFilePath) ||
      fsS.readFileSync(this.jsonFilePath, { encoding: "utf8" }) == ""
    ) {
      fsS.writeFileSync(this.jsonFilePath, JSON.stringify(defaultData), {
        encoding: "utf8",
      });
      _continue();
      //fs.writeFile(this.jsonFilePath, JSON.stringify(defaultData), { encoding: "utf8" }).then(() => _continue());
    } else {
      _continue();
    }
  }

  /**
   * Adds a listener to the queue.
   * @param {Array<VoidFunction>} listener
   * @returns {number} Unique id for the listener.
   */
  addListener(listener: (p: any) => void) {
    this.changeListeners.push(listener);
    return this.changeListeners.length - 1;
  }

  /**
   * Removes a listener from the queue.
   * @param {number} id Unique id for the listener.
   */
  removeListener(id: number) {
    if (
      typeof id !== "number" ||
      isNaN(id) ||
      id >= this.changeListeners.length
    ) {
      throw Error("Invalid id");
    }

    this.changeListeners[id] = null;
  }

  /**
   * Reconstructs the proxy to reflect latest changes.
   * Warning: This will make the previous proxy object obsolete. This could be dangerous if the proxy object has been passed into other places.
   */
  _refreshProxy() {
    let _this = this;
    let handler = {
      get: function(target:any, key:string):any {
        if (typeof target[key] === 'object' && target[key] !== null) {
          return new Proxy(target[key], handler)
        } else {
          return target[key];
        }
      },
      set (target:any, key:string, value:any):boolean {
        let change = (json: any) => {
          target[key] = value;
        };
        _this.changes.push(change);

        //if not running in async mode, update synchronously now
        if (!_this.options?.async) {
          _this._update();
        }
        return true;
      }
    };
    this.proxy = new Proxy(this.internalJson, handler);
  }

  /**
   * @description Updates the file to reflect the latest JSON state.
   */
  _update() {
    if (this.busy || this.changes.length < 1) return;

    this.busy = true;
    let changes = [...this.changes];
    this.changes = [];
    let json = this.internalJson;
    changes.forEach((change) => change(json));

    let jsonString = JSON.stringify(json);

    if (this.options?.async) {
      let jp = this;
      fs.writeFile(this.jsonFilePath, jsonString).then(() => {
        jp.busy = false;
      });
      this.changeListeners.forEach((listener) =>
        listener ? listener(this.proxy) : {}
      );
    } else {
      fsS.writeFileSync(this.jsonFilePath, jsonString);
      this.busy = false;
      this.changeListeners.forEach((listener) =>
        listener ? listener(this.proxy) : {}
      );
    }
  }

  /**
   * Fired when an FS change is detected.
   * @param jsonProxy
   */
  _onContentChange(jsonProxy: any) {
    let content = fsS.readFileSync(jsonProxy.jsonFilePath, {
      encoding: "utf-8",
    });
    let update = () => {
      if (!jsonProxy.busy) {
        jsonProxy.busy = true;
        let newJson = JSON.parse(content);
        let newKeys = Object.keys(newJson);
        let oldKeys = Object.keys(jsonProxy.internalJson).filter(
          (k) => !newKeys.includes(k)
        );

        oldKeys.forEach((k) => (jsonProxy.internalJson[k] = undefined));
        newKeys.forEach((k) => (jsonProxy.internalJson[k] = newJson[k]));

        jsonProxy.busy = false;
        this.changeListeners.forEach((listener) =>
          listener ? listener(this.proxy) : {}
        );
      } else setTimeout(() => update(), this.options?.commitInterval ?? 10);
    };

    if (!this.busy) update();
    else {
      let schedule = () => {
        if (!this.busy) update();
        else setTimeout(schedule, this.options.commitInterval || 10);
      };
    }
  }

  /**
   * Destroys this instance of JsonProxy.
   */
  destroy() {
    this.watcher?.close();
    this.busy = true;
  }
}

export default JsonProxy;
