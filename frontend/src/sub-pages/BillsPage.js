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
  AMOUNT_AFTER_DUE,
  AMOUNT_DUE,
  AMOUNT_PAID,
  CLEAR_DATA,
  CLEAR_ERROR,
  DATE_PAID,
  DELETE_DATA,
  DUE_DATE,
  EDIT_DATA,
  PUSH_DATA,
  SET_EDIT,
  SET_ID,
  SET_NAME,
} from "../components/Constant";
import DeleteModal from "../components/DeleteModal";
import BillsModal from "../components/BillsModal";

function createData(
  id,
  name,
  amountDue,
  amountAfterDue,
  dueDate,
  datePaid,
  amountPaid
) {
  return { id, name, amountDue, amountAfterDue, dueDate, datePaid, amountPaid };
}

let id = 0;

const SET_MODAL_ON = "set-modal-on";
const SET_MODAL_OFF = "set-modal-off";
const SET_EXTT_MODAL_ON = "set-exit-modal-on";
const SET_EXTT_MODAL_OFF = "set-exit-modal-off";

const reducer = (state, action) => {
  // name: null,
  // amountDue: null,
  // amountAfterDue: null,
  // dueDate: null,
  // datePaid: null,
  // amountPaid: null,
  switch (action.type) {
    case SET_MODAL_ON:
      state.showModal = true;
      return;

    case SET_MODAL_OFF:
      state.showModal = false;
      state.setError = false;
      return;

    case SET_NAME:
      state.name = action.payload;
      return;

    case AMOUNT_DUE:
      state.amountDue = action.payload;
      return;

    case AMOUNT_AFTER_DUE:
      state.amountAfterDue = action.payload;
      return;

    case DUE_DATE:
      state.dueDate = action.payload;
      return;

    case DATE_PAID:
      state.datePaid = action.payload;
      return;

    case AMOUNT_PAID:
      state.amountPaid = action.payload;
      return;

    case PUSH_DATA:
      if (
        state.name == null ||
        state.dueDate == null ||
        state.datePaid == null
      ) {
        state.setError = true;
        return;
      }

      const setID = id + 1;
      id++;

      const newRow = [
        ...state.rows,
        createData(
          setID,
          state.name,
          state.amountDue,
          state.amountAfterDue,
          state.dueDate,
          state.datePaid,
          state.amountPaid
        ),
      ];

      state.rows = newRow;
      state.showModal = false;
      return;

    case CLEAR_DATA:
      state.id = null;
      state.name = null;
      state.amountDue = null;
      state.amountAfterDue = null;
      state.dueDate = null;
      state.datePaid = null;
      state.amountPaid = null;
      return;

    case CLEAR_ERROR:
      state.setError = false;
      return;

    case SET_EXTT_MODAL_ON:
      state.showExitModal = true;
      return;

    case SET_EXTT_MODAL_OFF:
      state.showExitModal = false;
      return;

    case SET_ID:
      state.id = action.payload;
      return;

    case SET_EDIT:
      state.editMode = true;
      return;

    case DELETE_DATA:
      const newDeletedRow = state.rows.filter(
        (data) => data.id !== action.payload
      );
      state.rows = newDeletedRow;
      state.showExitModal = false;
      return;

    case EDIT_DATA:
      const newRows = [...state.rows];
      const index = newRows.findIndex((item) => item.id === state.id);

      if (index !== -1) {
        if (
          state.name === "" ||
          state.dueDate === "" ||
          state.datePaid === ""
        ) {
          state.setError = true;
          return;
        }
        newRows[index] = createData(
          state.id,
          state.name,
          state.amountDue,
          state.amountAfterDue,
          state.dueDate,
          state.datePaid,
          state.amountPaid
        );
      }

      state.rows = newRows;
      state.showModal = false;
      state.editMode = false;
      return;

    default:
      throw new Error("unexpected action type" + action.type + " At BillsPage");
  }
};

