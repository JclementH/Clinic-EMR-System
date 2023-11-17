import { Button } from "@mui/base";
import { Dropdown, Menu, MenuItem } from "@mui/joy";
import Popover from "@mui/material/Popover";
import { useEffect, useRef, useState } from "react";
import SignaturePad from "signature_pad";
import jsPDF from "jspdf";
import SignatureCanvas from "react-signature-canvas";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";

function HomePage() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePullChanges = async () => {
    const response = await fetch(
      "http://25.30.166.184:3500/web/patient/?type=information&patientid=5",
      {
        method: "PUT",
        body: JSON.stringify({
          id: "5",
          civilstatus: "Widowed",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(await response.json());
  };

  // const response = await fetch(
  //   "http://25.30.166.184:3500/web/patient/?type=information",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  // console.log(await response.json())

  // const handlePullChanges = async () => {
  //   const response = await fetch(
  //     "http://25.30.166.184:3500/web/patient/?type=information",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         id: 5,
  //         namelast: "Ong",
  //         namefirst: "Sophia",
  //         namemiddle: "Anne",
  //         dateofbirth: "1989-04-26T16:00:00.000Z",
  //         civilstatus: "Married",
  //         patientaddress: "333 Rose Street, Cebu City, Philippines",
  //         patientgender: "Female",
  //         patientheight: "162.00",
  //         patientweight: "60.00",
  //         numbertelephone: "9331112277",
  //         numbermobile: "9779990000",
  //         email: "sophia.o@example.ph",
  //         occupation: "Accountant"
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   console.log(await response.json())
  //   }
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="mt-5 scale-[15vw]">
      <Box className={"shadow-lg w-[90%]"}>
        <div className="h-[900px]">
          <p className="font-bold text-5xl flex justify-center">Notification</p>
        </div>
      </Box>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={selectedDate} />
      </LocalizationProvider> */}
    </div>
  );
}

export default HomePage;
