import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  createTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CROWN, FEMALE, MALE } from "../components/Constant";
import jsPDF from "jspdf";
import { BLACK_BOX, CLINIC_LOGO } from "../components/ImageSource";
import { ThemeContext } from "@emotion/react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SignaturePad from "signature_pad";
import SignatureCanvas from "react-signature-canvas";

function WorkAuthorizationPage() {
  const [form, setForm] = useState(CROWN);
  const [patientName, setPatientName] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [recieverName, setRecieverName] = useState("");
  const [dentist, setDentist] = useState("");
  const [witness, setWitness] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState(
    "info@dentalclinic-cebu.com"
  );
  const [website, setWebsite] = useState("info@dentalclinic-cebu.com");
  const [telephoneNumber, setTelephoneNumber] = useState("324123553");
  const [labName, setLabName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("9234188996");
  const [error, setError] = useState(false);
  const [date, setDate] = useState(null);
  const [dateRequired, setDateRequired] = useState(null);
  const [checkedValues, setCheckedValues] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("empty");
  const [patientPad, setPatientPad] = useState();
  const [dentistPad, setDentistPad] = useState();

  const handleCheckedValues = (event) => {
    setCheckedValues(event.target.value);
  };

  const handleChangeWebsite = (event) => {
    setWebsite(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleRecieverName = (event) => {
    setRecieverName(event.target.value);
  };

  const handleSpecialNote = (event) => {
    setSpecialNote(event.target.value);
  };

  const handlePatientName = (event) => {
    setPatientName(event.target.value);
  };

  const handleDentistName = (event) => {
    setDentist(event.target.value);
  };

  const handleWitnessName = (event) => {
    setWitness(event.target.value);
  };

  const generatePDF = () => {
    if (patientName === "" || dentist === "") {
      setError(true);
    } else {
      const printClinicAddress = `${clinicAddress}`;
      const printTelephoneNumber = `Tel.No. ${telephoneNumber}`;
      const printCelNumber = `Cel.No. ${mobileNumber}`;
      const printEmailAddress = `Email:${emailAddress}`;
      const printWebsite = `Website: ${website}`;

      const img = new Image();
      const doc = new jsPDF();
      img.src = CLINIC_LOGO;
      doc.addImage(img, "png", 10, 0, 90, 40);

      doc.setFontSize(10);
      doc.text(printClinicAddress, 105, 5, {
        align: "justify",
        display: "flex",
        maxWidth: 90,
      });
      doc.text(printTelephoneNumber, 105, 13, {
        align: "justify",
        display: "flex",
        maxWidth: 90,
      });
      doc.text(printCelNumber, 105, 18, {
        align: "justify",
        display: "flex",
        maxWidth: 90,
      });
      doc.text(printEmailAddress, 105, 23, {
        align: "justify",
        display: "flex",
        maxWidth: 90,
      });
      doc.text(printWebsite, 105, 28, {
        align: "justify",
        display: "flex",
        maxWidth: 90,
      });
      doc.setFontSize(17);
      doc.setFont(undefined, "bold");
      doc.text("Laboratory", 10, 50);

      doc.setFont(undefined, "normal");
      doc.setFontSize(15);
      doc.text(`Name: ${labName}`, 10, 65);

      doc.setFontSize(17);
      doc.setFont(undefined, "bold");
      doc.text("Case Details", 10, 90);

      doc.setFont(undefined, "normal");
      doc.setFontSize(15);
      doc.text(`Patient Name: ${patientName}`, 10, 107);

      doc.text(`Age: ${age}`, 10, 113);
      doc.text(`Gender: ${gender}`, 10, 119);
      doc.text(`Facial Type: ${checkedValues}`, 110, 113);
      doc.text(
        `Date Required: ${dayjs(dateRequired).format("MM/DD/YYYY")}`,
        110,
        119
      );

      doc.setFontSize(17);
      doc.setFont(undefined, "bold");
      doc.text("Special Notes", 10, 150);
      doc.setFont(undefined, "normal");
      doc.setFontSize(15);
      doc.text(`${specialNote}`, 10, 162);

      const docSig = new Image();
      const patSig = new Image();

      docSig.src = dentistPad.getTrimmedCanvas().toDataURL('image/png');
      patSig.src = patientPad.getTrimmedCanvas().toDataURL('image/png');
      doc.setFontSize(10);
      doc.addImage(patSig, "png", 100, 230, 50, 20);
      doc.addImage(docSig, "png", 10, 230, 50, 20);
      doc.text(`Dentist: ${dentist}`, 22, 273, {
        maxWidth: 54,
        align: "justify",
      });
      doc.text(`Patient: ${patientName}`, 112, 273, {
        maxWidth: 54,
        align: "justify",
      });

      doc.save("Demo.pdf");

      // const docSigToImage = dentistPad.toDataURL();
      // const patSigToImage = patientPad.toDataURL();

      // docSig.src = docSigToImage;
      // patSig.src = patSigToImage;

      // doc.addImage(docSig, "png", 100, 230, 40, 20);
      // doc.addImage(patSig, "png", 10, 230, 40, 20);
    }
  };

  const handleDateRequired = (event) => {
    setDateRequired(event);
  };

  const handleDate = (event) => {
    setDate(event);
  };

  const handleMobileNumber = (event) => {
    setMobileNumber(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleLabName = (event) => {
    setLabName(event.target.value);
  };

  const handleTelephoneNumber = (event) => {
    setTelephoneNumber(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleClinicAddress = (event) => {
    setClinicAddress(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <FormControl>
          <InputLabel>Change</InputLabel>
          <Select
            id="consent-form-prefix"
            value={form}
            label="Change"
            onChange={setForm}
          >
            <MenuItem value={CROWN}>Crown</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="grid grid-flow-cols-1 gap-4">
        <TextField
          value={labName}
          onChange={handleLabName}
          label={"Laboratory Name"}
        />
        <TextField
          value={clinicAddress}
          onChange={handleClinicAddress}
          label={"Clinic Address*"}
        />

        <TextField
          value={dentist}
          onChange={handleDentistName}
          label={"Dentist Name"}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 place-content-center h-[40%] mb-5 mt-5">
        <TextField
          value={mobileNumber}
          onChange={handleMobileNumber}
          label={"Mobile Number"}
          className={"w-[600px]"}
        />

        <TextField
          value={telephoneNumber}
          onChange={handleTelephoneNumber}
          label={"Telephone Number"}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={handleDate}
            label={"Date*"}
            className={"w-[600px]"}
          />
        </LocalizationProvider>

        <TextField
          value={mobileNumber}
          onChange={handleMobileNumber}
          label={"Mobile Number"}
        />
      </div>

      <h1 className="flex justify-center">Case Details</h1>

      <TextField
        error={error}
        value={patientName}
        onChange={handlePatientName}
        label={"Patient's Name*"}
        className={"w-full"}
      />

      <div className="flex justify-between w-[700px] mb-5 mt-5">
        <TextField value={age} onChange={handleAgeChange} label={"Age"} />
        <Select
          id="dropdown-gender"
          value={gender}
          label="Male/Female"
          onChange={handleGenderChange}
          className={"w-[200px]"}
        >
          <MenuItem value={"empty"}>Gender</MenuItem>
          <MenuItem value={MALE}>Male</MenuItem>
          <MenuItem value={FEMALE}>Female</MenuItem>
        </Select>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dateRequired}
            onChange={handleDateRequired}
            label={"Date Required*"}
          />
        </LocalizationProvider>
      </div>

      <FormControl component="fieldset">
        <FormLabel component="legend">Facial Type:</FormLabel>
        <RadioGroup
          row
          aria-label="facial-type"
          value={checkedValues}
          onChange={handleCheckedValues}
        >
          <FormControlLabel value="Square" control={<Radio />} label="Square" />
          <FormControlLabel
            value="Triangular"
            control={<Radio />}
            label="Triangular"
          />
          <FormControlLabel
            value="Rectangular"
            control={<Radio />}
            label="Rectangular"
          />
          <FormControlLabel value="Ovoid" control={<Radio />} label="Ovoid" />
        </RadioGroup>
      </FormControl>

      <div className="flex justify-center mt-5">
        <Button>Add Tooth Number</Button>
      </div>

      <div>
        <TextField
          value={specialNote}
          onChange={handleSpecialNote}
          label={"Special Note"}
          className={"w-full"}
        />
      </div>

      <div className="flex justify-between w-[700px] mt-10">
        <div className="flex flex-col">
          <SignatureCanvas
            ref={(data) => setDentistPad(data)}
            canvasProps={{ width: 300, height: 150, className: "shadow-lg" }}
          />
          <p className="mb-5">Dentist's Signature</p>
          <TextField
            value={dentist}
            onChange={handleDentistName}
            label={"Dentist Name"}
            error={error}
          />
          <button onClick={() => dentistPad.clear()}>Clear Signature</button>
        </div>
        <div className="flex flex-col">
          <SignatureCanvas
            ref={(data) => setPatientPad(data)}
            canvasProps={{ width: 300, height: 150, className: "shadow-lg" }}
          />
          <p className="mb-5">Patient's Signature</p>
          <TextField
            value={patientName}
            onChange={handlePatientName}
            label={"Patients Name"}
            error={error}
          />
          <button onClick={() => patientPad.clear()}>Clear Signature</button>
        </div>
      </div>

      <div className="flex flex-col items-end mt-5 space-y-5">
        <Button onClick={generatePDF}>Export PDF</Button>
      </div>
    </div>
  );
}

export default WorkAuthorizationPage;
