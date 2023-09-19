import HomePage from "./pages/HomePage";
import RecordsPage from "./pages/RecordsPage";
import BillingPage from "./pages/BillingPage";
import DocumentPage from "./pages/DocumentPage";
import ExpensePage from "./pages/ExpensePage";
import Sidebar from "./components/Sidebar";
import Route from "./components/Route";
import { pagePath } from "./components/Route";
import Header from "./components/Header";
import { useState } from "react";
import className from "classnames";

function App() {
  const [sidebarState, setSidebarState] = useState(false);

  const handleClick = () => {
    setSidebarState(!sidebarState);
  };

  return (
    <div className="flex">
        <Sidebar onClick={handleClick} sidebarState={sidebarState} />

        <div className="ml-5 w-[70%]">
          <Route path="/">
            <Header path="/" />
            <HomePage />
          </Route>

          <Route path="/Document">
            <Header path="/Document" />
            <DocumentPage />
          </Route>

          <Route path="/Billing">
            <Header path="/Billing" />
            <BillingPage />
          </Route>

          <Route path="/Records">
            <Header path="/Records" />
            <RecordsPage />
          </Route>

          <Route path="/Expense">
            <Header path="/Expense" />
            <ExpensePage />
          </Route>
        </div>
      </div>
  );
}

export default App;
