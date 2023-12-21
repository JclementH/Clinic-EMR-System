//require express and database
const express = require("express");
const cors = require("cors");
const prm = require("./modules/prm");
const misc = require("./modules/misc");
const app = express();
//declare host and port
const host = "localhost";
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/app/patient/', async (req, res) => {
    let result;
    try {
        switch(req.query.type) {
            case 'information': 
                if(req.body.patient) {
                    const patient = await prm.postInformation(req.body.patient);
                    if(req.body.emergencyperson) await prm.postEmergencyPerson(patient.id, req.body.emergencyperson);
                    if(req.body.parent) await prm.postParent(patient.id, req.body.parent);
                } else {
                    await prm.postInformation(req.body);
                }
                result = {status: "created patient"};
                break;
            case 'medicalhistory':
                result = await prm.postMedicalHistory(req.query.patientid, req.body);
                break;
            case 'form':
                result = await prm.postForm(req.query.patientid, req.query.dentistid, req.query.formtype, req.body);
                break;
            case 'prescription':
                result = await prm.postPrescription(req.query.patientid, req.query.dentistid, req.body);
                break;
            case 'postimage':
                result = await prm.postImage(req.query.patientid, req.body);
                break;
            case 'dentalchart':
                result = await prm.postDentalChart(req.query, req.body);
                break;
            case 'dentist':
                result = await misc.postDentist(req.body);
                break;
        }
        res.send(result);
    } catch (error) {
        console.log('Error at appserver!\n' + error);
    }
});

app.get('/app/patient', async (req, res) => {
    try {
        switch(req.query.type) {
            case 'information':
                res.send(await prm.getInformation(req.query));
                break;
            case 'emergencyperson':
                res.send(await prm.getEmergencyPerson(req.query));
                break;
            case 'parent':
                res.send(await prm.getParent(req.query));
                break;
            case 'medicalhistory':
                res.send(await prm.getMedicalHistory(req.query));
                break;
            case 'form':
                res.send(await prm.getForm(req.query));
                break;
            case 'prescription':
                res.send(await prm.getPrescription(req.query));
                break;
            case 'dentalchart':
                res.send(await prm.getDentalChart(req.query));
                break;
            default:
                res.send({"error": "no type or type does not exist!"});
        }
    } catch (error) {
        console.log('Error at appserver!\n' + error);
    }
});

app.put('/app/patient', async (req, res) => {
    try {
        switch(req.query.type) {
            case 'information':
                res.send(await prm.updateInformation(req.query, req.body));
                break;
            case 'emergencyperson':
                res.send(await prm.updateEmergencyPerson(req.query, req.body));
                break;
            case 'parent':
                res.send(await prm.updateParent(req.query, req.body));
                break;
            case 'medicalhistory':
                res.send(await prm.updateMedicalHistory(req.query, req.body));
                break;
            case 'form':
                res.send(await prm.updateForm(req.query, req.body));
                break;
            case 'prescription':
                res.send(await prm.updatePrescription(req.query, req.body));
                break;
            default:
                res.send({"error": "no type or type does not exist!"});
        }
    } catch (error) {
        console.log('Error at appserver!\n' + error);
    }
});

app.listen(port, host, () => {
    console.log("server has started on port " + port);
});