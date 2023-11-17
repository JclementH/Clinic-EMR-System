import TeethImage from "../sub-pages/TeethImage";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import { produce } from "immer";
import { useReducer } from "react";
import classNames from "classnames";
import { Button } from "@mui/material";
import theme from "../components/Theme";
import { ThemeProvider } from "@emotion/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const IMAGE_SELECT = "images";
const FORMS_SELECT = "forms";
const PAYMENT_SELECT = "payment";
const TREATMENT_SELECT = "treatment";

const reducer = (state, action) => {
  switch (action.type) {
    case IMAGE_SELECT:
      state.selectRecords = IMAGE_SELECT;
      return;
    case FORMS_SELECT:
      state.selectRecords = FORMS_SELECT;
      return;
    case PAYMENT_SELECT:
      state.selectRecords = PAYMENT_SELECT;
      return;
    case TREATMENT_SELECT:
      state.selectRecords = TREATMENT_SELECT;
      return;
    default:
      throw new Error("unexpected action type" + action.type);
  }
};

function PatientRecord({patientData}) {
  const [state, dispatch] = useReducer(produce(reducer), {
    selectRecords: IMAGE_SELECT,
  });


  const selectImage = () => {
    dispatch({ type: IMAGE_SELECT });
  };

  const selectForms = () => {
    dispatch({ type: FORMS_SELECT });
  };

  const selectPayment = () => {
    dispatch({ type: PAYMENT_SELECT });
  };

  const selectTreatment = () => {
    dispatch({ type: TREATMENT_SELECT });
  };

  const handleBack = () => {
    window.history.back();
  }

  return (
    <div className="mt-20 relative" style={{position: "absolute", zIndex: "2"}}>
      <AiOutlineArrowLeft className="text-4xl absolute z-3 mt-[-60px] hover:text-blue-500" onClick={handleBack} title="Go Back"/>
      <p className="text-5xl mb-5">{patientData.replaceAll("_", " ")}</p>
      <ThemeProvider theme={theme}>
        <ButtonGroup
          className={"bg-gray-200 border-solid border-2 border-black"}
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button size="large" color="main_grey" onClick={selectImage}>
            Images
          </Button>
          <Button size="large" color="main_grey" onClick={selectForms}>
            Forms
          </Button>
          <Button size="large" color="main_grey" onClick={selectPayment}>
            Payment
          </Button>
          <Button size="large" color="main_grey" onClick={selectTreatment}>
            Treatment
          </Button>
        </ButtonGroup>
      </ThemeProvider>
      <Box className={"bg-white p-10 border-none shadow-lg w-[90%] h-[60%]"}>
        {state.selectRecords === IMAGE_SELECT ? <TeethImage /> : ""}
        {state.selectRecords === FORMS_SELECT ? "Forms" : ""}
        {state.selectRecords === PAYMENT_SELECT ? "Payment" : ""}
        {state.selectRecords === TREATMENT_SELECT ? "Treatment" : ""}
      </Box>
    </div>
  );
}

export default PatientRecord;
