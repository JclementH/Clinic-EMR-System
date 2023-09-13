const express = require("express");
const cors = require("cors");
const app = express();

var port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log("server has started on port " + port);
});