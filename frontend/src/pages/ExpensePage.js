import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useReducer, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Modal, Box, Checkbox } from "@mui/material";
import { produce } from "immer";
import dayjs from "dayjs";
import ExpenseModal from "../components/ExpenseModal";
import {
  AMOUNT_PAID,
  CHANGE_DATE,
  CHANGE_NAME,
  COST,
  DATE_PAID,
  IS_PAID,
  PUSH_DATA,
  CLEAR_DATA,
  EDIT_DATA,
  SET_PAID,
  SET_EDIT,
  SET_ID,
  DELETE_ID,
} from "../components/Constant";
import DeleteModal from "../components/DeleteModal";

function createData(id, name, cost, date, status, amountPaid, datePaid) {
  return { id, name, cost, date, status, amountPaid, datePaid };
}

let id = 0;

const SET_MODAL_ON = "set-modal-on";
const SET_MODAL_OFF = "set-modal-off";
const SET_EXTT_MODAL_ON = "set-exit-modal-on";
const SET_EXTT_MODAL_OFF = "set-exit-modal-off";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_MODAL_ON:
      state.showModal = true;
      return;

    case SET_MODAL_OFF:
      state.showModal = false;
      return;

    case SET_EXTT_MODAL_ON:
      state.showExitModal = true;
      return;

    case SET_EXTT_MODAL_OFF:
      state.showExitModal = false;
      return;

    case CHANGE_NAME:
      state.name = action.payload;
      return;

    case COST:
      state.cost = action.payload;
      return;

    case CHANGE_DATE:
      console.log("date: ", action.payload);
      state.date = action.payload;
      return;

    case SET_PAID:
      state.status = action.payload;
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
      const setID = id + 1;
      id++;

      state.rows = [
        ...state.rows,
        createData(
          setID,
          state.name,
          state.cost,
          state.date,
          state.status,
          state.status === true ? state.cost : state.amountPaid,
          state.datePaid
        ),
      ];
      return;

    case CLEAR_DATA:
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

    case SET_ID:
      state.id = action.payload;
      return;

    case SET_EDIT:
      state.editMode = !state.editMode;
      return;

    case EDIT_DATA:
      const newRows = [...state.rows];
      const index = newRows.findIndex((item) => item.id === state.id);

      if (index !== -1) {
        if (state.name === "") {
          state.nameError = true;
          return;
        }
        if (state.cost === "") {
          state.costError = true;
          return;
        }
        newRows[index] = createData(
          state.id,
          state.name,
          state.cost,
          state.date,
          state.status,
          state.status === true ? state.cost : state.amountPaid,
          state.datePaid
        );
      }

      state.rows = newRows;
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
      state.editMode = !state.editMode;
      return;

    case DELETE_ID:
      const newRow = state.rows.filter((expense) => expense.id !== action.payload);
      state.rows = newRow;
      state.showExitModal = false;
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
    showExitModal: false,
    id: null,
    name: null,
    cost: null,
    date: null,
    status: false,
    amountPaid: null,
    datePaid: null,
    nameError: false,
    costError: false,
    amountPaidError: false,
    editMode: false,
    rows: [],
  });

  const handleChange = (event, type) => {
    if (type === COST || type === AMOUNT_PAID) {
      dispatch({ type, payload: event.target.value.replace(/[^0-9]/g, "") });
    } else if (type === PUSH_DATA) {
      dispatch({ type, payload: event.target.value });
      dispatch({ type: CLEAR_DATA });
    } else {
      dispatch({ type, payload: event.target.value });
    }
  };

  function handleEdit(object) {
    dispatch({ type: SET_EDIT });
    dispatch({ type: SET_ID, payload: object.id });
    dispatch({ type: CHANGE_NAME, payload: object.name });
    dispatch({ type: COST, payload: object.cost });
    dispatch({ type: CHANGE_DATE, payload: object.date });
    dispatch({ type: SET_PAID, payload: object.status });
    dispatch({ type: AMOUNT_PAID, payload: object.amountPaid });
    dispatch({ type: DATE_PAID, payload: object.datePaid });
    dispatch({ type: SET_MODAL_ON });
  }

  const handleDateChange = (date) => {
    // console.log(dayjs(state.date));
    // console.log("HandleDateChage date: " + date)
    dispatch({ type: CHANGE_DATE, payload: date });
  };

  const handleDatePaidChange = (date) => {
    dispatch({ type: DATE_PAID, payload: date });
  };

  const setModal = () => {
    dispatch({ type: SET_MODAL_ON });
  };

  function handleExitModal(object) {
    dispatch({ type: SET_EXTT_MODAL_ON });
    dispatch({ type: SET_ID, payload: object.id });
  }

  const closeExitModal = () => {
    dispatch({ type: SET_EXTT_MODAL_OFF });
  };

  const closeModal = () => {
    dispatch({ type: SET_MODAL_OFF });
    if (state.editMode) {
      dispatch({ type: SET_EDIT });
    }
    dispatch({ type: CLEAR_DATA });
  };

  return (
    <div>
      <div>
        <Button onClick={setModal}> Add </Button>
        <ExpenseModal
          open={state.showModal}
          onClose={closeModal}
          state={state}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handleDatePaidChange={handleDatePaidChange}
          editMode={state.editMode}
        />
        <DeleteModal
          open={state.showExitModal}
          onClose={closeExitModal}
          dispatch={dispatch}
          id={state.id}
        />
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
              <TableCell align="left"> </TableCell>
              <TableCell align="left"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rows.map((row) => (
              <TableRow
                key={`key-${row.id}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name && row.name}
                </TableCell>
                <TableCell align="right">{row.cost && row.cost}</TableCell>
                <TableCell align="right">
                  {row.date && dayjs(row.date).format("MM/DD/YYYY")}
                </TableCell>
                <TableCell align="right">
                  {row.status ? "Paid" : "Unpaid"}
                </TableCell>
                <TableCell align="right">
                  {row.amountPaid != null ? row.amountPaid : 0}
                </TableCell>
                <TableCell align="right">
                  {row.datePaid && dayjs(row.datePaid).format("MM/DD/YYYY")}
                </TableCell>
                <TableCell align="left">
                  <Button onClick={() => handleEdit(row)}> Edit </Button>
                </TableCell>
                <TableCell align="left">
                  <MdOutlineDeleteOutline
                    className={"hover:cursor-pointer hover:bg-gray-300 w-7 h-7"}
                    onClick={() => handleExitModal(row)}
                  />
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
