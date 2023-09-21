const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const port = 4000;

app.use(cors());
app.use(express.json());

app.post("/Expense", async (req, res) => {
    try {
        const { name } = req.body;
        const { cost } = req.body;
        const { date } = req.body;
        const { datePaid } = req.body;
        const { amountPaid } = req.body;
        const { status } = req.body;
        const insertData = await pool.query(
            "INSERT TO expenses(cost, dueDate, paidDate, paidAmount) VALUES($1, $2, $3, $4);",
            [cost], [date], [datePaid], [amountPaid]
        );
        res.json(insertData);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log("server has started on port " + port);
});