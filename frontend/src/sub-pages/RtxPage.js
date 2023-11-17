import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FEMALE, MALE, MR, MRS, MS } from "../components/Constant";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import classNames from "classnames";
import { RX_LOGO } from "../components/ImageSource";

function RTXPage() {
  const [name, setName] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [clinicAddress, setClinicAddress] = useState(
    "2/F ONE MANGO AVENUE BLDG. GENERAL MAXILOM STREET CEBU CITY, PHILIPPINES"
  );
  const [clinicHours, setClinicHours] = useState("9:00AM - 5:00PM");
  const [telephoneNumber, setTelephoneNumber] = useState("324123553");
  const [emailAddress, setEmailAddress] = useState(
    "info@dentalclinic-cebu.com"
  );
  const [mobileNumber, setMobileNumber] = useState("9234188996");
  const [website, setWebsite] = useState("info@dentalclinic-cebu.com");
  const [prescription, setPrescription] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("empty");
  const [date, setDate] = useState(null);
  const [birthDate, setbirthDate] = useState(null);
  const [dentist, setDentist] = useState("");
  const [prc, setPrc] = useState("");
  const [ptr, setPtr] = useState("");
  const [error, setError] = useState(false);

  const hiddenDivRef = useRef(null);

  const handleWebsite = (event) => {
    setWebsite(event.target.value);
  };

  const handleMobileNumber = (event) => {
    setMobileNumber(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleEmailAddress = (event) => {
    setEmailAddress(event.target.value);
  };

  const handleTelephoneNumber = (event) => {
    setTelephoneNumber(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleClinicHours = (event) => {
    setClinicHours(event.target.value);
  };

  const handleClinicAddress = (event) => {
    setClinicAddress(event.target.value);
  };

  const handlePatientAddress = (event) => {
    setPatientAddress(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePrescription = (event) => {
    setPrescription(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event);
  };
  
  const handleBirthDateChange = (event) => {
    setbirthDate(event);
  };
  const handleDentistChange = (event) => {
    setDentist(event.target.value);
  };
  const handlePtrChange = (event) => {
    setPtr(event.target.value.replace(/[^0-9]/g, ""));
  };
  const handlePrcChange = (event) => {
    setPrc(event.target.value.replace(/[^0-9]/g, ""));
  };
  const generatePDF = () => {
    if (
      name === "" ||
      dentist === "" ||
      prc === "" ||
      date == null ||
      birthDate == null ||
      patientAddress === ""
    ) {
      setError(true);
      setDate({});
      setbirthDate({});
    } else {
      const printClinicAddress = `${clinicAddress}`;
      const printClinicHours = `${clinicHours}`;
      const printTelephoneNumber = `Phone: ${telephoneNumber}`;
      const printEmailAddress = `${emailAddress}`;
      const printMobileNumber = `Mobile: ${mobileNumber}`;
      const documentFormat6 = `${website}`;
      const printPatientName = `Name: ${name} `;
      const printGender = `Gender: ${gender}`;
      const printPrescription = `${prescription}`;
      const printAge = `Age: ${age}`;
      const printPatientAddress = `Address: ${patientAddress}`;
      const printDate = `Date: ${dayjs(date).format("MM/DD/YYYY")}`;
      const printDisclaimer = `Take Medication as prescribed only. Should there be any adverse or allergic reaction, proceed to the hospital immediately and inform the doctor with the medication you are taking. This is to facilitate proper medical treatment and to prevent any life-threatening situations.`;
      const printDentist = `Dentist: ${dentist}`;
      const printPrc = `PRC Number: ${prc}`;
      const printPtr = `PTR Number: ${ptr}`;
      const printBirthday = `Birthdate: ${dayjs(birthDate).format("MM/DD/YYYY")}`

      const doc = new jsPDF();
      const img = new Image();
      img.src = RX_LOGO;
      doc.text(printTelephoneNumber, 10, 10);
      doc.text(printMobileNumber, 185, 10, { align: "right" });
      doc.text(printClinicAddress, 100, 20, { maxWidth: 80, align: "center" });
      doc.setLineWidth(0.5);
      doc.line(0, 50, 250, 50);
      doc.text(printPatientName, 10, 60, { maxWidth: 185 });
      const textWidth = doc.getTextWidth(printPatientName);
      doc.line(10, 61, 10 + textWidth, 61);

      const text1Height = (doc.getStringUnitWidth(printPatientName) * 12) / 185;
      const y2 = 64 + text1Height * 6;

      doc.text(printPatientAddress, 10, y2, {
        maxWidth: 185,
        align: "justify",
      });

      const textWidth2 = doc.getTextWidth(printPatientAddress);
      doc.line(10, y2 + 1, 10 + textWidth2, y2 + 1);

      doc.text(printGender, 10, y2 + 7);
      doc.text(printAge, 66, y2 + 7, { maxWidth: 80, align: "center" });
      doc.text(printBirthday, 110, y2 + 7, { maxWidth: 80, align: "center" });
      doc.text(printDate, 195, y2 + 7, { align: "right", display: "flex" });

      doc.addImage(img, "png", 10, y2 + 30, 24, 30);
      doc.text(printPrescription, 40, y2 + 30, { maxWidth: 185 });

      doc.text(printDisclaimer, 10, 200, { maxWidth: 185, align: "justify" });
      doc.text(printDentist, 185, 240, { align: "right", display: "flex" });
      doc.text(printPrc, 185, 250, { align: "right" });
      doc.text(printPtr, 185, 260, { align: "right" });

      setError(false);
      doc.save("Demo.pdf");
    }
  };

  return (
    <Box>
      <div>
        <TextField
          error={error}
          value={clinicAddress}
          className={"w-full"}
          onChange={handleClinicAddress}
          label={"Clinic Address*"}
        />
      </div>
      <div className="mt-5">
        <TextField
          value={clinicHours}
          className={"w-full"}
          onChange={handleClinicHours}
          label={"Clinic Hours"}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 place-content-center h-48">
        <TextField
          value={telephoneNumber}
          onChange={handleTelephoneNumber}
          label={"Telephone Number"}
        />
        <TextField
          value={emailAddress}
          onChange={handleEmailAddress}
          label={"Email Address"}
        />
        <TextField
          value={mobileNumber}
          onChange={handleMobileNumber}
          label={"Mobile Number"}
        />
        <TextField value={website} onChange={handleWebsite} label={"Website"} />
      </div>

      <div className="mt-10">
        <TextField
          error={error}
          value={name}
          onChange={handleNameChange}
          label={"Patient's Name*"}
          className={"w-full"}
        />
      </div>

      <div className="mt-5 mb-10">
        <TextField
          error={error}
          value={patientAddress}
          onChange={handlePatientAddress}
          label={"Patient Address*"}
          className={"w-full"}
        />
      </div>

      <div className="flex justify-between w-[800px]">
        <TextField
          value={age}
          onChange={handleAgeChange}
          label={"Age"}
          className="w-24"
        />
        <Select
          id="dropdown-gender"
          value={gender}
          label="Male/Female"
          onChange={handleGenderChange}
        >
          <MenuItem value={"empty"}>Gender</MenuItem>
          <MenuItem value={MALE}>Male</MenuItem>
          <MenuItem value={FEMALE}>Female</MenuItem>
        </Select>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={handleDateChange}
            label={"Date*"}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={birthDate}
            onChange={handleBirthDateChange}
            label={"Birth Date*"}
          />
        </LocalizationProvider>
      </div>

      <TextField
        id="text-results"
        label="Results/Findings:"
        multiline
        rows={10}
        style={{ width: "100%", marginTop: "20px" }}
        value={prescription}
        onChange={handlePrescription}
      />

      <p className="mt-5">
        Take Medication as prescribed only. Should there be any adverse or
        allergic reaction, proceed to the hospital immediately and inform the
        doctor with the medication you are taking. This is to facilitate proper
        medical treatment and to prevent any life-threatening situations.
      </p>

      <div className="mt-10 mb-5 flex justify-between w-[700px]">
        <TextField
          error={error}
          value={dentist}
          onChange={handleDentistChange}
          label={"Dentist*"}
        />
        <TextField
          error={error}
          value={prc}
          onChange={handlePrcChange}
          label={"PRC Number*"}
        />
        <TextField
          value={ptr}
          onChange={handlePtrChange}
          label={"PTR Number"}
        />
        
      </div>

      <div><Button onClick={generatePDF}>Export PDF</Button></div>
    </Box>
  );
}

export default RTXPage;
