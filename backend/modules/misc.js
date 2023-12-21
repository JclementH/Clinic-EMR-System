//require database
const pool = require("../db");
const fsys = require("fs");
const crypto = require("crypto");
const pdf = require("pdfkit");

const misc = {
    postDentist: async (body) => {
        await pool.query(
            `INSERT INTO dentistinformation(
                namelast,
                namefirst,
                namemiddle,
                email,
                numbertelephone,
                numbermobile,
                numberprc
            ) VALUES(
                '${body.namelast}',
                '${body.namefirst}',
                '${body.namemiddle}',
                '${body.email}',
                '${body.numbertelephone}',
                '${body.numbermobile}',
                '${body.numberprc}'
            );`
        );
        return {"status": "created dentist"};
    }
};

module.exports = misc;