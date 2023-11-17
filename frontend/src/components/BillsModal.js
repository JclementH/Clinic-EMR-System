import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Modal, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AMOUNT_AFTER_DUE, AMOUNT_DUE, AMOUNT_PAID, CHANGE_NAME, DATE_PAID, DUE_DATE, EDIT_DATA, PUSH_DATA, SET_NAME } from "./Constant";

function BillsModal({
  open,
  onClose,
  state,
  handleChange,
  editMode,
  setError, 
}) {

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          width: "1500px",
          height: "1000px",
          padding: "16px",
          maxWidth: "80vw",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div>
          <TextField
            required
            id="name-field"
            label="Name"
            helperText="Name"
            onChange={(event) => handleChange(event, SET_NAME)}
            value={state.name == null ? "" : state.name}
            error={setError}
          />
          <TextField
            required
            id="amount-due-field"
            label="Amount Due"
            helperText="Amount Due"
            onChange={(event) => handleChange(event, AMOUNT_DUE)}
            value={state.amountDue == null ? "" : state.amountDue}
            error={setError}
          />
          <TextField
            id="amount-after-due-field"
            label="Amount After Due"
            helperText="Amount After Due"
            onChange={(event) => handleChange(event, AMOUNT_AFTER_DUE)}
            value={state.amountAfterDue == null ? "" : state.amountAfterDue}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              required
              label="Amount Due"
              value={setError === true ? {} : state.dueDate}
              onChange={(event) => handleChange(event, DUE_DATE)}
            />
            <DatePicker
              required
              label="Date Paid"
              value={setError === true ? {} : state.datePaid}
              onChange={(event) => handleChange(event, DATE_PAID)}
            />
          </LocalizationProvider>
          <TextField
            id="amount-paid"
            label="Amount Paid"
            helperText="Amount Paid"
            onChange={(event) => handleChange(event, AMOUNT_PAID)}
            value={state.amountPaid == null ? "" : state.amountPaid}
          />
          <Button
            onClick={(event) =>
              handleChange(event, editMode === true ? EDIT_DATA : PUSH_DATA)
            }
          >
            Save
          </Button>
          {/* {state.date ? state.date.toISOString().slice(0, 10) : " "} */}
        </div>
      </Box>
    </Modal>
  );
}

export default BillsModal;
