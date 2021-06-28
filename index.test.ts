import JsonProxy from "./index";
import fs from "fs";
import { emit } from "process";
import { threadId } from "worker_threads";
import {promisify} from "util";

const writeFileAsync = promisify(fs.writeFile);

const TEST_FILE_SUFFIX = ".testdata.json";

function sleep(ms:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

let lastIndex = -1;
const getTestFilePath = () => `./${++lastIndex}${TEST_FILE_SUFFIX}`;

describe("test if file is created", function () {
    it("should create file named '[0-9].testdata.json'", function () {
        const testPath = getTestFilePath();
        console.log('TEST_PATH', testPath);
        var jp = new JsonProxy<Array<number>>(testPath, []);
        expect(fs.existsSync(testPath));
        let content = fs.readFileSync(testPath, { encoding:"utf8" });
        expect(content).toBe("[]");
        jp.destroy();
        fs.rmSync(testPath);
    });
    it("should be interactible", function () {
        const testPath = getTestFilePath();
        console.log('TEST_PATH', testPath);
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

    it("should reflect FS changes", async function () {
        const commitInterval = 10;
        const testPath = getTestFilePath();
        console.log('TEST_PATH', testPath);
        var jp = new JsonProxy<Array<number>>(testPath, [], { async:false, commitInterval });
        jp.addListener(() => console.log("CHANGED"));
        var number = 123;
        if(!jp.proxy){
            jp.destroy();
            fs.rmSync(testPath);
            throw "proxy is inaccesible";
        }

        await writeFileAsync(testPath, JSON.stringify([number]))
        .then(async () => {
            await sleep(commitInterval * 100);
            if(!jp.proxy){
                jp.destroy();
                fs.rmSync(testPath);
                throw "proxy is inaccesible";
            }
            expect(jp.proxy[0]).toBe(number);
            jp.destroy();
            fs.rmSync(testPath);
        });
    }, 3000);
});

//prepare
beforeAll(async () => {
    await promisify(fs.readdir)("./").then(async files => {
        files.filter(fPath => fPath.endsWith(TEST_FILE_SUFFIX))
        .forEach(async (fPath) => promisify(fs.rm)(fPath));
    })
    .catch(e => {throw e;});
});

//cleanup
afterAll(async () => {
    let testFiles = Array.from(Array(lastIndex)).map((_,i) => `./${i}${TEST_FILE_SUFFIX}`);
    testFiles.forEach(async (fPath) => {
        await promisify(fs.stat)(fPath, { throwIfNoEntry: false }).then(async () => {
            promisify(fs.rm)(fPath);
        });
    });
});