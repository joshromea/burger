const conn = require('../config/connection');

const questionMarkPrinter = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

const objToSql = (ob) => {
    let arr = [];

    for (let key in ob) {
        let value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

const orm = {
    selectAll: (tableInput, cb) => {
        let queryString = `SELECT * FROM ${tableInput};`;

        console.log(queryString);
        conn.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    },
    insertOne: (table, cols, vals, cb) => {
        let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${questionMarkPrinter(vals.length)}) `;

        console.log(queryString);
        conn.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    },
    updateOne: (table, objColVals, condition, cb) => {
        let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

        console.log(queryString);
        conn.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    }
}

module.exports = orm;