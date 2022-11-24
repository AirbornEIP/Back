const fs = require('fs-extra');

async function writeFile(path: string, content: string) {
    await fs.outputFile(path, content);
}

async function readFile(path: string) {
    // eslint-disable-next-line no-return-await
    return await fs.readFile(path, 'utf8');
}

async function writeJsonFile(path: string, obj: JSON) {
    await fs.outputFile(path, JSON.stringify(obj, null, 4));
}

async function readJsonFile(path: string) {
    // eslint-disable-next-line no-return-await
    return await fs.readJson(path);
}

module.exports = {
    writeFile,
    readFile,
    writeJsonFile,
    readJsonFile,
};
