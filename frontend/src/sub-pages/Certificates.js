import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FEMALE, MALE, MR, MRS, MS } from "../components/Constant";
import dayjs from "dayjs";
import jsPDF from "jspdf";

function Certificates() {
  const [prefix, setPrefix] = useState("empty");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("empty");
  const [date, setDate] = useState(null);
  const [result, setResult] = useState("");
  const [treatment, setTreatment] = useState("");
  const [recomendation, setRecomendation] = useState("");
  const [dentist, setDentist] = useState("");
  const [prc, setPrc] = useState("");
  const [ptr, setPtr] = useState("");
  const [error, setError] = useState(false)

  const handlePrefixChange = (event) => {
    setPrefix(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value.replace(/[^0-9]/g, ""));
  };

  const hanldeGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event);
  };

  const hanldeResultChange = (event) => {
    setResult(event.target.value);
  };

  const hanldeTreatmentChange = (event) => {
    setTreatment(event.target.value);
  };

  const hanldeRecomendationChange = (event) => {
    setRecomendation(event.target.value);
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
   if (name === "" || treatment === "" || dentist === "" || prc === ""){
    setError(true);
   } else {
    const documentFormat1 = `To whom it may concern:`
    const documentFormat2 = `\n\nThis is to inform you that ${prefix} ${name}, ${age} year/s old, ${gender}, has undergone a through oral examination at Bright Smiles Oral Care Center on ${dayjs(date).format("MM/DD/YYYY")}`;
    const documentFormat3 = `\n\n\n\n\n\nResults:${result}\n\nTreatment:${treatment}\n\nRecommendation:${recomendation}\n\n\nThis certificate is issued upon the request of the patient for whatever legal purpose it may serve him or her.\n\nThank you very much.`
    const documentFormat4 = `Dentist: ${dentist}\nPRC Number: ${prc}\nPTR Number: ${ptr}`
    const doc = new jsPDF();
    doc.text(documentFormat1, 10, 10,);
    doc.text(documentFormat2, 10, 10, {maxWidth: 185, align: "justify"});
    doc.text(documentFormat3, 10, 10, {maxWidth: 185, align: "left"});

    const text1Height = (doc.getStringUnitWidth(documentFormat3) * 12) / 185;
    const y2 = 70 + text1Height * 12;

    setError(false);
    doc.text(documentFormat4, 185, y2, {maxWidth: 0, align: "right"});
    doc.save(name +" Certificate.pdf");
   }
  };
   
  return (
    <Box>
       <div> To whom it may concern: </div>
      <div>
        This is to certify that {
          <Select
            id="dropdown-prefix"
            value={prefix}
            label={"Prefix"}
            onChange={handlePrefixChange}
          >
            <MenuItem value={"empty"}>Affix..</MenuItem>
            <MenuItem value={MR}>Mr.</MenuItem>
            <MenuItem value={MS}>Ms.</MenuItem>
            <MenuItem value={MRS}>Mrs.</MenuItem>
          </Select>
        } <TextField error={error} value={name} onChange={handleNameChange} label={"Name*"}/>, <TextField value={age} onChange={handleAgeChange} className="w-14" label="Age"/> year/s
        old, <Select
          id="dropdown-gender"
          value={gender}
          onChange={hanldeGenderChange}
        >
          <MenuItem value={"empty"}>Gender..</MenuItem>
          <MenuItem value={MALE}>Male</MenuItem>
          <MenuItem value={FEMALE}>Female</MenuItem>
        </Select>, has undergone a through oral examination at Bright Smiles Oral Care
        Center on <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={date} onChange={handleDateChange} label="Date"/>
        </LocalizationProvider>
      </div>
      <div className="mt-5">
        <TextField
          id="text-results"
          label="Results/Findings:"
          multiline
          rows={10}
          style={{ width: "100%"}}
          value={result}
          onChange={hanldeResultChange}
        />
      </div>
      <div className="mt-5">
        <TextField
          id="text-treatment"
          label="Treatments Done: *"
          multiline
          rows={10}
          style={{ width: "100%" }}
          value={treatment}
          error={error}
          onChange={hanldeTreatmentChange}
        />
      </div>
      <div className="mt-5">
        <TextField
          id="text-recomendation"
          label="Recommendation:"
          multiline
          style={{ width: "100%" }}
          rows={10}
          value={recomendation}
          onChange={hanldeRecomendationChange}
        /> 
        <p className="mt-5"> This certificate is issued upon the request of the patient for whatever legal purpose it may serve him or her. </p>
        <p>Thank you very much.</p>
      </div>
        
      <div className="flex flex-col items-end mt-5 space-y-5">
        <TextField error={error} value={dentist} onChange={handleDentistChange} label={"Dentist*"}  />
        <TextField error={error} value={prc} onChange={handlePrcChange} label={"PRC Number*"} />
        <TextField value={ptr} onChange={handlePtrChange} label={"PTR Number"} />
        <Button onClick={generatePDF}>Export PDF</Button>
      </div>
    </Box>
  );
}

export default Certificates;
