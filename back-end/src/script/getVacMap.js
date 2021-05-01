const puppeteer = require('puppeteer');
const fetch = require('node-fetch')
const cron = require('node-cron');


function getName(pdf) {
    let i = pdf.search("AD-2.")
    pdf = pdf.slice(i + 5)
    i = pdf.search('.pdf')
    pdf = pdf.slice(0, i)
    return (pdf)
}



async function script() {
    await getVacMap()
    cron.schedule('* * * 1 * *', async function() {
        await getVacMap()
  });
}
async function sendResult(jsons) {
    try {
        await fetch('http://localhost:8080/api/vac/update', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'ScriptToken': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhpZXUudGVyY2FuZkBlcGl0ZWNoLmV1IiwiaWQiOiI1ZmNmZDQ2MmFmOGFkZjAxYTFiY2QzMDMiLCJ1c2VybmFtZSI6Ik1hdGhpZXU5NCIsImlhdCI6MTYwNzQ2MTM1M30.2LTHyRwj2dZRkyAFiz2xVag3LF_Lt8kivPiqh-zWKNA",
            },
            body: JSON.stringify({
                "data": jsons
            })
        })
    } catch (e) {
        console.log(e)
    }
}

async function getVacMap() {
        const browser = await puppeteer.launch({
            headless: false,
            // executablePath:'/Applications/Chromium.app/Contents/MacOS/Chromium'
        });
        try {    
            const lastResult = []
            const page = await browser.newPage();
            await page.setViewport({width: 1920, height: 1080});
            await page.goto('https://www.sia.aviation-civile.gouv.fr/', {waitUntil: 'networkidle0'})
            let href = await page.$eval('li a[id="ui-id-14"]', (elm) => elm.href);
            let search = href.search("eAIP")
            href = href.slice(search)
            search = href.search('/')
            href = href.slice(0, search)
            await page.goto('https://www.sia.aviation-civile.gouv.fr/dvd/' + href + '/Atlas-VAC/FR/VACProduitPartie.htm', {waitUntil: 'networkidle0'})
            const options = await page.$$('select option[value]')
            const okButton = await page.$('input[value="OK"]')
            let link = [];
            for (let i = 416; options[i]; i++) { // 415
                await options[i].click()
                await okButton.click()
                const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
                const popup = await newPagePromise;
                link.push(popup.url())
                await browser.close()
            }
            await page.close()
           
            let jsons = []
            let json = {}
            for (let i = 0; link.length > i; i++) {
                json = {
                    name: getName(link[i]),
                    link: link[i]
                    }
                jsons.push(json)
                }   
                if (lastResult === jsons) {
                    // exec toutes les 3H ici
                    
                    // cron.schedule('* * 3 * * *', async function() {
                    //    return await getVacMap()
                    // });                    
                }
                return jsons;
        } catch(e) {
            console.log(e)
             browser.close();
            }
        
} 

 script()