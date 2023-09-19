import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { useReducer } from "react";
import Paper from "@mui/material/Paper";
import { Button, Modal, Box, Checkbox } from "@mui/material";
import { produce } from "immer";
import {
  AMOUNT_PAID,
  CHANGE_DATE,
  CHANGE_NAME,
  COST,
  DATE_PAID,
  IS_PAID,
  PUSH_DATA,
} from "../components/Constant";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function createData(name, cost, date, status, amountPaid, datePaid) {
  return { name, cost, date, status, amountPaid, datePaid };
}

const rows = [];

const SET_MODAL_ON = "set-modal-on";
const SET_MODAL_OFF = "set-modal-off";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_MODAL_ON:
      state.showModal = true;
      return;

    case SET_MODAL_OFF:
      state.showModal = false;
      state.nameError = false;
      state.costError = false;
      state.dateError = false;
      state.amountPaidError = false;
      state.datePaidError = false;
      return;

    case CHANGE_NAME:
      state.name = action.payload;
      return;

    case COST:
      state.cost = action.payload;
      return;

    case CHANGE_DATE:
      state.date = action.payload;
      return;

    case IS_PAID:
      state.status = !state.status;
      return;

    case AMOUNT_PAID:
      state.amountPaid = action.payload;
      return;

    case DATE_PAID:
      state.datePaid = action.payload;
      return;

    case PUSH_DATA:
      if (state.name == null) {
        state.nameError = true;
        return;
      }
      if (state.cost == null) {
        state.costError = true;
        return;
      }
      if (state.date == null) {
        state.date = {};
        return;
      }
      if (state.datePaid == null && state.status === true) {
        state.datePaid = {};
        return;
      }
      rows.push(
        createData(
          state.name,
          state.cost,
          state.date,
          state.status,
          state.status === true ? state.cost : state.amountPaid,
          state.datePaid
        )
      );
      console.log( createData(
        state.name,
        state.cost,
        state.date,
        state.status,
        state.status === true ? state.cost : state.amountPaid,
        state.datePaid
      ))
      // localStorage.setItem('database', JSON.stringify(rows));
      state.showModal = false;
      state.name = null;
      state.cost = null;
      state.date = null;
      state.datePaid = null;
      state.status = false;
      state.amountPaid = null;
      state.nameError = false;
      state.costError = false;
      state.amountPaidError = false;
      return;

    default:
      throw new Error(
        "unexpected action type" + action.type + " At ExpensePage"
      );
  }
};

function ExpensePage() {
  const [state, dispatch] = useReducer(produce(reducer), {
    showModal: false,
    name: null,
    cost: null,
    date: null,
    status: false,
    amountPaid: null,
    nameError: false,
    costError: false,
    amountPaidError: false,
  });

  const handleChange = (event, type) => {
    if (type === COST || type === AMOUNT_PAID) {
      dispatch({ type, payload: event.target.value.replace(/[^0-9]/g, "") });
    } else {
      dispatch({ type, payload: event.target.value });
    }
  };

  const handleDateChange = (date) => {
    console.log(date);
    dispatch({ type: CHANGE_DATE, payload: date });
  };

  const handleDatePaidChange = (date) => {
    console.log(date);
    dispatch({ type: DATE_PAID, payload: date });
  };

  const setModal = () => {
    dispatch({ type: SET_MODAL_ON });
  };

  const closeModal = () => {
    dispatch({ type: SET_MODAL_OFF });
  };

  return (
    <div>
      <div>
        <Button onClick={setModal}> Add </Button>
        <Modal open={state.showModal} onClose={closeModal}>
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
                  error={state.dateError}
                />
                <DatePicker
                  label="Date Paid"
                  value={state.datePaid}
                  onChange={handleDatePaidChange}
                  disabled={!state.status}
                  error={state.datePaidError}
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
              <Button onClick={(event) => handleChange(event, PUSH_DATA)}>
                Save
              </Button>
              {/* {state.date ? state.date.toISOString().slice(0, 10) : " "} */}
            </div>
          </Box>
        </Modal>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Amount Due</TableCell>
              <TableCell align="right">Payment Status</TableCell>
              <TableCell align="right">Amount Paid</TableCell>
              <TableCell align="right">Date Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={`key-${row.name}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name == null ? "" : row.name}
                </TableCell>
                <TableCell align="right">
                  {row.cost == null ? "" : row.cost}
                </TableCell>
                <TableCell align="right">
                  {row.date == null ? "" : row.date.toISOString().slice(0, 10)}
                </TableCell>
                <TableCell align="right">
                  {row.status ? "Paid" : "Unpaid"}
                </TableCell>
                <TableCell align="right">
                  {row.amountPaid == null ? 0 : row.amountPaid}
                </TableCell>
                <TableCell align="right">
                  {row.datePaid == null
                    ? ""
                    : row.datePaid.toISOString().slice(0, 10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ExpensePage;
