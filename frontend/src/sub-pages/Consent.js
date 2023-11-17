import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  createTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { INFORMED_CONSENT } from "../components/Constant";
import jsPDF from "jspdf";
import { BLACK_BOX, CLINIC_LOGO } from "../components/ImageSource";
import { ThemeContext } from "@emotion/react";
import SignatureCanvas from "react-signature-canvas";

function Consent() {
  const [form, setForm] = useState(INFORMED_CONSENT);
  const [name, setName] = useState("");
  const [dentist, setDentist] = useState("");
  const [witness, setWitness] = useState("");
  const [clinicAddress, setClinicAddress] = useState(
    "2/F ONE MANGO AVENUE BLDG. GENERAL MAXILOM STREET CEBU CITY, PHILIPPINES"
  );
  const [clinicHours, setClinicHours] = useState("9:00AM - 5:00PM");
  const [telephoneNumber, setTelephoneNumber] = useState("324123553");
  const [emailAddress, setEmailAddress] = useState(
    "info@dentalclinic-cebu.com"
  );
  const [mobileNumber, setMobileNumber] = useState("9234188996");
  const [error, setError] = useState(false);
  const [website, setWebsite] = useState("info@dentalclinic-cebu.com");
  const [checkedValues, setCheckedValues] = useState({
    filing: false,
    bridges: false,
    crowns: false,
    surgery: false,
    inlay: false,
    veneers: false,
    simpleExraction: false,
    dentalImplant: false,
    toothRemoval: false,
    canalTreatment: false,
    dentures: false,
    fluorideApplication: false,
    xray: false,
    amalgamRemoval: false,
    oralProphylaxis: false,
    teethWhitening: false,
  });
  const [patientPad, setPatientPad] = useState();
  const [dentistPad, setDentistPad] = useState();
  const [witnessPad, setWitnessPad] = useState();

  const handleCheckboxChange = (event) => {
    setCheckedValues({
      ...checkedValues,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDentistName = (event) => {
    setDentist(event.target.value);
  };

  const handleWitnessName = (event) => {
    setWitness(event.target.value);
  };

  const handlePatientName = (event) => {
    setName(event.target.value);
  };

  const generatePDF = () => {
    if (name === "" || dentist === "" || witness === "") {
      setError(true);
    } else {
      setError(false);
      const printClinicAddress = `${clinicAddress}`;
      const printTelephoneNumber = `Tel.No. ${telephoneNumber}`;
      const printCelNumber = `Cel.No. ${mobileNumber}`;
      const printEmailAddress = `Email:${emailAddress}`;
      const printWebsite = `Website: ${website}`;
      const consentItems = [
        checkedValues.filing && "Filling",
        checkedValues.bridges && "Bridges",
        checkedValues.crowns && "Crowns",
        checkedValues.surgery && "Surgery",
        checkedValues.inlay && "Inlay / Onlay",
        checkedValues.veneers && "Veneers",
        checkedValues.simpleExraction && "Simple Extraction",
        checkedValues.toothRemoval && "Impacted Tooth Removal",
        checkedValues.canalTreatment && "Root Canal Treatment",
        checkedValues.dentures && "Dentures",
        checkedValues.fluorideApplication && "Fluoride Application",
        checkedValues.xray && "X-ray",
        checkedValues.amalgamRemoval && "Amalgam Removal",
        checkedValues.oralProphylaxis && "Oral Prophalaxis",
        checkedValues.teethWhitening && "Teeth Whitening",
      ]
        .filter((item) => item)
        .join(", ");
      const printSettleofAccount = `I understand that a 50% downpayment is required in order for the laboratory to start the fabrication of nay of the following Prostehtic treatment: Crowns (Caps), Bridges, Inlays/Onlays, Veeners or Dentures. I also understand that the remaining 50% balance should be paid in full on the appointment of final installation of the involved treatment. It is my responsibility to return for final installation and failre to keep this appointment, will still require complete payment of the remainign blanace.\n 
    I understand that dentistry is not an exact science and therefore, reputable practitioners cannot properly guanratee results. I acknowledge that no guarantee or assurance has been made by anyone regarding the dental treatment, which I have requested and authorized. I understand that no other Dentist is responsible for my dental treatment. \n
    I hearby authorize any of the doctors of dental auxilliaries to proceed with and perform the dental restorations and treatments as explained to me. I understand that this is only an extimate and subject to modification depening on the unforseen circumstances that may arise during the course of treatment. I understand that regardless of any insurance coverage I may have. I am responsible for payment of dental fees. I agree to pay any attourney's fee, collection fees, or court costs that may have ben incurred to satisfy this obligation.\n
    I have read and understood all the above mentioned and agree to the treatment and settlement of account`;

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
      doc.setFontSize(15);
      doc.setFont(undefined, "bold");
      doc.text("I understand the following treatments to perform:", 10, 50);
      doc.setFont(undefined, "normal");
      doc.text(consentItems, 10, 58, { maxWidth: 185, align: "justify" });

      doc.setFont(undefined, "bold");
      doc.setFontSize(17);
      doc.text("Drugs and Medication", 10, 90);
      doc.setFontSize(15);
      doc.setFont(undefined, "normal");
      doc.text(
        "I understand that antibiotics, analgesics and other medications can cause allergic reactions causing redness and swealing of tissue, pain, itching, vomiting, and/or anaphylactic shock.",
        10,
        97,
        { maxWidth: 185, align: "justify" }
      );

      doc.setFont(undefined, "bold");
      doc.setFontSize(17);
      doc.text("Changes in Treatment Plan", 10, 120);
      doc.setFontSize(15);
      doc.setFont(undefined, "normal");
      doc.text(
        "I understand that during treatment, it may be nessecary to change or add procedures because of conditions found while working on the teeth which were not discovered during examination. For example, a root canal therapy following routine restorative procedures. I give my permission to the Dentist to make any/if changes and additions necessary.",
        10,
        127,
        { maxWidth: 185, align: "justify" }
      );

      doc.setFont(undefined, "bold");
      doc.setFontSize(17);
      doc.text("Removal of Teeth", 10, 162);
      doc.setFontSize(15);
      doc.setFont(undefined, "normal");
      doc.text(
        "Alternative to removal have been explained to me (root canal therapy, crowns, periodontal surgery, etc.) and authorize the dentist to remove that following teeth ______,  and other necessary for reasons in paragraph #3. I understand removing teeth does not always remove all the infection, if present, it may be necessary to have further treatment. I understand the risk involved in having it removed. Some of which are pain, swelling, spread of infection, dry socket, loss of feeling in my teeth, lips, tounge and surrounding tissue (Paresthesia) that can last for an indefinite period of time or a fractued jaw. I understand I may need further treatment by a specialist if complications arise during or folowing treatment, the cost of which is my responsiblity. ",
        10,
        170,
        { maxWidth: 185, align: "justify" }
      );

      doc.setFont(undefined, "bold");
      doc.setFontSize(17);
      doc.text("Crown (Caps), Bridges, Inlay/Outlay and Veneers", 10, 235);
      doc.setFontSize(15);
      doc.setFont(undefined, "normal");
      doc.text(
        "I understand that sometimes, it is not possible to match the color of natural teeth exactly with artificial teeth. I further understand that I am wearing temporary crowns, which may come off easily and that I must be careful to ensure that they are kept on until the permanent crowns are installed. I realize the final oppurtunity to make changes in my permanent crown, bridge, veneer, or cap (including shape, fit, size, and color) will be before cementation. It is also my responsibility to return for veneer or cap. I understand there will be additional charges for remarks to my delaying permenent cementation.",
        10,
        242,
        { maxWidth: 185, align: "justify" }
      );

      doc.addPage();

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

      doc.setFont(undefined, "bold");
      doc.setFontSize(17);
      doc.text("Endontic Treatment (Root Canal Treatment)", 10, 50);
      doc.setFontSize(15);
      doc.setFont(undefined, "normal");
      doc.text(
        "I realize there is no guarantee that root canal treatment will save my tooth, and that complications can occur from treatment, and that occasionally root canal filling material may extend through the tooth which does not necessarily effect to the success of the treatment. I understand that endodontic files and reamers are very fine instruments and stresses vented in their manufacture can cause them to seperate during use. I understand that occasionally additional surgical procedures may be necessary following root canal treatment (apicoectomy). I understand that the tooth may be lost in spite of all effort to save it",
        10,
        58,
        { maxWidth: 185, align: "justify" }
      );

      doc.setFont(undefined, "bold");
      doc.setFontSize(17);
      doc.text("Periodontal Loss (Tissue and Bone)", 10, 115);
      doc.setFontSize(15);
      doc.setFont(undefined, "normal");
      doc.text(
        "I understand that I have a serious condition, causing gum and bone inflammation or loss that can happen to my teeth. Alternative treatment plants have been explained to me, including gum surgery, replacements and/or extractions. I understand that undetaking any dental procedures may have a further avderse effect on my peridontal condition",
        10,
        123,
        { maxWidth: 185, align: "justify" }
      );

      doc.setFont(undefined, "bold");
      doc.setFontSize(17);
      doc.text("Restorative Filling", 10, 160);
      doc.setFontSize(15);
      doc.setFont(undefined, "normal");
      doc.text(
        "I understand that care must be exercised in chewing on Silver Amalgam filling especially during the first 24-hours to avoid breakage. I understand that a more extensive filling that originallty diagnosed, may be required due to additional decay. I also understand decay and that sensitivity is a common after effect of a newly placed filling.",
        10,
        168,
        { maxWidth: 185, align: "justify" }
      );

      doc.setFont(undefined, "bold");
      doc.setFontSize(17);
      doc.text("Dentures", 10, 205);
      doc.setFontSize(15);
      doc.setFont(undefined, "normal");
      doc.text(
        "I understand that wearing of dentures is diffcult during the first few days. Sore spots, altered speech, and difficulty in chewing are common problems. Immediate denture (placement of denture immediately after extraction) may be painful and may require considerable adjusting and several relines. A permanent reline may be needed later. This is not included in the denture fee. I understand that is the responsibility to return for installation of the dentures. I understand that failure to keep my installation appointment may result in poorly fitted dentures. If a remake is required due to my delays of more than 30 days, there will be additional charges.",
        10,
        215,
        { maxWidth: 185, align: "justify" }
      );

      doc.addPage();

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

      doc.setFont(undefined, "bold");
      doc.setFontSize(17);
      doc.text("Settlement of Account", 10, 50);
      doc.setFontSize(15);
      doc.setFont(undefined, "normal");
      doc.text(
        "I understand that upon completion of all procedures done, like Simple Extraction, Filling, Sealants, Prophylaxis nad Denture Reparis on a given appoint,ment amounting to not more than P5,000.00 must be paid immediately in full before any further treatment can be rendered. If the amount exceeds P5,000.00 and I am not able to settle it on the day, I agree to settle the remaining balance within one week from this day. I also understand that the fees and prices discussed with me are suibject to change due to unforseen circumstances (like changes in treatment plan or changes in laboratory fees, etc.).",
        10,
        58,
        { maxWidth: 185, align: "justify" }
      );
      doc.text(printSettleofAccount, 10, 120, {
        maxWidth: 185,
        align: "justify",
      });

      doc.addPage();
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

      doc.setFontSize(12);
      doc.addImage(img, "png", 10, 0, 90, 40);

      const docSig = new Image();
      const witSig = new Image();
      const patSig = new Image();

      docSig.src = dentistPad.getTrimmedCanvas().toDataURL('image/png');
      patSig.src = patientPad.getTrimmedCanvas().toDataURL('image/png');
      witSig.src = witnessPad.getTrimmedCanvas().toDataURL('image/png');

      doc.text(`Dentist: ${dentist}`, 10, 73, {
        maxWidth: 54,
        align: "justify",
      });
      doc.addImage(docSig, "png", 10, 50, 40, 20);

      doc.text(`Patient: ${name}`, 100, 73, { maxWidth: 54, align: "justify" });
      doc.addImage(witSig, "png", 100, 50, 40, 20);

      doc.text(`Witness: ${witness}`, 10, 143, {
        maxWidth: 54,
        align: "justify",
      });
      doc.addImage(patSig, "png", 10, 120, 40, 20);

      doc.save(`${name}_consent.pdf`);
    }
  };

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
            <MenuItem value={INFORMED_CONSENT}>Informed Consent</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="grid grid-cols-2 gap-4 place-content-center h-[40%] mb-5">
        <TextField
          value={clinicAddress}
          onChange={handleClinicAddress}
          label={"Clinic Address*"}
        />
        <TextField
          value={clinicHours}
          onChange={handleClinicHours}
          label={"Clinic Hours"}
        />
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

      <FormControl component="fieldset">
        <FormLabel component="legend">
          I understand the following treatments to perform:
        </FormLabel>
        <FormGroup style={{ flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.filing}
                onChange={handleCheckboxChange}
                name="filing"
              />
            }
            label="Filling"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.bridges}
                onChange={handleCheckboxChange}
                name="bridges"
              />
            }
            label="Bridges"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.crowns}
                onChange={handleCheckboxChange}
                name="crowns"
              />
            }
            label="Crowns"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.surgery}
                onChange={handleCheckboxChange}
                name="surgery"
              />
            }
            label="Surgery"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.inlay}
                onChange={handleCheckboxChange}
                name="inlay"
              />
            }
            label="Inlay / Onlay"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.veneers}
                onChange={handleCheckboxChange}
                name="veneers"
              />
            }
            label="Veneers"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.simpleExraction}
                onChange={handleCheckboxChange}
                name="simpleExraction"
              />
            }
            label="Simple Extraction"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.dentalImplant}
                onChange={handleCheckboxChange}
                name="dentalImplant"
              />
            }
            label="Dental Implant"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.toothRemoval}
                onChange={handleCheckboxChange}
                name="toothRemoval"
              />
            }
            label="Impacted Tooth Removal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.canalTreatment}
                onChange={handleCheckboxChange}
                name="canalTreatment"
              />
            }
            label="Root Canal Treatment"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.dentures}
                onChange={handleCheckboxChange}
                name="dentures"
              />
            }
            label="Dentures"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.fluorideApplication}
                onChange={handleCheckboxChange}
                name="fluorideApplication"
              />
            }
            label="Fluoride Application"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.xray}
                onChange={handleCheckboxChange}
                name="xray"
              />
            }
            label="X-rays"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.amalgamRemoval}
                onChange={handleCheckboxChange}
                name="amalgamRemoval"
              />
            }
            label="Amalgam Removal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.oralProphylaxis}
                onChange={handleCheckboxChange}
                name="oralProphylaxis"
              />
            }
            label="Oral Prophylaxis"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedValues.teethWhitening}
                onChange={handleCheckboxChange}
                name="teethWhitening"
              />
            }
            label="Teeth Whitening"
          />
        </FormGroup>
      </FormControl>

      <h1 className="mt-2 font-bold text-2xl">Drugs and Medication</h1>
      <p>
        I understand that antibiotics, analgesics and other medications can
        cause allergic reactions causing redness and swealing of tissue, pain,
        itching, vomiting, and/or anaphylactic shock.
      </p>

      <h1 className="mt-2 font-bold text-2xl">Changes in Treatment Plan</h1>
      <p>
        I understand that during treatment, it may be nessecary to change or add
        procedures because of conditions found while working on the teeth which
        were not discovered during examination. For example, a root canal
        therapy following routine restorative procedures. I give my permission
        to the Dentist to make any/if changes and additions necessary.
      </p>

      <h1 className="mt-2 font-bold text-2xl">Removal of Teeth</h1>
      <p>
        Alternative to removal have been explained to me (root canal therapy,
        crowns, periodontal surgery, etc.) and authorize the dentist to remove
        that following teeth ______, and other necessary for reasons in
        paragraph #3. I understand removing teeth does not always remove all the
        infection, if present, it may be necessary to have further treatment. I
        understand the risk involved in having it removed. Some of which are
        pain, swelling, spread of infection, dry socket, loss of feeling in my
        teeth, lips, tounge and surrounding tissue (Paresthesia) that can last
        for an indefinite period of time or a fractued jaw. I understand I may
        need further treatment by a specialist if complications arise during or
        folowing treatment, the cost of which is my responsiblity.
      </p>

      <h1 className="mt-2 font-bold text-2xl">
        Crown (Caps), Bridges, Inlay/Outlay and Veneers
      </h1>
      <p>
        I understand that sometimes, it is not possible to match the color of
        natural teeth exactly with artificial teeth. I further understand that I
        am wearing temporary crowns, which may come off easily and that I must
        be careful to ensure that they are kept on until the permanent crowns
        are installed. I realize the final oppurtunity to make changes in my
        permanent crown, bridge, veneer, or cap (including shape, fit, size, and
        color) will be before cementation. It is also my responsibility to
        return for veneer or cap. I understand there will be additional charges
        for remarks to my delaying permenent cementation.
      </p>

      <h1 className="mt-2 font-bold text-2xl">
        Endontic Treatment (Root Canal Treatment)
      </h1>
      <p>
        I realize there is no guarantee that root canal treatment will save my
        tooth, and that complications can occur from treatment, and that
        occasionally root canal filling material may extend through the tooth
        which does not necessarily effect to the success of the treatment. I
        understand that endodontic files and reamers are very fine instruments
        and stresses vented in their manufacture can cause them to seperate
        during use. I understand that occasionally additional surgical
        procedures may be necessary following root canal treatment
        (apicoectomy). I understand that the tooth may be lost in spite of all
        effort to save it
      </p>

      <h1 className="mt-2 font-bold text-2xl">
        Periodontal Loss (Tissue and Bone)
      </h1>
      <p>
        I understand that I have a serious condition, causing gum and bone
        inflammation or loss that can happen to my teeth. Alternative treatment
        plants have been explained to me, including gum surgery, replacements
        and/or extractions. I understand that undetaking any dental procedures
        may have a further avderse effect on my peridontal condition
      </p>

      <h1 className="mt-2 font-bold text-2xl">Restorative Filling</h1>
      <p>
        I understand that care must be exercised in chewing on Silver Amalgam
        filling especially during the first 24-hours to avoid breakage. I
        understand that a more extensive filling that originallty diagnosed, may
        be required due to additional decay. I also understand decay and that
        sensitivity is a common after effect of a newly placed filling.
      </p>

      <h1 className="mt-2 font-bold text-2xl">Dentures</h1>
      <p>
        I understand that wearing of dentures is diffcult during the first few
        days. Sore spots, altered speech, and difficulty in chewing are common
        problems. Immediate denture (placement of denture immediately after
        extraction) may be painful and may require considerable adjusting and
        several relines. A permanent reline may be needed later. This is not
        included in the denture fee. I understand that is the responsibility to
        return for installation of the dentures. I understand that failure to
        keep my installation appointment may result in poorly fitted dentures.
        If a remake is required due to my delays of more than 30 days, there
        will be additional charges.
      </p>

      <h1 className="mt-2 font-bold text-2xl">Settlement of Account</h1>
      <p>
        I understand that upon completion of all procedures done, like Simple
        Extraction, Filling, Sealants, Prophylaxis nad Denture Reparis on a
        given appoint,ment amounting to not more than P5,000.00 must be paid
        immediately in full before any further treatment can be rendered. If the
        amount exceeds P5,000.00 and I am not able to settle it on the day, I
        agree to settle the remaining balance within one week from this day. I
        also understand that the fees and prices discussed with me are suibject
        to change due to unforseen circumstances (like changes in treatment plan
        or changes in laboratory fees, etc.).
      </p>

      <p className="mt-2">
        I understand that a 50% downpayment is required in order for the
        laboratory to start the fabrication of nay of the following Prostehtic
        treatment: Crowns (Caps), Bridges, Inlays/Onlays, Veeners or Dentures. I
        also understand that the remaining 50% balance should be paid in full on
        the appointment of final installation of the involved treatment. It is
        my responsibility to return for final installation and failre to keep
        this appointment, will still require complete payment of the remainign
        blanace.
      </p>

      <p className="mt-2">
        I understand that dentistry is not an exact science and therefore,
        reputable practitioners cannot properly guanratee results. I acknowledge
        that no guarantee or assurance has been made by anyone regarding the
        dental treatment, which I have requested and authorized. I understand
        that no other Dentist is responsible for my dental treatment.
      </p>

      <p className="mt-2">
        I hearby authorize any of the doctors of dental auxilliaries to proceed
        with and perform the dental restorations and treatments as explained to
        me. I understand that this is only an extimate and subject to
        modification depening on the unforseen circumstances that may arise
        during the course of treatment. I understand that regardless of any
        insurance coverage I may have. I am responsible for payment of dental
        fees. I agree to pay any attourney's fee, collection fees, or court
        costs that may have ben incurred to satisfy this obligation.
      </p>

      <p className="mt-2">
        I have read and understood all the above mentioned and agree to the
        treatment and settlement of account
      </p>

      <div className="flex justify-between mt-10">
        <div className="flex flex-col">
          <SignatureCanvas
            ref={(data) => setDentistPad(data)}
            canvasProps={{ width: 300, height: 150, className: "shadow-lg" }}
          />
          <p className="mb-5">Doctor's Signature</p>
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
            ref={(data) => setWitnessPad(data)}
            canvasProps={{ width: 300, height: 150, className: "shadow-lg" }}
          />
          <p className="mb-5">Witness' Signature</p>
          <TextField
            value={witness}
            onChange={handleWitnessName}
            label={"Witness Name"}
            error={error}
          />
          <button onClick={() => witnessPad.clear()}>Clear Signature</button>
        </div>
        <div className="flex flex-col">
          <SignatureCanvas
            ref={(data) => setPatientPad(data)}
            canvasProps={{ width: 300, height: 150, className: "shadow-lg" }}
          />
          <p className="mb-5">Patient's Signature</p>
          <TextField
            value={name}
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

export default Consent;
