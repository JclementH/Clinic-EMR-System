import HomePage from "./pages/HomePage";
import RecordsPage from "./pages/RecordsPage";
import InvoicePage from "./pages/InvoicePage";
import DocumentPage from "./pages/DocumentPage";
import AccountingPage from "./pages/AccountingPage";
import Sidebar from "./components/Sidebar";
import Route from "./components/Route";
import Header from "./components/Header";
import {useReducer} from "react";
import { produce } from "immer";
import {
  BILLS_SELECT,
  CERTFICATE_SELECT,
  CHANGE_PATIENT,
  CONSENT_SELECT,
  DOSAGE_SELECT,
  EXPENSE_SELECT,
  RTX_SELECT,
  SWAP_ACC,
  SWAP_DOC,
  SWAP_HOME,
  SWAP_INV,
  SWAP_NULL,
  SWAP_REC,
  WORK_SELECT,
  isMobile,
} from "./components/Constant";
import PatientRecord from "./sub-pages/PatientRecord";
import MobileFooter from "./components/MobileFooter";
import MobileHome from "./pages/MobilePage/MobileHome";
import MobileCalendarPage from "./pages/MobilePage/MobileCalendarPage";
import MobileHistoryPage from "./pages/MobilePage/MobileHistoryPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

const reducer = (state, action) => {
  switch (action.type) {
    case SWAP_HOME:
      state.currentTab = "Home";
      break;
    case SWAP_DOC:
      state.currentTab = "Document";
      break;
    case SWAP_INV:
      state.currentTab = "Invoice";
      break;
    case SWAP_REC:
      state.currentTab = "Records";
      break;
    case SWAP_ACC:
      state.currentTab = "Accounting";
      break;
    case SWAP_NULL:
      state.currentTab = "Null";
      break;
    case CHANGE_PATIENT:
      state.patientName = action.payload;
      break;
    default:
      throw new Error("unexpected action type" + action.type + " At App");
  }
};

function App() {
  const [state, dispatch] = useReducer(produce(reducer), {
    currentTab: "",
    patientName: "",
    isLoggedIn: true,
  });

  return (
    <div>
      {isMobile ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Route path="/patient">
            <MobileHome />
          </Route>
          <Route path="/patient/calendar">
            <MobileCalendarPage />
          </Route>
          <Route path="/patient/history">
            <MobileHistoryPage />
          </Route>
          <MobileFooter />
        </div>
      ) : (
        <div className="flex">
            <Route path="/">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Sidebar dispatch={dispatch} />
            <div className="w-full h-full fixed">
              <Header tab={state} dispatch={dispatch} />
              <div className="ml-[200px]">
                <Route path="/clinic">
                  <HomePage />
                </Route>
                <Route path="/clinic/document/certificate">
                  <DocumentPage goto={CERTFICATE_SELECT} />
                </Route>
                <Route path="/clinic/document/workauthorization">
                  <DocumentPage goto={WORK_SELECT} />
                </Route>
                <Route path="/clinic/document/pediatricdosagecalculator">
                  <DocumentPage goto={DOSAGE_SELECT} />
                </Route>
                <Route path="/clinic/document/rx">
                  <DocumentPage goto={RTX_SELECT} />
                </Route>
                <Route path="/clinic/document/consent">
                  <DocumentPage goto={CONSENT_SELECT} />
                </Route>
                <Route path="/clinic/invoice">
                  <InvoicePage />
                </Route>
                <Route path="/clinic/records">
                  <RecordsPage dispatch={dispatch} />
                </Route>
                <Route path={`/clinic/records/${state.patientName}_Profile`}>
                  <PatientRecord patientData={state.patientName} />
                </Route>
                <Route path="/clinic/accounting/expenseselect">
                  <AccountingPage goto={EXPENSE_SELECT} />
                </Route>
                <Route path="/clinic/accounting/billsselect">
                  <AccountingPage goto={BILLS_SELECT} />
                </Route>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
