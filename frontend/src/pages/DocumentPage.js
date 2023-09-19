import { ThemeProvider } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { produce } from "immer";
import { useReducer } from "react";
import Box from "@mui/material/Box";
import theme from "../components/Theme";

const CERTFICATE_SELECT = "certificates";
const WORK_SELECT = "work";
const DOSAGE_SELECT = "dosage";
const RTX_SELECT = "rtx";
const CONSENT_SELECT = "consent";

const reducer = (state, action) => {
  switch (action.type) {
    case CERTFICATE_SELECT:
      state.selectRecords = CERTFICATE_SELECT;
      return;
    case WORK_SELECT:
      state.selectRecords = WORK_SELECT;
      return;
    case DOSAGE_SELECT:
      state.selectRecords = DOSAGE_SELECT;
      return;
    case RTX_SELECT:
      state.selectRecords = RTX_SELECT;
      return;
    case CONSENT_SELECT:
      state.selectRecords = CONSENT_SELECT;
      return;
    default:
      throw new Error("unexpected action type" + action.type);
  }
};

function DocumentPage() {
  const [state, dispatch] = useReducer(produce(reducer), {
    selectRecords: CERTFICATE_SELECT,
  });

  const selectCertificates = () => {
    dispatch({ type: CERTFICATE_SELECT });
  };

  const selectWork = () => {
    dispatch({ type: WORK_SELECT });
  };

  const selectDosage = () => {
    dispatch({ type: DOSAGE_SELECT });
  };

  const selectRTX = () => {
    dispatch({ type: RTX_SELECT });
  };

  const selectConsent = () => {
    dispatch({ type: CONSENT_SELECT });
  };

  return (
    <div className="mt-20">
      <ThemeProvider theme={theme}>
        <ButtonGroup
          className={"bg-gray-200 border-solid border-2 border-black"}
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button size="large" color="main_grey" onClick={selectCertificates}>
            Certificates
          </Button>
          <Button size="large" color="main_grey" onClick={selectWork}>
            Work Authorization
          </Button>
          <Button size="large" color="main_grey" onClick={selectDosage}>
            Pedo Dosage Calculator
          </Button>
          <Button size="large" color="main_grey" onClick={selectRTX}>
            RTX
          </Button>
          <Button size="large" color="main_grey" onClick={selectConsent}>
            Consent
          </Button>
        </ButtonGroup>
      </ThemeProvider>
      <Box className={"bg-gray-200 p-10 border-solid border-2 border-black"}>
        {state.selectRecords === CERTFICATE_SELECT ? "Certificates" : ""}
        {state.selectRecords === WORK_SELECT ? "Work Authorization" : ""}
        {state.selectRecords === DOSAGE_SELECT ? "Pedo Dosage Calculator" : ""}
        {state.selectRecords === RTX_SELECT ? "RTX" : ""}
        {state.selectRecords === CONSENT_SELECT ? "Consent" : ""}
      </Box>
    </div>
  );
}

export default DocumentPage;
