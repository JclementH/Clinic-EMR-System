const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

var port = 3000;

app.use(cors());
app.use(express.json());

app.post("/test", async (req, res) => {
    try {
        const newTodo = await pool.query(
            "INSERT INTO patientinformation(\"nameLast\") VALUES(\"testLastName\");"
        );
        res.json(newTodo);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log("server has started on port " + port);
});