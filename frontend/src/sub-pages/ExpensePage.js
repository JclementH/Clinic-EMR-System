import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useReducer } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { produce } from "immer";
import dayjs from "dayjs";
import ExpenseModal from "../components/ExpenseModal";
import {
  CHANGE_NAME,
  PUSH_DATA,
  CLEAR_DATA,
  EDIT_DATA,
  SET_EDIT,
  SET_ID,
  DELETE_ID,
  SET_ROW,
  CHANGE_EXPENSE,
  CHANGE_QUANTITY,
  CHANGE_CPU,
  CHANGE_TOTAL,
  DELETE_DATA,
} from "../components/Constant";
import DeleteModal from "../components/DeleteModal";

function createData(id, expenseType, name, quantity, baseCost, total) {
  return { id, expenseType, name, quantity, baseCost, total };
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

    case SET_ROW:
      state.rows.push(action.payload);
      return;

    case CHANGE_EXPENSE:
      state.expenseType = action.payload;
      return;

    case CHANGE_QUANTITY:
      state.quantity = action.payload;
      return;

    case CHANGE_CPU:
      state.baseCost = action.payload;
      return;

    case CHANGE_TOTAL:
      state.total = action.payload;
      return;

    case PUSH_DATA:
      if (state.name == null || state.baseCost == null || state.total == null) {
        state.setError = true;
        return;
      }
      const setID = id + 1;
      id++;
      const rowNew = [
        ...state.rows,
        createData(
          setID,
          state.expenseType,
          state.name,
          state.quantity,
          state.baseCost,
          state.total
        ),
      ];

      state.rows = rowNew;
      state.showModal = false;
      return;

    case CLEAR_DATA:
      state.expenseType = null;
      state.name = null;
      state.quantity = null;
      state.baseCost = null;
      state.total = null;
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
        if (state.name === "" || state.baseCost === "" || state.total === "") {
          state.setError = true;
          return;
        }
        newRows[index] = createData(
          state.id,
          state.expenseType,
          state.name,
          state.quantity,
          state.baseCost,
          state.total
        );
      }

      state.rows = newRows;
      state.showModal = false;
      state.expenseType = null;
      state.name = null;
      state.quantity = null;
      state.baseCost = null;
      state.total = null;
      state.setError = null;
      state.editMode = !state.editMode;
      return;

    case DELETE_DATA:
      const newRow = state.rows.filter((data) => data.id !== action.payload);
      state.rows = newRow;
      state.showExitModal = false;
      return;

    default:
      throw new Error(
        "unexpected action type" + action.type + " At ExpensePage"
      );
  }
};

// expenseType, expenseFor, quantity, baseCost, total

function ExpensePage() {
  const [state, dispatch] = useReducer(produce(reducer), {
    showModal: false,
    showExitModal: false,
    id: null,
    name: null,
    expenseType: null,
    expenseFor: null,
    quantity: false,
    baseCost: null,
    total: null,
    setError: false,
    editMode: false,
    rows: [],
  });

  //   const data = await response.json();
  //   const expenseName = data.expenseType;
  //   const paymentStatus = data.expenselist;
  //   const expense = data.expenses;

  //   const mergedArray = expenseName.map((item1) => {
  //     const matchingItem2 = paymentStatus.find(
  //       (item2) => item2.id === item1.id
  //     );
  //     const matchingItem3 = expense.find((item3) => item3.id === item1.id);

  //     // Create a new object by spreading the properties from the three arrays
  //     return {
  //       ...item1,
  //       paymentstatus: matchingItem2 ? matchingItem2.paymentstatus : null,
  //       cost: matchingItem3 ? matchingItem3.cost : null,
  //       duedate: matchingItem3 ? matchingItem3.duedate : null,
  //       paiddate: matchingItem3 ? matchingItem3.paiddate : null,
  //       paidamount: matchingItem3 ? matchingItem3.paidamount : null,
  //     };
  //   });

  //   console.log(mergedArray);
  //   // dispatch({type: SET_ROW, payload: mergedArray})
  // };

  const handleAsyncChanges = async (event) => {
    dispatch({ type: PUSH_DATA, payload: event.target.value });

    // const response = await fetch(
    //   "http://25.30.166.184:4000/clinic/post/expense",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(
    //       createData(
    //         state.id,
    //         state.name,
    //         state.cost,
    //         state.date,
    //         state.status === true ? 1 : 0,
    //         state.status === true ? state.cost : state.amountPaid,
    //         state.datePaid
    //       )
    //     ),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    dispatch({ type: CLEAR_DATA });
  };

  const handleChange = (event, type) => {
    if (
      type === CHANGE_QUANTITY ||
      type === CHANGE_CPU ||
      type === CHANGE_TOTAL
    ) {
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
    dispatch({ type: CHANGE_EXPENSE, payload: object.expenseType });
    dispatch({ type: CHANGE_NAME, payload: object.name });
    dispatch({ type: CHANGE_QUANTITY, payload: object.quantity });
    dispatch({ type: CHANGE_CPU, payload: object.baseCost });
    dispatch({ type: CHANGE_TOTAL, payload: object.total });
    dispatch({ type: SET_MODAL_ON });
  }

  const setModal = () => {
    dispatch({ type: SET_MODAL_ON });
  };

  function handleExitModal(object) {
    dispatch({ type: SET_EXTT_MODAL_ON });
    dispatch({ type: SET_ID, payload: object });
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
      <p className="text-xl text-center font-bold">Expense Page</p>
      <div>
        <Button onClick={setModal}> Add </Button>

        <ExpenseModal
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
                <p className="font-bold text-l">Type of expense</p>
              </TableCell>
              <TableCell align="right">
                <p className="font-bold text-l">Name</p>
              </TableCell>
              <TableCell align="right">
                <p className="font-bold text-l">Quantity</p>
              </TableCell>
              <TableCell align="right">
                <p className="font-bold text-l">Cost per unit</p>
              </TableCell>
              <TableCell align="right">
                <p className="font-bold text-l">Expense</p>
              </TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rows.map((row) => (
              <TableRow
                key={`key-${row.id}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.expenseType && row.expenseType}
                </TableCell>
                <TableCell align="right">{row.name && row.name}</TableCell>
                <TableCell align="right">
                  {row.quantity && row.quantity}
                </TableCell>
                <TableCell align="right"> {row.baseCost} </TableCell>
                <TableCell align="right"> {row.total && row.total} </TableCell>
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

export default ExpensePage;
