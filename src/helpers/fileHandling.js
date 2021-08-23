const fs = require('fs-extra');

async function writeFile(path, content) {
    await fs.outputFile(path, content);
}

async function readFile(path) {
    const resultat = await fs.readFile(path, 'utf8');
    return resultat;
}

async function writeJsonFile(path, obj) {
    await fs.outputFile(path, JSON.stringify(obj, null, 4));
}

async function readJsonFile(path) {
    const resultat = await fs.readJson(path);
    return resultat;
}

module.exports = {
    writeFile,
    readFile,
    writeJsonFile,
    readJsonFile,
};
