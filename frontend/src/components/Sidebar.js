import Link from "./Link";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { SlNotebook } from "react-icons/sl";
import { PiBooksLight } from "react-icons/pi";
import { AiOutlineHome, AiOutlineFile } from "react-icons/ai";
import { FaRegLightbulb } from "react-icons/fa6";
import className from "classnames";
import { useEffect, useState } from "react";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import {
  SWAP_ACC,
  SWAP_DOC,
  SWAP_HOME,
  SWAP_INV,
  SWAP_NULL,
  SWAP_REC,
} from "./Constant";
import { Button } from "@mui/material";
const ICON_SIZE = "mr-1 text-6xl";

function Sidebar({ dispatch }) {
  useEffect(() => {
    const path = window.location.pathname;
    switch (path) {
      case "/clinic":
        dispatch({ type: SWAP_HOME });
        break;
      case "/clinic/document/certificate":
        dispatch({ type: SWAP_DOC });
        break;
      case "/clinic/document/workauthorization":
        dispatch({ type: SWAP_DOC });
        break;
      case "/clinic/document/pediatricdosagecalculator":
        dispatch({ type: SWAP_DOC });
        break;
      case "/clinic/document/rx":
        dispatch({ type: SWAP_DOC });
        break;
      case "/clinic/document/consent":
        dispatch({ type: SWAP_DOC });
        break;
      case "/clinic/invoice":
        dispatch({ type: SWAP_INV });
        break;
      case "/clinic/records":
        dispatch({ type: SWAP_REC });
        break;
      case "/clinic/accounting/billsselect":
        dispatch({ type: SWAP_ACC });
        break;
      case "/clinic/accounting/expenseselect":
        dispatch({ type: SWAP_ACC });
        break;
      default:
    }
  }, []);

  const handleMenuChange = (path) => {
    switch (path) {
      case "/clinic":
        dispatch({ type: SWAP_HOME });
        break;
      case "/clinic/document/certificate":
        dispatch({ type: SWAP_DOC });
        break;
      case "/clinic/document/workauthorization":
        dispatch({ type: SWAP_DOC });
        break;
      case "/clinic/document/pediatricdosagecalculator":
        dispatch({ type: SWAP_DOC });
        break;
      case "/clinic/document/rx":
        dispatch({ type: SWAP_DOC });
        break;
      case "/clinic/document/consent":
        dispatch({ type: SWAP_DOC });
        break;
      case "/clinic/invoice":
        dispatch({ type: SWAP_INV });
        break;
      case "/clinic/records":
        dispatch({ type: SWAP_REC });
        break;
      case "/clinic/accounting/billsselect":
        dispatch({ type: SWAP_ACC });
        break;
      case "/clinic/accounting/expenseselect":
        dispatch({ type: SWAP_ACC });
        break;
      default:
    }
  };

  const links = [
    {
      label: "Home",
      path: "/clinic",
      icon: <AiOutlineHome className={ICON_SIZE} fontSize={30} />,
    },
    {
      label: "Document",
      path: "/clinic/document",
      icon: <SlNotebook className={ICON_SIZE} fontSize={30} />,
    },
    {
      label: "Invoice",
      path: "/clinic/invoice",
      icon: <LiaFileInvoiceDollarSolid className={ICON_SIZE} fontSize={30} />,
    },
    {
      label: "Records",
      path: "/clinic/records",
      icon: <PiBooksLight className={ICON_SIZE} fontSize={30} />,
    },
    {
      label: "Accounting",
      path: "/clinic/accounting",
      icon: <AiOutlineFile className={ICON_SIZE} fontSize={30} />,
    },
  ];

  const renderedLinks = links.map((link) => {
    return (
      <Link
        activeClassName="text-blue-500"
        className="mb-3 flex flex-col items-center text-xs"
        key={link.label}
        to={link.path}
      >
        {link.icon}
        {link.label}
      </Link>
    );
  });

  return (
    <div className="mr-5 h-full">
      <div className="ml-10"></div>
      <div
        className="bg-white pr-7 flex flex-col items-center text-2xl w-[150px] mt-[90px]"
        style={{ position: "absolute", zIndex: "1" }}
        onClick={() => handleMenuChange(window.location.pathname)}
      >
        <div className="mt-5">{renderedLinks}</div>
      </div>
      <div className="h-[90%] w-1 bg-gray-500 absolute ml-[150px] mt-[88px]" />
    </div>
  );
}

export default Sidebar;
