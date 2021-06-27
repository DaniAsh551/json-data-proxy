import JsonProxy from "./index";
import fs from "fs";
import { emit } from "process";

describe("test if file is created", function () {
    it("should create file named '[0-9]_data.json'", function () {
        const testFile = "0_data.json";
        const testPath = `./${testFile}`;
        var jp = new JsonProxy<Array<number>>(testPath, []);
        expect(fs.existsSync(testPath));
        let content = fs.readFileSync(testPath, { encoding:"utf8" });
        expect(content).toBe("[]");
        jp.destroy();
        fs.rmSync(testPath);
    });
    it("should be interactible", function () {
        const testFile = "1_data.json";
        const testPath = `./${testFile}`;
        var jp = new JsonProxy<Array<number>>(testPath, []);
        var number = 123;
        if(!jp.proxy){
            jp.destroy();
            fs.rmSync(testPath);
            throw "proxy is inaccesible";
        }
        jp.proxy.push(number);
        expect(jp.proxy[0]).toBe(number);
        jp.destroy();
        fs.rmSync(testPath);
    });
});