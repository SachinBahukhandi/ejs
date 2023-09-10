
const {MongoClient } = require('mongodb');

const connect = new MongoClient(process.env.DB || '');

const db = connect.db('todos');
const insertInto = () =>{
        new Promise((resolve, reject)=>{
            var myobj = { name: "Company Inc", address: "Highway 37" };
            connect.db()
        });
};
module.exports = {
    connect
};