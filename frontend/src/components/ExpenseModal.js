import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Modal, Box, Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
    AMOUNT_PAID,
    CHANGE_CPU,
    CHANGE_EXPENSE,
    CHANGE_NAME,
    CHANGE_QUANTITY,
    CHANGE_TOTAL,
    COST,
    EDIT_DATA,
    PUSH_DATA,
  } from "../components/Constant";

  // open={state.showModal}
  // onClose={closeModal}
  // state={state}
  // handleChange={handleChange}
  // editMode={state.editMode}
  // setError={state.setError}

function ExpenseModal({open, onClose, state, handleChange, editMode, setError }) {
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
            id="exppense-type-field"
            label="Type of Expense"
            helperText=""
            onChange={(event) => handleChange(event, CHANGE_EXPENSE)}
            value={state.expenseType ? state.expenseType : ""}
            error={setError}
          />
          <TextField
            required
            id="name-field"
            label="Name"
            helperText=""
            onChange={(event) => handleChange(event, CHANGE_NAME)}
            value={state.name ? state.name : " "}
            error={setError}
          />
          <TextField
            id="quantity-field"
            label="Quantity"
            helperText=""
            onChange={(event) => handleChange(event, CHANGE_QUANTITY)}
            value={state.quantity ?  state.quantity : " "}
            error={setError}
          />
          <TextField
            id="base-cost-field"
            label="Base Cost"
            helperText=""
            onChange={(event) => handleChange(event, CHANGE_CPU)}
            value={state.baseCost ? state.baseCost : " "}
            error={setError}
          />
          <TextField
            id="expense-field"
            label="Expense"
            helperText=""
            onChange={(event) => handleChange(event, CHANGE_TOTAL)}
            value={state.total ? state.total: " "}
            error={setError}
          /> 
          <Button onClick={(event) => handleChange(event, editMode === true ? EDIT_DATA : PUSH_DATA)}>
            Save
          </Button>
          {/* {state.date ? state.date.toISOString().slice(0, 10) : " "} */}
        </div>
      </Box>
    </Modal>
  );
}

export default ExpenseModal
