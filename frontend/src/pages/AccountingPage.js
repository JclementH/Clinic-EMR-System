import Box from "@mui/material/Box";
import {
  EXPENSE_SELECT,
  BILLS_SELECT,
} from "../components/Constant";
import ExpensePage from "../sub-pages/ExpensePage";
import BillsPage from "../sub-pages/BillsPage";

function AccountingPage({goto}) {

  return (
    <div className="mt-20 ">
      
      <Box className={"bg-white p-10 border-none shadow-lg w-[95%] sticky"}>
        {goto === EXPENSE_SELECT ? <ExpensePage /> : ""}
        {goto === BILLS_SELECT ? <BillsPage /> : ""}
      </Box>
    </div>
  );
}

export default AccountingPage;
