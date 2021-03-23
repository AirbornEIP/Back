const fetch = require("node-fetch")

async function getText(url) {
    const res = await fetch(url)

    if (res.status !== 200) {
        throw new Error(`response error ${res.status} status code`)
    }

    return await res.text()
}

module.exports = {
    getText
}
