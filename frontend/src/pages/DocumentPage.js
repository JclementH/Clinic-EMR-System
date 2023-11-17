import { ThemeProvider } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { produce } from "immer";
import { useEffect, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import theme from "../components/Theme";
import DosageCalculator from "../sub-pages/PedoDosageCalc";
import {
  CERTFICATE_SELECT,
  CONSENT_SELECT,
  DOSAGE_SELECT,
  RTX_SELECT,
  WORK_SELECT,
} from "../components/Constant";
import Certificates from "../sub-pages/Certificates";
import RTXPage from "../sub-pages/RtxPage";
import Consent from "../sub-pages/Consent";
import WorkAuthorizationPage from "../sub-pages/WorkAuthPage";

function DocumentPage({goto}) {  

  const widthMapping = {
    [CERTFICATE_SELECT]: "110%", 
    [WORK_SELECT]: "134%",       
    [DOSAGE_SELECT]: "204%",    
    [RTX_SELECT]: "98%",       
    [CONSENT_SELECT]: "98%"    
  };

  const width = widthMapping[goto] || "100%";

  return (
    <div className="mt-10 w-[80%]" style={{position: "fixed"}}>
      <Box sx={{
      height: "80vh", 
      overflow: 'auto',
      border: 'none',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      p: 2, 
    }}
    className={"bg-white"}>
        {goto === CERTFICATE_SELECT ? <Certificates /> : ""}
        {goto === WORK_SELECT ? <WorkAuthorizationPage /> : ""}
        {goto === DOSAGE_SELECT ? <DosageCalculator /> : ""}
        {goto === RTX_SELECT ? <RTXPage /> : ""}
        {goto === CONSENT_SELECT ? <Consent /> : ""}
      </Box>
    </div>
  );
}

export default DocumentPage;
