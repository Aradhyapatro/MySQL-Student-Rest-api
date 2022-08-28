const sql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
let instance = null;

const conn = sql.createConnection({
    host: process.env.Host,
    user: process.env.Database_user,
    password: process.env.Database_password,
    database: process.env.Database_name,
    port: process.env.Port_number
})

class DbServices {
    static getDbServices() {
        return instance ? instance : new DbServices();
    }

    async getAll() {
        try {
            const res = await new Promise((resolve, reject) => {
                const sqlq = "select * from Student";
                conn.query(sqlq, (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(new Error(err.message));
                    } else {
                        console.log(results);
                        resolve(results);
                    }
                });
            });

            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async makePost(id, name, age) {
        try {
            const response = await new Promise((resolve, reject) => {
                const sqlq = "insert into Student(id,name,age) values (?,?,?);";
                conn.query(sqlq, [id, name, age], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    } else {
                        resolve(results);
                    }
                })
            })

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteId(id) {
        try {
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const sqlq = "delete from Student WHERE id = ?;";
                conn.query(sqlq, [id], (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(new Error(err.message))
                    } else {
                        resolve(results.affectedRows);
                    }
                })
            })
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const sqlq = "update Student set name=? where id=?";
                conn.query(sqlq, [name, id], (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(new Error(err.message))
                    } else {
                        resolve(results);
                    }
                })
            })
            console.log(response)
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbServices;