const axios = require('axios');
const xml2js = require('xml2js');
const db = require('./database');
const parser = new xml2js.Parser();

const fetch = async() => {
    const xmlData = await axios.get('https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates?tp=lt');
    const jsonData = await parser.parseStringPromise(xmlData.data);
    
    const date = jsonData.FxRates.FxRate[0].Dt[0];
    const cc = jsonData.FxRates.FxRate.reduce((acc, val) => {
        const ccamt = val.CcyAmt[1];
        if (!acc.rates[ccamt.Ccy]) {
            acc.rates[ccamt.Ccy] = ccamt.Amt[0];
        }
        return acc;
    }, {date, rates: {}});
    return cc;

}

const getRates = async() => {
    const date = new Date ().toISOString().split('T')[0];
    let data = await db.find(date);
    if (!data) {
        console.log("Data not found, fetching from service");
        data = await fetch();
        await db.store(data);
        console.log("Storing to database");
    }
    return data;
}

const storeUser = async(userId) => {
    await db.storeUsers(userId);
}


module.exports = {getRates, storeUser};