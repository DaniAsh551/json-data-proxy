# API Reference
### Note:
![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `Never manually invoke methods which begin with '_' as they are meant for internal use within the JsonProxy.`


* [json-data-proxy](#module_json-data-proxy)
    * [~JsonProxy](#module_json-data-proxy..JsonProxy)
        * [.addListener(listener)](#module_json-data-proxy..JsonProxy+addListener) ⇒ <code>number</code>
        * [.removeListener(id)](#module_json-data-proxy..JsonProxy+removeListener)
        * [._refreshProxy()](#module_json-data-proxy..JsonProxy+_refreshProxy)
        * [._update()](#module_json-data-proxy..JsonProxy+_update)
        * [._onContentChange(jsonProxy)](#module_json-data-proxy..JsonProxy+_onContentChange)
        * [.destroy()](#module_json-data-proxy..JsonProxy+destroy)

<a name="module_json-data-proxy..JsonProxy"></a>

### json-data-proxy~JsonProxy
Provides an interface to manage JSON data parity between FS and in-code.

**Kind**: inner property of [<code>json-data-proxy</code>](#module_json-data-proxy)  
**Example**  
```js
const JsonProxy = require('json-proxy');
```

* [~JsonProxy](#module_json-data-proxy..JsonProxy)
    * [.addListener(listener)](#module_json-data-proxy..JsonProxy+addListener) ⇒ <code>number</code>
    * [.removeListener(id)](#module_json-data-proxy..JsonProxy+removeListener)
    * [._refreshProxy()](#module_json-data-proxy..JsonProxy+_refreshProxy)
    * [._update()](#module_json-data-proxy..JsonProxy+_update)
    * [._onContentChange(jsonProxy)](#module_json-data-proxy..JsonProxy+_onContentChange)
    * [.destroy()](#module_json-data-proxy..JsonProxy+destroy)

<a name="module_json-data-proxy..JsonProxy+addListener"></a>

#### jsonProxy.addListener(listener) ⇒ <code>number</code>
Adds a listener to the queue.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-data-proxy..JsonProxy)  
**Returns**: <code>number</code> - Unique id for the listener.  

| Param | Type |
| --- | --- |
| listener | <code>Array.&lt;VoidFunction&gt;</code> | 

<a name="module_json-data-proxy..JsonProxy+removeListener"></a>

#### jsonProxy.removeListener(id)
Removes a listener from the queue.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-data-proxy..JsonProxy)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Unique id for the listener. |

<a name="module_json-data-proxy..JsonProxy+_refreshProxy"></a>

#### jsonProxy.\_refreshProxy()
Reconstructs the proxy to reflect latest changes.
Warning: This will make the previous proxy object obsolete. This could be dangerous if the proxy object has been passed into other places.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-data-proxy..JsonProxy)  
<a name="module_json-data-proxy..JsonProxy+_update"></a>

#### jsonProxy.\_update()
Updates the file to reflect the latest JSON state.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-data-proxy..JsonProxy)  
<a name="module_json-data-proxy..JsonProxy+_onContentChange"></a>

#### jsonProxy.\_onContentChange(jsonProxy)
Fired when an FS change is detected.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-data-proxy..JsonProxy)  

| Param |
| --- |
| jsonProxy | 

<a name="module_json-data-proxy..JsonProxy+destroy"></a>

#### jsonProxy.destroy()
Destroys this instance of JsonProxy.

**Kind**: instance method of [<code>JsonProxy</code>](#module_json-data-proxy..JsonProxy)  
