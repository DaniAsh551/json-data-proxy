/**
 * @module json-proxy
 * @description Options for JsonProxy
 */
interface IJsonProxyOptions {
    /**
     * @description Dictates whether JsonProxy should work asynchronously. If enabled, performace might improve but data could be out of sync.
     * @default false
     * @type {boolean}
     */
    async?:false,
    /**
     * @description Defines the amount of time between commits to the file in ms.
     * @default 10
     * @type {number}
     */
    commitInterval?:number,
    /**
     * @description File path of the JSON file to be used as data backend on the FileSystem.
     * @type {string}
     */
    jsonFilePath: string,
    /**
     * @description The default value for the data. If a new file creation is required, it would be with this data.
     * @type {any}
     */
    defaultData: any
}

export default IJsonProxyOptions;