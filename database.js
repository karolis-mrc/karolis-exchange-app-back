const MongoClient = require('mongodb').MongoClient;
const dbName = "keitykla";
// const URL = process.env.DATABASE_URL;
const URL = "mongodb+srv://exchangeApp:<password>@cluster0.agzgr.mongodb.net/<dbname>?retryWrites=true&w=majority";

const store = async (data) => {
    const client = new MongoClient(URL, {useNewUrlParser: true, useUnifiedTopology: true});

    try {
        await client.connect();
        console.log("connecting");
        const db = client.db(dbName);
        db.collection('rates').insertOne({_id: data.date, ...data});
    } catch (err) {
        console.log(err.stack);
    } finally {
        client.close();
    }
}

const find = async (date) => {
    const client = new MongoClient(URL, {useNewUrlParser: true, useUnifiedTopology: true});

    try {
        await client.connect();
        console.log("connecting");

        const db = client.db(dbName);
        const r = await db.collection('rates').findOne({date});
        return r;
    } catch (err) {
        console.log(err.stack);
    } finally {
        client.close();
    }
}

const storeUsers = async (data) => {
    const client = new MongoClient(URL, {useNewUrlParser: true, useUnifiedTopology: true});

    try {
        await client.connect();
        const db = client.db(dbName);
        db.collection('users_data').insertOne({'created_on' : new Date(), userId: data});
    } catch (err) {
        console.log(err.stack);
    } finally {
        client.close();
    }
}

module.exports = {store, find, storeUsers};