import classNames from "classnames";
import { Button } from "@mui/material";

function Header({ path }) {
  const headerStyle = classNames("font-bold text-5xl mt-5 mr-5 mb-5");
  const parentHeaderStyle = classNames("flex items-center justify-between w-[120%]")

  switch (path) {
    case "/":
      return (
        <div className={parentHeaderStyle}>
          <p className={headerStyle}> Home </p>
          <Button> Login </Button>
        </div>
      );

    case "/Document":
      return (
        <div className={parentHeaderStyle}>
          <p className={headerStyle}> Document </p>
          <Button> Login </Button>
        </div>
      );

    case "/Billing":
      return (
        <div className={parentHeaderStyle}>
          <p className={headerStyle}> Billing </p>
          <Button> Login </Button>
        </div>
      );

    case "/Records":
      return (
        <div className={parentHeaderStyle}>
          <p className={headerStyle}> Records </p>
          <Button> Login </Button>
        </div>
      );

    case "/Expense":
      return (
        <div className={parentHeaderStyle}>
          <p className={headerStyle}> Expense </p>
          <Button> Login </Button>
        </div>
      );

    default:
      throw new Error("unexpected action type " + path + " At Header");
  }
}

export default Header;
