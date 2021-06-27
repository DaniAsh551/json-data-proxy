# API Reference
### Note:
![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `Never manually invoke methods which begin with '_' as they are meant for internal use within the JsonProxy.`


* [json-proxy](#module_json-proxy)
    * [~JsonProxy](#module_json-proxy..JsonProxy)
        * [.addListener(listener)](#module_json-proxy..JsonProxy+addListener) ⇒ <code>number</code>
        * [.removeListener(id)](#module_json-proxy..JsonProxy+removeListener)
        * [._refreshProxy()](#module_json-proxy..JsonProxy+_refreshProxy)
        * [._onContentChange(jsonProxy)](#module_json-proxy..JsonProxy+_onContentChange)
        * [.destroy()](#module_json-proxy..JsonProxy+destroy)

<a name="module_json-proxy..JsonProxy"></a>

### json-proxy~JsonProxy
Provides an interface to manage JSON data parity between FS and in-code.

**Kind**: inner property of [<code>json-proxy</code>](#module_json-proxy)  
**Example**  
```js
const JsonProxy = require('json-proxy');
```

* [~JsonProxy](#module_json-proxy..JsonProxy)
    * [.addListener(listener)](#module_json-proxy..JsonProxy+addListener) ⇒ <code>number</code>
    * [.removeListener(id)](#module_json-proxy..JsonProxy+removeListener)
    * [._refreshProxy()](#module_json-proxy..JsonProxy+_refreshProxy)
    * [._onContentChange(jsonProxy)](#module_json-proxy..JsonProxy+_onContentChange)
    * [.destroy()](#module_json-proxy..JsonProxy+destroy)

<a name="module_json-proxy..JsonProxy+addListener"></a>

#### jsonProxy.addListener(listener) ⇒ <code>number</code>
Adds a listener to the queue.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-proxy..JsonProxy)  
**Returns**: <code>number</code> - Unique id for the listener.  

| Param | Type |
| --- | --- |
| listener | <code>Array.&lt;VoidFunction&gt;</code> | 

<a name="module_json-proxy..JsonProxy+removeListener"></a>

#### jsonProxy.removeListener(id)
Removes a listener from the queue.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-proxy..JsonProxy)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Unique id for the listener. |

<a name="module_json-proxy..JsonProxy+_refreshProxy"></a>

#### jsonProxy.\_refreshProxy()
Reconstructs the proxy to reflect latest changes.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-proxy..JsonProxy)  
<a name="module_json-proxy..JsonProxy+_onContentChange"></a>

#### jsonProxy.\_onContentChange(jsonProxy)
Fired when an FS change is detected.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-proxy..JsonProxy)  

| Param |
| --- |
| jsonProxy | 

<a name="module_json-proxy..JsonProxy+destroy"></a>

#### jsonProxy.destroy()
Destroys this instance of JsonProxy.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-proxy..JsonProxy)  
