const fetch = require('node-fetch');
const UpdateVac = require('../models/UpdateVac.Model');
const vacPlan = require('../models/VacPlan.Model');

const aerodrome = ['LFOI', 'LFBA', 'LFDA', 'LFMA', 'LFKJ', 'LFAQ', 'LFKA', 'LFCI', 'LFOF', 'LFMS', 'LFXA', 'LFHT', 'LFEF', 'LFAY', 'LFFI', 'LFCD', 'LFJR', 'LFBU', 'LFLP', 'LFLI', 'LFCH', 'LFAJ', 'LFEG', 'LFQD', 'LFNJ', 'LFHO', 'LFJF', 'LFEH', 'LFDH', 'LFLW', 'LFQF', 'LFLA', 'LFGE', 'LFMV', 'LFNT', 'LFRW', 'LFCB', 'LFAO', 'LFFL', 'LFSB', 'LFEU', 'LFFR', 'LFMR', 'LFKB', 'LFGF', 'LFOB', 'LFFO', 'LFNX', 'LFGG', 'LFEA', 'LFHN', 'LFHW', 'LFKY', 'LFIB', 'LFAM', 'LFBE', 'LFPD', 'LFNR', 'LFQM', 'LFSA', 'LFPF', 'LFMU', 'LFBZ', 'LFBS', 'LFOQ', 'LFCS', 'LFBD', 'LFDY', 'LFHS', 'LFLD', 'LFRB', 'LFEI', 'LFFN', 'LFHR', 'LFSL', 'LFFB', 'LFRK', 'LFCC', 'LFAC', 'LFKC', 'LFYG', 'LFMD', 'LFMK', 'LFNH', 'LFIG', 'LFDQ', 'LFMW', 'LFCX', 'LFCK', 'LFJH', 'LFIH', 'LFLH', 'LFQK', 'LFOK', 'LFLB', 'LFLE', 'LFJY', 'LFGX', 'LFQV', 'LFOR', 'LFMX', 'LFFH', 'LFTQ', 'LFOC', 'LFFU', 'LFLX', 'LFEJ', 'LFCA', 'LFQH', 'LFJA', 'LFDW', 'LFPX', 'LFPH', 'LFRC', 'LFOU', 'LFJC', 'LFLC', 'LFBG', 'LFGA', 'LFAD', 'LFID', 'LFJD', 'LFKT', 'LFGH', 'LFDV', 'LFPK', 'LFLJ', 'LFTF', 'LFBY', 'LFRG', 'LFAB', 'LFQZ', 'LFGI', 'LFSD', 'LFEB', 'LFRD', 'LFGJ', 'LFGR', 'LFON', 'LFAK', 'LFDE', 'LFFE', 'LFSW', 'LFSE', 'LFSG', 'LFQE', 'LFOX', 'LFFY', 'LFAE', 'LFAS', 'LFMF', 'LFLZ', 'LFKF', 'LFCF', 'LFOG', 'LFNO', 'LFFK', 'LFPQ', 'LFDX', 'LFDG', 'LFNA', 'LFKG', 'LFRF', 'LFCQ', 'LFEV', 'LFLS', 'LFLG', 'LFCE', 'LFES', 'LFSH', 'LFTH', 'LFEY', 'LFHA', 'LFEK', 'LFMI', 'LFIX', 'LFGK', 'LFFJ', 'LFCJ', 'LFQX', 'LFOL', 'LFHU', 'LFRE', 'LFFQ', 'LFFG', 'LFAL', 'LFTN', 'LFNQ', 'LFTZ', 'LFDR', 'LFRI', 'LFBH', 'LFKP', 'LFRJ', 'LFHL', 'LFSU', 'LFRO', 'LFRL', 'LFAF', 'LFHX', 'LFJV', 'LFOV', 'LFEL', 'LFMQ', 'LFOH', 'LFOY', 'LFMC', 'LFRM', 'LFNZ', 'LFPP', 'LFHP', 'LFAT', 'LFQL', 'LFXU', 'LFOO', 'LFDU', 'LFOM', 'LFMZ', 'LFDI', 'LFQQ', 'LFQO', 'LFBL', 'LFPL', 'LFGS', 'LFGL', 'LFRH', 'LFDL', 'LFQC', 'LFJU', 'LFKL', 'LFLY', 'LFHJ', 'LFLL', 'LFLM', 'LFFC', 'LFJI', 'LFTB', 'LFDM', 'LFML', 'LFQJ', 'LFJB', 'LFPE', 'LFHM', 'LFPM', 'LFNB', 'LFKX', 'LFQT', 'LFJL', 'LFCM', 'LFCZ', 'LFNC', 'LFMG', 'LFFW', 'LFEM', 'LFDB', 'LFSM', 'LFGM', 'LFAR', 'LFLQ', 'LFDC', 'LFLT', 'LFBK', 'LFNG', 'LFMT', 'LFHI', 'LFPU', 'LFRU', 'LFAX', 'LFHY', 'LFGB', 'LFBR', 'LFEX', 'LFSN', 'LFEZ', 'LFAI', 'LFRS', 'LFNN', 'LFFT', 'LFQG', 'LFMN', 'LFME', 'LFTW', 'LFBN', 'LFCN', 'LFGZ', 'LFCO', 'LFOJ', 'LFOZ', 'LFEC', 'LFLK', 'LFDJ', 'LFGN', 'LFPG', 'LFPB', 'LFPO', 'LFBP', 'LFBX', 'LFAG', 'LFHC', 'LFMP', 'LFPA', 'LFIP', 'LFQP', 'LFHD', 'LFFP', 'LFRP', 'LFBI', 'LFCP', 'LFSV', 'LFGO', 'LFSP', 'LFED', 'LFPT', 'LFEP', 'LFKO', 'LFTP', 'LFNW', 'LFEQ', 'LFRQ', 'LFER', 'LFQA', 'LFRN', 'LFAP', 'LFIR', 'LFIK', 'LFIL', 'LFLO', 'LFDN', 'LFCR', 'LFHE', 'LFYR', 'LFOP', 'LFCY', 'LFHF', 'LFIF', 'LFFD', 'LFRT', 'LFHG', 'LFPZ', 'LFGY', 'LFMH', 'LFGP', 'LFHQ', 'LFKM', 'LFIM', 'LFCG', 'LFIS', 'LFIY', 'LFKH', 'LFKE', 'LFBJ', 'LFNL', 'LFRZ', 'LFQN', 'LFDP', 'LFOW', 'LFLR', 'LFKR', 'LFSS', 'LFOS', 'LFLN', 'LFDF', 'LFYS', 'LFXB', 'LFMY', 'LFNE', 'LFDS', 'LFQU', 'LFGT', 'LFGU', 'LFEW', 'LFOD', 'LFQY', 'LFSJ', 'LFGQ', 'LFTM', 'LFFZ', 'LFNS', 'LFJS', 'LFKD', 'LFDK', 'LFST', 'LFGC', 'LFDT', 'LFBT', 'LFCT', 'LFET', 'LFBO', 'LFIT', 'LFBF', 'LFCL', 'LFFX', 'LFJT', 'LFEN', 'LFOT', 'LFPN', 'LFQB', 'LFCU', 'LFNU', 'LFLU', 'LFAV', 'LFNV', 'LFRV', 'LFAU', 'LFIV', 'LFGW', 'LFQW', 'LFLV', 'LFHH', 'LFFV', 'LFCV', 'LFHV', 'LFCW', 'LFAW', 'LFNF', 'LFQS', 'LFSK', 'LFYV'];
const date = '08 SEP 2022';
let nextUpdate = '';

