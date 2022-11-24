const got = require('got');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const vacPlan = require('../models/VacPlan.Model.ts');

const vgmUrl = 'http://www.aero-hesbaye.be/vac/vac_fr.htm';
// eslint-disable-next-line import/order
const cron = require('node-cron');

const isMidi = (link) => {
    // renvoie false si l'attribut href n'est pas présent
    if (typeof link.href === 'undefined') { return false; }

    return link.href.includes('.pdf');
};

const noParens = (link) => {
    // Expression Régulière qui détermine si le texte comporte des parenthèses.
    const parensRegex = /^((?!\().)*$/;
    return parensRegex.test(link.textContent);
};

function getInitial(link) {
    const tab = link.split('.');
    return (tab[tab.length - 2]);
}

async function getVac() {
    const response = await got(vgmUrl);
    const dom = new JSDOM(response.body);

    const nodeList = [...dom.window.document.querySelectorAll('a')];

    nodeList.filter(isMidi).filter(noParens).forEach(async (link) => {
        const initial = getInitial(link.href);
        if (initial.length < 5) {
            const plan = await vacPlan.create({
                link: link.href,
                name: getInitial(link.href),
                fullName: link.text,
            });
            await plan.save();
        }
    });
    console.log('Vac plan savec');
}

const script = async function Vac() {
    await getVac();
    cron.schedule('0 0 */3 * * *', async () => {
        await vacPlan.collection.drop();
        await getVac();
    });
};
export default script;
