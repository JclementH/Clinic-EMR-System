import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Modal, Box, Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
    AMOUNT_PAID,
    CHANGE_DATE,
    CHANGE_NAME,
    COST,
    DATE_PAID,
    IS_PAID,
    PUSH_DATA,
    CLEAR_DATA,
    EDIT_DATA
  } from "../components/Constant";

function ExpenseModal({open, onClose, state, handleChange, handleDateChange, handleDatePaidChange, editMode, handleAC}) {
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
            onChange={(event) => handleChange(event, CHANGE_NAME)}
            value={state.name == null ? "" : state.name}
            error={state.nameError}
          />
          <TextField
            required
            id="cost-field"
            label="Cost"
            helperText="Cost"
            onChange={(event) => handleChange(event, COST)}
            value={state.cost == null ? "" : state.cost}
            error={state.costError}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Amount Due"
              value={state.date}
              onChange={handleDateChange}
            />
            <DatePicker
              label="Date Paid"
              value={state.datePaid}
              onChange={handleDatePaidChange}
              disabled={!state.status}
            />
          </LocalizationProvider>
          <Checkbox
            id="is-paid-checkbox"
            checked={state.status}
            onChange={(event) => handleChange(event, IS_PAID)}
          />
          <TextField
            id="amount-paid-field"
            label="Amount Paid"
            helperText="Amount Paid"
            onChange={(event) => handleChange(event, AMOUNT_PAID)}
            value={state.amountPaid == null ? "" : state.amountPaid}
            disabled={state.status}
            error={state.amountPaidError}
          />
          <Button onClick={handleAC}>
            Save
          </Button>
          {/* {state.date ? state.date.toISOString().slice(0, 10) : " "} */}
        </div>
      </Box>
    </Modal>
  );
}

export default ExpenseModal