exports.script = async function () {
    let dateSave = await UpdateVac.find();
    if (dateSave.length === 0) {
        dateSave = await UpdateVac.create({
            currentDate: date.replace(/ /g, '_'),
        });
        await dateSave.save();
    } else {
        nextUpdate = dateSave.nextUpdate;
    }
    await getVacMap();
};

async function getVacMap() {
    try {
        const vacDate = await UpdateVac.find();
        const link = `https://www.sia.aviation-civile.gouv.fr/dvd/eAIP_${vacDate[0].currentDate}/Atlas-VAC/FR/header.htm`;
        let page = await fetch(link);
        page = await page.text();
        page = page.split('\n');

        nextUpdate = page[16].split('<span class=\'headerDate\'>');
        nextUpdate[1] = nextUpdate[1].split('<');
        await UpdateVac.findOneAndUpdate({ nextUpdate: nextUpdate[1][0].replace(/ /g, '_') });
        await vacPlan.remove();
        await Promise.all(aerodrome.map(async (data) => {
            const plan = await vacPlan.create({
                link: `https://www.sia.aviation-civile.gouv.fr/dvd/eAIP_${vacDate[0].currentDate}/Atlas-VAC/PDF_AIPparSSection/VAC/AD/AD-2.${data}.pdf`,
                name: data,
            });
            await plan.save();
        }));

        console.log('Vac plan saved');
    } catch (e) {
        const data = await UpdateVac.find();
        UpdateVac.findOneAndUpdate({}, { currentDate: data.nextUpdate });
        console.log('ERROOOOOR');
        return console.log(e);
    }
}

// getVacMap();

