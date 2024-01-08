//require database
const pool = require("../db");
const fsys = require("fs");
const crypto = require("crypto");
const pdf = require("pdfkit");
const { query } = require("express");

const prm = {
  postInformation: async (newPatient) => {
    query = await pool.query(
      `INSERT INTO patientinformation(
                namelast,
                namefirst,
                namemiddle,
                dateofentry,
                dateofbirth,
                civilstatus,
                patientaddress,
                patientgender,
                patientheight,
                patientweight,
                numbertelephone,
                numbermobile,
                email,
                occupation,
                password
            ) VALUES(
                '${newPatient.namelast}',
                '${newPatient.namefirst}',
                '${newPatient.namemiddle}',
                CURRENT_TIMESTAMP,
                '${newPatient.dateofbirth}',
                '${newPatient.civilstatus}',
                '${newPatient.patientaddress}',
                '${newPatient.patientgender}',
                '${newPatient.patientheight}',
                '${newPatient.patientweight}',
                '${newPatient.numbertelephone}',
                '${newPatient.numbermobile}',
                '${newPatient.email}',
                '${newPatient.occupation}',
                '${newPatient.password}'
            ) RETURNING id;`
    );
    return { id: query.rows[0].id, status: "created patient information" };
  },
  postEmergencyPerson: async (patientID, newEmergencyPerson) => {
    await pool.query(
      `INSERT INTO emergencyperson(
                patientid,
                namelast,
                namefirst,
                numbertelephone,
                numbermobile
            ) VALUES(
                '${patientID}',
                '${newEmergencyPerson.namelast}',
                '${newEmergencyPerson.namefirst}',
                '${newEmergencyPerson.numbertelephone}',
                '${newEmergencyPerson.numbermobile}'
            );`
    );
    return { status: "created emergency person" };
  },
  postParent: async (patientID, newParent) => {
    await pool.query(
      `INSERT INTO parent(
                patientid,
                namelast,
                namefirst,
                numbertelephone,
                numbermobile
            ) VALUES(
                '${patientID}',
                '${newParent.namelast}',
                '${newParent.namefirst}',
                '${newParent.numbertelephone}',
                '${newParent.numbermobile}'
            );`
    );
    return { status: "created parent" };
  },
  postMedicalHistory: async (patientID, medicalHistory) => {
    const dir = "C:/Users/jch/Documents/clinic/teststorage";

    if (!fsys.existsSync(`${dir}/patient`)) fsys.mkdirSync(`${dir}/patient`);
    if (!fsys.existsSync(`${dir}/patient/${patientID}`))
      fsys.mkdirSync(`${dir}/patient/${patientID}`);
    if (
      !fsys.existsSync(
        `${dir}/patient/${patientID}/p${patientID}_medicalhistory.txt`
      )
    ) {
      fsys.writeFile(
        `${dir}/patient/${patientID}/p${patientID}_medicalhistory.txt`,
        JSON.stringify(medicalHistory),
        async (err) => {
          if (err) throw err;
          console.log("file uploaded!");
        }
      );
      await pool.query(
        `INSERT INTO medicalhistory(
                    patientid,
                    date,
                    filepath
                ) VALUES(
                    '${patientID}',
                    CURRENT_TIMESTAMP,
                    '${dir}/patient/${patientID}/p${patientID}_medicalhistory.txt'
                );`
      );
      return { status: "created medical history" };
    } else {
      return { status: "file already exists!" };
    }
  },
  postForm: async (patientID, dentistID, formType) => {
    const dir = "C:/Users/jch/Documents/clinic/teststorage";
    var i = 0;

    if (!fsys.existsSync(`${dir}/patient`)) fsys.mkdirSync(`${dir}/patient`);
    if (!fsys.existsSync(`${dir}/patient/${patientID}`))
      fsys.mkdirSync(`${dir}/patient/${patientID}`);
    if (!fsys.existsSync(`${dir}/patient/${patientID}/forms`))
      fsys.mkdirSync(`${dir}/patient/${patientID}/forms`);

    for (i; ; i++) {
      if (
        !fsys.existsSync(
          `${dir}/patient/${patientID}/forms/p${patientID}_${formType}_v${i}.pdf`
        )
      ) {
        const doc = new pdf({ size: "LETTER" });
        doc.pipe(
          fsys.createWriteStream(
            `${dir}/patient/${patientID}/forms/p${patientID}_${formType}_v${i}.pdf`
          )
        );

        //todo

        doc.end();
        break;
      }
    }

    await pool.query(
      `INSERT INTO form(
                patientid,
                dentistid,
                date,
                formtype,
                filepath
            ) VALUES(
                '${patientID}',
                '${dentistID}',
                '${formtype}',
                '${dir}/patient/${patientID}/forms/p${patientID}_${formtype}_v${i}.pdf',
            );`
    );
    return { status: "created form" };
  },
  postPrescription: async (patientID, dentistID, body) => {
    let prescription = await pool.query(
      `INSERT INTO prescription(
                patientid,
                dentistid,
                date
            ) VALUES(
                '${patientID}',
                '${dentistID}',
                CURRENT_TIMESTAMP
            ) RETURNING id;`
    );

    const prescriptionID = prescription.rows[0].id;

    body.medications.map(async (medication) => {
      await pool.query(
        `INSERT INTO medication(
                    prescriptionid,
                    medicine,
                    quantity,
                    signetur
                ) VALUES(
                    '${prescriptionID}',
                    '${medication.medicine}',
                    '${medication.quantity}',
                    '${medication.signetur}'
                );`
      );
    });

    return { status: "created prescription" };
  },
  postImage: async (patientID, body) => {
    let filePath;

    await pool.query(
      `INSERT INTO image(
                patientid,
                creationdate,
                filepath,
                imagetype,
                notes
            ) VALUES(
                '${patientID}',
                '${body.creationdate}',
                '${filePath}',
                '${body.imagetype}',
                '${body.notes}'
            );`
    );

    return { status: "created image" };
  },
  postDentalChart: async (query, body) => {
    if (query.patientid && query.dentistid) {
      try {
        let dentalChart = await pool.query(
          `INSERT INTO dentalchart(
                        patientid,
                        dentistid,
                        date,
                        note
                    ) VALUES(
                        '${query.patientid}',
                        '${query.dentistid}',
                        CURRENT_TIMESTAMP,
                        '${body.note}'
                    ) RETURNING id;`
        );

        const dentalChartID = dentalChart.rows[0].id;

        body.teeth.map(async (tooth) => {
          await pool.query(
            `INSERT INTO dentalcharttooth(
                            dentalchartid,
                            teethnumber,
                            statusbits,
                            laycrowntypebits,
                            lay,
                            recurringcarries,
                            amalgam,
                            composite,
                            carries
                        ) VALUES(
                            '${dentalChartID}',
                            '${tooth.teethnumber}',
                            '${tooth.statusbits}',
                            '${tooth.laycrowntypebits}',
                            '${tooth.lay}',
                            '${tooth.recurringcarries}',
                            '${tooth.amalgam}',
                            '${tooth.composite}',
                            '${tooth.carries}'
                        );`
          );
        });
      } catch (error) {
        return { error: error.toString() };
      }
    } else {
      return { error: "missing patientid and dentistid in URL query" };
    }

    return { status: "created dental chart" };
  },
  getInformation: async (query) => {
    let information;

    if (query.patientid) {
      information = await pool.query(
        `SELECT id, namelast, namefirst, namemiddle, dateofentry, dateofbirth, civilstatus, patientaddress, patientweight, patientheight,
        numbertelephone, numbermobile, email, occupation FROM patientinformation WHERE id=${query.patientid};`
      );
    } else if (query.uuid) {
      information = await pool.query(
        `SELECT id, namelast, namefirst, namemiddle, dateofentry, dateofbirth, civilstatus, patientaddress, patientweight, patientheight,
            numbertelephone, numbermobile, email, occupation FROM patientinformation WHERE uuid='${query.uuid}';`
      );
    } else {
      information =
        await pool.query(`SELECT id, namelast, namefirst, namemiddle, dateofentry, dateofbirth, civilstatus, patientaddress, 
      patientweight, patientheight, numbertelephone, numbermobile, email, occupation, uuid FROM patientinformation;`);
    }

    return Object.assign(information.rows);
  },
  getExpense: async (query) => {
    let information;

    information = await pool.query(`SELECT * FROM expense;`);
    return Object.assign(information.rows);
  },
  updateExpense: async (query) => {
    let information;
    information = await pool.query(
      `UPDATE expense SET item = $1, quantity = $2, basecost = $3, expense = $4, expensetype = $5 WHERE id = $6;`,
      [
        query.name,
        query.quantity,
        query.unitcost,
        query.expense,
        query.expensetype,
        query.id,
      ]
    );
    return Object.assign(information.rows);
  },
  getDentistInformation: async (query) => {
    let information;

    if (query.dentistid) {
      information = await pool.query(
        `SELECT * FROM dentistinformation WHERE id=${query.dentistid};`
      );
    } else if (query.type === "login") {
      information = await pool.query(
        `SELECT id, namefirst, namemiddle, namelast FROM dentistinformation WHERE email = $1 AND password = $2;`,
        [query.email, query.password]
      );
    } else {
      information = await pool.query(`SELECT * FROM dentistinformation;`);
    }

    return Object.assign(information.rows);
  },

  getEmergencyPerson: async (query) => {
    let emergencyperson;

    if (query.patientid) {
      emergencyperson = await pool.query(
        `SELECT * FROM emergencyperson WHERE patientid=${query.patientid};`
      );
      emergencyperson = emergencyperson.rows;
    } else {
      emergencyperson = { error: "missing patient id" };
    }

    return Object.assign(emergencyperson);
  },
  getParent: async (query) => {
    let parent;

    if (query.patientid) {
      parent = await pool.query(
        `SELECT * FROM parent WHERE patientid=${query.patientid};`
      );
      parent = parent.rows;
    } else {
      parent = { error: "missing patient id" };
    }

    return Object.assign(parent);
  },
  getMedicalHistory: async (query) => {
    let metadata;
    let data;
    let medicalhistory;
    let filepath;

    if (query.patientid) {
      metadata = await pool.query(
        `SELECT * FROM medicalhistory WHERE patientid=${query.patientid};`
      );
      filepath = metadata.rows[0].filepath;
      metadata = metadata.rows;
      data = fsys.readFileSync(filepath, { encoding: "utf8", flag: "r" });
      medicalhistory = {
        "medical history": { metadata: metadata, data: JSON.parse(data) },
      };
    } else {
      medicalhistory = { error: "missing patient id" };
    }

    return Object.assign(medicalhistory);
  },
  getForm: async (query) => {
    let form;

    if (query.patientid) {
      if (query.formtype) {
        if (query.date) {
          form = await pool.query(
            `SELECT * FROM form WHERE patientid=${query.patientid} AND formtype=${query.formtype} AND date=\'${query.date}\';`
          );
        } else {
          form = await pool.query(
            `SELECT * FROM form WHERE patientid=${query.patientid} AND formtype=${query.formtype};`
          );
        }
      } else {
        if (query.date) {
          form = await pool.query(
            `SELECT * FROM form WHERE patientid=${query.patientid} AND date=\'${query.date}\';`
          );
        } else {
          form = await pool.query(
            `SELECT * FROM form WHERE patientid=${query.patientid}`
          );
        }
      }
      form = form.rows;
    } else {
      form = { error: "missing patient id" };
    }

    return Object.assign(form);
  },
  getPrescription: async (query) => {
    let prescriptions;
    let medications;

    if (query.patientid) {
      if (query.dentistid) {
        if (query.date) {
          prescriptions = await pool.query(
            `SELECT * FROM prescription WHERE patientid=${query.patientid} AND dentistid=${query.dentistid} AND date=\'${query.date}\';`
          );
        } else {
          prescriptions = await pool.query(
            `SELECT * FROM prescription WHERE patientid=${query.patientid} AND dentistid=${query.dentistid};`
          );
        }
      } else {
        if (query.date) {
          prescriptions = await pool.query(
            `SELECT * FROM prescription WHERE patientid=${query.patientid} AND date=\'${query.date}\';`
          );
        } else {
          prescriptions = await pool.query(
            `SELECT * FROM prescription WHERE patientid=${query.patientid};`
          );
        }
      }

      prescriptions = prescriptions.rows.map(async (prescription) => {
        medications = await pool.query(
          `SELECT * FROM medication WHERE prescriptionid=${prescription.id};`
        );
        prescription.medications = medications.rows;
        return prescription;
      });

      prescriptions = await Promise.all(prescriptions);
    } else {
      prescriptions = { error: "missing patient id" };
    }

    return Object.assign(prescriptions);
  },
  getImage: async (query) => {
    let image;

    if (query.patientid) {
      image = await pool.query(
        `SELECT * FROM image WHERE patientid=${query.patientid};`
      );
    } else {
      image = { error: "missing patient id" };
    }

    return Object.assign(image);
  },
  getDentalChart: async (query) => {
    let dentalchart;
    let teeth;

    if (query.patientid) {
      dentalchart = await pool.query(
        `SELECT * FROM dentalchart WHERE patientid=${query.patientid};`
      );

      teeth = await pool.query(
        `SELECT * FROM dentalcharttooth WHERE dentalchartid=${dentalchart.rows[0].id};`
      );

      dentalchart = { ...dentalchart.rows[0], teeth: teeth.rows };
    } else {
      dentalchart = { error: "missing patient id" };
    }

    return Object.assign(dentalchart);
  },
  updateInformation: async (query, body) => {
    let bodyKeys = Object.keys(body);
    let bodyValues = Object.values(body);
    let set;
    let i = 0;

    set = bodyKeys.map((key) => {
      key = ` ${key}=\'${bodyValues[i]}\'`;
      i++;
      return key;
    });

    console.log(set);

    if (query.patientid) {
      try {
        await pool.query(
          `UPDATE patientinformation SET${set} WHERE id=${query.patientid};`
        );
      } catch (error) {
        return { error: error.toString() };
      }
    } else {
      return { error: "missing patient id" };
    }

    return { status: "updated patient information" };
  },
  updateEmergencyPerson: async (query, body) => {
    let bodyKeys = Object.keys(body);
    let bodyValues = Object.values(body);
    let set;
    let i = 0;

    set = bodyKeys.map((key) => {
      key = ` ${key}=\'${bodyValues[i]}\'`;
      i++;
      return key;
    });

    if (query.patientid) {
      try {
        await pool.query(
          `UPDATE emergencyperson SET${set} WHERE patientid=${query.patientid};`
        );
      } catch (error) {
        return { error: error.toString() };
      }
    } else {
      return { error: "missing patient id" };
    }

    return { status: "updated emergency person" };
  },
  updateParent: async (query, body) => {
    let bodyKeys = Object.keys(body);
    let bodyValues = Object.values(body);
    let set;
    let i = 0;

    set = bodyKeys.map((key) => {
      key = ` ${key}=\'${bodyValues[i]}\'`;
      i++;
      return key;
    });

    if (query.patientid) {
      try {
        await pool.query(
          `UPDATE parent SET${set} WHERE patientid=${query.patientid};`
        );
      } catch (error) {
        return { error: error.toString() };
      }
    } else {
      return { error: "missing patient id" };
    }

    return { status: "updated parent" };
  },
  updateMedicalHistory: async (query, body) => {
    let bodyKeys = Object.keys(body);
    let bodyValues = Object.values(body);
    let set;
    let i = 0;

    set = bodyKeys.map((key) => {
      key = ` ${key}=\'${bodyValues[i]}\'`;
      i++;
      return key;
    });

    //todo
  },
  updateForm: async (query, body) => {
    let bodyKeys = Object.keys(body);
    let bodyValues = Object.values(body);
    let set;
    let i = 0;

    set = bodyKeys.map((key) => {
      key = ` ${key}=\'${bodyValues[i]}\'`;
      i++;
      return key;
    });

    //todo
  },
  updatePrescription: async (query, body) => {
    let bodyKeys = Object.keys(body);
    let bodyValues = Object.values(body);
    let set;
    let i = 0;

    set = bodyKeys.map((key) => {
      key = ` ${key}=\'${bodyValues[i]}\'`;
      i++;
      return key;
    });

    //todo
  },
  updateImage: async (query, body) => {
    let bodyKeys = Object.keys(body);
    let bodyValues = Object.values(body);
    let set;
    let i = 0;

    set = bodyKeys.map((key) => {
      key = ` ${key}=\'${bodyValues[i]}\'`;
      i++;
      return key;
    });

    //todo
  },
  updateDentalChart: async (query, body) => {
    let bodyKeys = Object.keys(body);
    let bodyValues = Object.values(body);
    let set;
    let i = 0;

    set = bodyKeys.map((key) => {
      if (key != "teeth") {
        key = ` ${key}=\'${bodyValues[i]}\'`;
        i++;
        return key;
      }
      return "";
    });

    bodyKeys = Object.keys(bodyKeys.teeth);
    bodyValues = Object.values(bodyKeys.teeth);

    let teeth = bodyKeys.map((key) => {
      key = ` ${key}=\'${bodyValues[i]}\'`;
      i++;
      return key;
    });

    if (query.patientid && query.dentalchartid) {
      try {
        if (bodyKeys.teeth) {
          await pool.query(
            `UPDATE dentalchart SET${set} WHERE patientid=${query.patientid} AND dentalchartid=${query.dentalchartid};`
          );

          bodyValues.teeth.map(async (tooth) => {
            await pool.query(
              `UPDATE dentalcharttooth SET${teeth} WHERE dentalchartid=${query.dentalchartid};`
            );
          });
        } else {
        }
      } catch (error) {
        return { error: error.toString() };
      }
    } else {
      return { error: "missing 'patientid' query in URL" };
    }

    return { status: "updated dental chart" };
  },
  deleteInformation: async (query) => {
    if (query.patientid) {
      await pool.query(
        `DELETE FROM patientinformation WHERE patientid=${query.patientid};`
      );
    } else {
      return { error: "missing 'patientid' query in URL" };
    }
    return { status: "deleted patient" };
  },
  deleteParent: async (query) => {
    if (query.patientid) {
      await pool.query(
        `DELETE FROM parent WHERE patientid=${query.patientid};`
      );
    } else {
      return { error: "missing 'patientid' query in URL" };
    }
    return { status: "deleted parent" };
  },
  deleteMedicalHistory: async (query) => {
    if (query.patientid) {
      await pool.query(
        `DELETE FROM medicalhistory WHERE patientid=${query.patientid};`
      );
    } else {
      return { error: "missing 'patientid' query in URL" };
    }
    return { status: "deleted medical history" };
  },
  deleteForm: async (query) => {
    if (query.patientid) {
      await pool.query(`DELETE FROM form WHERE patientid=${query.patientid};`);
    } else {
      return { error: "missing 'patientid' query in URL" };
    }
    return { status: "deleted form" };
  },
  deletePrescription: async (query) => {
    if (query.patientid) {
      await pool.query(
        `DELETE FROM prescription WHERE patientid=${query.patientid};`
      );
    } else {
      return { error: "missing 'patientid' query in URL" };
    }
    return { status: "deleted prescription" };
  },
  deleteImage: async (query) => {
    if (query.patientid) {
      await pool.query(`DELETE FROM image WHERE patientid=${query.patientid};`);
    } else {
      return { error: "missing 'patientid' query in URL" };
    }
    return { status: "deleted image" };
  },
  deleteDentalChart: async (query) => {
    if (query.patientid) {
      await pool.query(
        `DELETE FROM dentalchart WHERE patientid=${query.patientid};`
      );
    } else {
      return { error: "missing 'patientid' query in URL" };
    }
    return { status: "deleted dentalchart" };
  },
};

module.exports = prm;
