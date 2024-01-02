//require express and database
const express = require("express");
const cors = require("cors");
const app = require("./appserver");
const fetch = require("node-fetch");
const web = express();
const LOCALHOST = "localhost"
const APPSERVERPORT = "3501"
const WEBSERVERPORT = "3500"
const secretKey = 'key-key'; 

web.use(cors());
web.use(express.json());

web.post('/web/patient/', async (req, res) => {
    let response;
    let patientid = req.query.patientid;
    let type = req.query.type;
    let dentistid = req.query.dentistid;
    let formtype = req.query.formtype;

    if(patientid === undefined) patientid = '';
    if(type === undefined) type = '';
    if(dentistid === undefined) dentistid = '';
    if(formtype === undefined) formtype = '';

    const data = req.body;

    try {
        response = await fetch(
            `http://${LOCALHOST}:${APPSERVERPORT}/app/patient/?patientid=${patientid}&type=${type}&dentistid=${dentistid}&formtype=${formtype}`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            }
        );
        res.json(await response.json());
    } catch (error) {
        console.log('Error at webserver!\n' + error);
    }
});

web.post('/login', (req, res) => {
    const userId = 123; // Replace with your user's actual ID
    const token = jwt.sign({ id: userId }, secretKey, {
      expiresIn: 86400, // Token expires in 24 hours
    });
  
    res.json({ token });
  });

web.get('/web/patient', async (req, res) => {
    let response;
    let patientid = req.query.patientid;
    let type = req.query.type;
    let dentistid = req.query.dentistid;
    let formtype = req.query.formtype;
    let date = req.query.date;

    if(patientid === undefined) patientid = '';
    if(type === undefined) type = '';
    if(dentistid === undefined) dentistid = '';
    if(formtype === undefined) formtype = '';
    if(date === undefined) date = '';

    try {
        response = await fetch(
            `http://${LOCALHOST}:${APPSERVERPORT}/app/patient/?patientid=${patientid}&type=${type}&dentistid=${dentistid}&formtype=${formtype}&date=${date}`, {
                method: 'GET',
                headers: { 'Content-Type' : 'application/json'},
            }
        );
        res.json(await response.json());
    } catch (error) {
        console.log('Error at webserver!\n' + error);
    }
});

web.put('/web/patient', async (req, res) => {
    let response;
    let patientid = req.query.patientid;
    let type = req.query.type;
    let dentistid = req.query.dentistid;
    let formtype = req.query.formtype;
    let date = req.query.date;

    if(patientid === undefined) patientid = '';
    if(type === undefined) type = '';
    if(dentistid === undefined) dentistid = '';
    if(formtype === undefined) formtype = '';
    if(date === undefined) date = '';

    const data = req.body

    try {
        response = await fetch(
            `http://${LOCALHOST}:${APPSERVERPORT}/app/patient/?patientid=${patientid}&type=${type}&dentistid=${dentistid}&formtype=${formtype}&date=${date}`, {
                method: 'PUT',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            }
        );
        res.json(await response.json());
    } catch (error) {
        console.log('Error at webserver!\n' + error);
    }
});

web.listen(WEBSERVERPORT, LOCALHOST, () => {
    console.log("server has started on port " + WEBSERVERPORT);
});