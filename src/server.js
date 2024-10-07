const express = require('express')
const http = require('http')
const app = express()
const config = require('dotenv')
config.config()
const db = require('./database')

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/get/patients', async(req, res) => {
    const getUsers = `SELECT patient_id, first_name, last_name, date_of_birth FROM patients`;

    db.query(getUsers, (err, results) => {
        if (err){
            console.log('Query error', err.stack)
            return
        }
        res.send(results)
    })

})


app.get('/get/providers', async(req, res) => {
    const getUsers = `SELECT first_name, last_name, provider_specialty FROM providers`;

    db.query(getUsers, (err, results) => {
        if (err){
            console.log('Query error', err.stack)
            return
        }
        res.send(results)
    })

})



app.get('/get/by-firstName', async(req, res) => {
   try {
    const firstName = req.query.first_name;

    const getByFirstName = `SELECT * from patients where first_name = ?`

    db.query(getByFirstName, [firstName], (error, result) => {
        if (error) {
            console.log('Error', error.stack)
        }


        res.send(result)
    })
    
   } catch (error) {
    console.log(error)
   }

})



app.get('/get/providers/specialty', async(req, res) => {
   try {
    const provider_specialty= req.query.provider_specialty;

    const getBySpecialty= `SELECT * from providers where provider_specialty= ?`

    db.query(getBySpecialty, [provider_specialty], (error, result) => {
        if (error) {
            console.log('Error', error.stack)
        }
        res.send(result)
    })
    
   } catch (error) {
    console.log(error)
   }

})