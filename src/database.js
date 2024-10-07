const mysql = require('mysql2')
const http = require('http')
const config = require('dotenv')
const { threadId } = require('worker_threads')
config.config()

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
    
})


// connect and test with the database.
connection.connect((err) => {
    if (err) {
        console.log('Error connecting with the database: ', err.stack)
        return
    }
    console.log('Connected as user ID : ', threadId)
})


module.exports = connection