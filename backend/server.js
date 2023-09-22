const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const port = 4000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log("server has started on port " + port);
});