function BillsPage() {
  const [state, dispatch] = useReducer(produce(reducer), {
    showModal: false,
    showExitModal: false,
    id: null,
    name: null,
    amountDue: null,
    amountAfterDue: null,
    dueDate: null,
    datePaid: null,
    amountPaid: null,
    editMode: false,
    setError: false,
    rows: [],
  });

  const handleChange = (event, type) => {
    if (type === DUE_DATE || type === DATE_PAID) {
      dispatch({ type, payload: event });
    } else if (
      type === AMOUNT_DUE ||
      type === AMOUNT_AFTER_DUE ||
      type === AMOUNT_PAID
    ) {
      dispatch({ type, payload: event.target.value.replace(/[^0-9]/g, "") });
    } else if (type === PUSH_DATA) {
      dispatch({ type, payload: event.target.value });
      dispatch({ type: CLEAR_DATA });
    } else {
      dispatch({ type, payload: event.target.value });
    }
  };

  const setModal = () => {
    dispatch({ type: SET_MODAL_ON });
  };

  const closeModal = () => {
    dispatch({ type: SET_MODAL_OFF });
    dispatch({ type: CLEAR_DATA });
    dispatch({ type: CLEAR_ERROR });
  };

  const handleEdit = (object) => {
    dispatch({ type: SET_EDIT });
    dispatch({ type: SET_ID, payload: object.id });
    dispatch({ type: SET_NAME, payload: object.name });
    dispatch({ type: AMOUNT_DUE, payload: object.amountDue });
    dispatch({ type: AMOUNT_AFTER_DUE, payload: object.amountAfterDue });
    dispatch({ type: DUE_DATE, payload: object.dueDate });
    dispatch({ type: DATE_PAID, payload: object.datePaid });
    dispatch({ type: AMOUNT_PAID, payload: object.amountPaid });
    dispatch({ type: SET_MODAL_ON });
  };

  function handleExitModal(object) {
    dispatch({ type: SET_EXTT_MODAL_ON });
    dispatch({ type: SET_ID, payload: object });
  }

  const closeExitModal = () => {
    dispatch({ type: SET_EXTT_MODAL_OFF });
  };

  return (
    <div>
      <div>
        <p className="text-xl text-center font-bold">Bills Page</p>
        <Button onClick={setModal}> Add </Button>
        {/* <Button onClick={handlePullChanges}> Refresh </Button> */}
        <BillsModal
          open={state.showModal}
          onClose={closeModal}
          state={state}
          handleChange={handleChange}
          editMode={state.editMode}
          setError={state.setError}
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
            <TableRow className="bg-blue-400">
              <TableCell>
                <p className="font-bold text-l">Name</p>
              </TableCell>
              <TableCell align="right">
                <p className="font-bold text-l">Amount Due</p>
              </TableCell>
              <TableCell align="right">
                <p className="font-bold text-l">Amount After Due</p>
              </TableCell>
              <TableCell align="right">
                <p className="font-bold text-l">Due Date </p>
              </TableCell>
              <TableCell align="right">
                <p className="font-bold text-l">Date Paid </p>
              </TableCell>
              <TableCell align="right">
                <p className="font-bold text-l">Amount Paid </p>
              </TableCell>
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
                <TableCell align="right">
                  {row.amountDue && row.amountDue}
                </TableCell>
                <TableCell align="right">
                  {row.amountAfterDue && row.amountAfterDue}
                </TableCell>
                <TableCell align="right">
                  {row.dueDate && dayjs(row.dueDate).format("MM/DD/YYYY")}
                </TableCell>
                <TableCell align="right">
                  {row.datePaid && dayjs(row.datePaid).format("MM/DD/YYYY")}
                </TableCell>
                <TableCell align="right">
                  {row.amountPaid && row.amountPaid}
                </TableCell>
                <TableCell align="left">
                  <div className="flex">
                    <Button onClick={() => handleEdit(row)}> Edit </Button>
                    <MdOutlineDeleteOutline
                      className={
                        "hover:cursor-pointer hover:bg-gray-300 w-7 h-7 ml-2"
                      }
                      onClick={() => handleExitModal(row.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BillsPage;
