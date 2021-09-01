// eslint-disable-next-line import/no-unresolved
const fetch = require('node-fetch');
const vacPlan = require('../models/VacPlan.Model');
// eslint-disable-next-line func-names
exports.script = async function () {
    // eslint-disable-next-line no-use-before-define
    await getVacMap();
};

// eslint-disable-next-line consistent-return
async function getVacMap() {
    try {
        let html = await fetch('https://www.sia.aviation-civile.gouv.fr/\'');
        html = await html.text();
        const findLink = html.search('https://www.sia.aviation-civile.gouv.fr/documents/htmlshow?');
        html = html.substring(findLink);
        const endLink = html.search("'");
        html = html.substring(0, endLink);
        const startDate = html.search('dvd/');
        html = html.substring(startDate + 4);
        const endDate = html.search('/');
        const date = html.substring(0, endDate);

        if (!date) {
            return 84;
        }
        const airport = await fetch(`https://www.sia.aviation-civile.gouv.fr/dvd/${date}/Atlas-VAC/Javascript/AeroArraysVac.js`);
        let arrayAirport = await airport.text();
        // eslint-disable-next-line prefer-destructuring
        arrayAirport = arrayAirport.match('var vaerosoussection =new Array[(](.*)[)]')[1];
        arrayAirport = arrayAirport.replace(/"/g, '');
        arrayAirport = arrayAirport.split(',');
        if (!arrayAirport || arrayAirport.lenght < 1) {
            return (84);
        }
        // eslint-disable-next-line array-callback-return
        await Promise.all(arrayAirport.map(async (data) => {
            // eslint-disable-next-line new-cap
            const plan = new vacPlan({
                link: `https://www.sia.aviation-civile.gouv.fr/dvd/${date}/Atlas-VAC/PDF_AIPparSSection/VAC/AD/AD-2.${data}.pdf`,
                name: data,
            });
            await plan.save();
        }));
        console.log('Vac plan saved');
    } catch (e) {
        return console.log(e);
    }
}

getVacMap();
