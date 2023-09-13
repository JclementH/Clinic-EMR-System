import HomePage from "./pages/HomePage";
import RecordsPage from "./pages/RecordsPage";
import BillingPage from "./pages/BillingPage";
import DocumentPage from "./pages/DocumentPage";
import Sidebar from "./components/Sidebar";
import Route from "./components/Route";
import { pagePath } from "./components/Route";
import Header from "./components/Header";
import { useState } from "react";
import className from "classnames";

function App() {
  const [sidebarState, setSidebarState] = useState(false);
  const sidebarName = className(
    "container grid gap-x-4",
    sidebarState ? "grid-cols-6" : "grid-cols-6"
  );

  const handleClick = () => {
    setSidebarState(!sidebarState);
  };

  return (
    <div className="flex">
        <Sidebar onClick={handleClick} sidebarState={sidebarState} />

        <div className="ml-5">
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
        </div>
      </div>
  );
}

export default App;
