const MongoClient = require('mongodb').MongoClient;
const dbName = "keitykla";
const URL = "mongodb+srv://exchangeApp:DataBase123@cluster0.agzgr.mongodb.net/keitykla?retryWrites=true&w=majority";
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
        // console.log(r);
        return r;
    } catch (err) {
        console.log(err.stack);
    } finally {
        client.close();
    }
}

// const schema = new mongoose.Schema({
//     // Use the `accessToken` string itself as `_id` so you get an
//     // index for fast queries.
//     _id: String,
//     userId: String
//   });
  
//   const AccessToken = mongoose.model('AccessToken', schema);

module.exports = {store, find};