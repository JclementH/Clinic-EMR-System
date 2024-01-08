//require express and database
const express = require("express");
const cors = require("cors");
const app = require("./appserver");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const web = express();
const LOCALHOST = "localhost";
const APPSERVERPORT = "3501";
const WEBSERVERPORT = "3500";
const secretKey = "key-key";

web.use(cors());
web.use(express.json());

web.post("/web/patient/", async (req, res) => {
  let response;
  let patientid = req.query.patientid;
  let type = req.query.type;
  let dentistid = req.query.dentistid;
  let formtype = req.query.formtype;

  if (patientid === undefined) patientid = "";
  if (type === undefined) type = "";
  if (dentistid === undefined) dentistid = "";
  if (formtype === undefined) formtype = "";

  const data = req.body;

  try {
    response = await fetch(
      `http://${LOCALHOST}:${APPSERVERPORT}/app/patient/?patientid=${patientid}&type=${type}&dentistid=${dentistid}&formtype=${formtype}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    res.json(await response.json());
  } catch (error) {
    console.log("Error at webserver!\n" + error);
  }
});

web.post("/web/login", async (req, res) => {
  let validLogin = 0;
  try {
    response = await fetch(
      `http://${LOCALHOST}:${APPSERVERPORT}/app/dentist/?type=login&email=${req.body.email}&password=${req.body.password}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    validLogin = await response.json();
  } catch (error) {
    console.log("Error at webserver!\n" + error);
  }
  if (validLogin.length > 0) {
    const userId = validLogin[0].id; 
    
    const token = jwt.sign({ id: validLogin[0].id, nameFirst: validLogin[0].namefirst, nameMiddle: validLogin[0].namemiddle, nameLast: validLogin[0].namelast}, secretKey, {
      expiresIn: 86400, // Token expires in 24 hours
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid Email or Password' });
  }
});

web.get("/web/patient", async (req, res) => {
  let response;
  let patientid = req.query.patientid;
  let type = req.query.type;
  let dentistid = req.query.dentistid;
  let formtype = req.query.formtype;
  let date = req.query.date;
  let uuid = req.query.uuid;

  if (patientid === undefined) patientid = "";
  if (type === undefined) type = "";
  if (dentistid === undefined) dentistid = "";
  if (formtype === undefined) formtype = "";
  if (date === undefined) date = "";
  if (uuid === undefined) uuid = "";

  try {
    response = await fetch(
      `http://${LOCALHOST}:${APPSERVERPORT}/app/patient/?patientid=${patientid}&type=${type}&dentistid=${dentistid}&formtype=${formtype}&date=${date}&uuid=${uuid}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(await response.json());
  } catch (error) {
    console.log("Error at webserver!\n" + error);
  }
});

web.put("/web/accounting", async (req, res) => {
  let response;
  let patientid = req.query.patientid;
  let type = req.query.type;
  let name = req.query.name
  let quantity = req.query.quantity
  let unitcost = req.query.unitcost
  let expense = req.query.expense
  let expensetype = req.query.expensetype

  if (patientid === undefined) patientid = "";
  if (type === undefined) type = "";
  if (name === undefined) name = "";
  if (quantity === undefined) quantity = "";
  if (unitcost === undefined) unitcost = "";
  if (expense === undefined) expense = "";
  if (expensetype === undefined) expensetype = "";

  console.log(expense)
  try {
    response = await fetch(
      `http://${LOCALHOST}:${APPSERVERPORT}/app/accounting/?id=${patientid}&type=${type}&name=${name}&quantity=${quantity}&unitcost=${unitcost}&expense=${expense}&expensetype=${expensetype}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(await response.json());
  } catch (error) {
    console.log("Error at webserver!\n" + error);
  }
});

web.get("/web/accounting", async (req, res) => {
  let response;
  let type = req.query.type;
  let id = req.query.id;

  if (type === undefined) type = "";
  if (id === undefined) id = "";

  try {
    response = await fetch(
      `http://${LOCALHOST}:${APPSERVERPORT}/app/accounting/?type=${type}&id=${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(await response.json());
  } catch (error) {
    console.log("Error at webserver!\n" + error);
  }
});

web.get("/web/dentist", async (req, res) => {
  let response;
  let patientid = req.query.patientid;
  let type = req.query.type;
  let dentistid = req.query.dentistid;
  let formtype = req.query.formtype;
  let date = req.query.date;

  if (patientid === undefined) patientid = "";
  if (type === undefined) type = "";
  if (dentistid === undefined) dentistid = "";
  if (formtype === undefined) formtype = "";
  if (date === undefined) date = "";

  try {
    response = await fetch(
      `http://${LOCALHOST}:${APPSERVERPORT}/app/dentist/?patientid=${patientid}&type=${type}&dentistid=${dentistid}&formtype=${formtype}&date=${date}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(await response.json());
  } catch (error) {
    console.log("Error at webserver!\n" + error);
  }
});

web.put("/web/patient", async (req, res) => {
  let response;
  let patientid = req.query.patientid;
  let type = req.query.type;
  let dentistid = req.query.dentistid;
  let formtype = req.query.formtype;
  let date = req.query.date;

  if (patientid === undefined) patientid = "";
  if (type === undefined) type = "";
  if (dentistid === undefined) dentistid = "";
  if (formtype === undefined) formtype = "";
  if (date === undefined) date = "";

  const data = req.body;

  try {
    response = await fetch(
      `http://${LOCALHOST}:${APPSERVERPORT}/app/patient/?patientid=${patientid}&type=${type}&dentistid=${dentistid}&formtype=${formtype}&date=${date}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    res.json(await response.json());
  } catch (error) {
    console.log("Error at webserver!\n" + error);
  }
});

web.listen(WEBSERVERPORT, LOCALHOST, () => {
  console.log("server has started on port " + WEBSERVERPORT);
});
