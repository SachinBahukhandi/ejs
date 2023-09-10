let mysql = require('mysql');

let conn = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    database: 'resume',
    user: 'root',
    password: 'Sachin@123'
});


let readFn = (sql)=>{
    return new Promise((resolve, reject)=>{
        conn.query(sql,(error, results, fields)=>{
            if(error) reject(new Error(error));
            resolve(results);
        });
    });

};

let writeFn = (sql, params)=>{

    return new Promise((resolve, reject)=>{
        conn.query(sql,(error, results, fields)=>{
            if(error) reject(new Error(error));

            resolve(results);

        });
    });

};

module.exports={
    conn,
    readFn,
    writeFn
};