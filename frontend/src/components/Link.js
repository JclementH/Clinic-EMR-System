import classNames from "classnames";
import useNavigation from "../hooks/use-navigation";
import { Button, Popover, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});
theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    GRAY: theme.palette.augmentColor({
      color: {
        main: "#6B7280",
      },
      name: "GRAY",
    }),
    BLUE: theme.palette.augmentColor({
      color: {
        main: "#3B82F6",
      },
      name: "BLUE",
    }),
  },
});

function Link({ to, children, className, activeClassName }) {
  const { navigate, currentPath } = useNavigation();
  const [anchorEl, setAnchorEl] = useState(null);

  

  const classes = classNames(
    "rounded-lg p-3 ml-5 hover:text-blue-500 hover:font-bold",
    currentPath === to && activeClassName,
    className
  );

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();
    if(to === "/clinic/document" || to === "/clinic/accounting"){
      setAnchorEl(event.currentTarget);
      return;
    }
    
    navigate(to);
  };

  const handleELClose = () => {
    setAnchorEl(null);
  };

  function handleNavigation(link) {
    navigate(link);
    setAnchorEl(null);
  }

  return (
    <div className="flex items-center justify-center">
      <ThemeProvider theme={theme}>
        <Button
          color={currentPath === to ? "BLUE" : "GRAY"}
          className={classes}
          href={to}
          onClick={handleClick}
        >
          {children}
        </Button>
      </ThemeProvider>
      <Popover
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleELClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
          {to === "/clinic/document" && (
            <div className="w-[200px] grid grid-rows-5">
            <>
              <Button onClick={() => handleNavigation("/clinic/document/certificate")}>Certificate</Button>
              <Button onClick={() => handleNavigation("/clinic/document/workauthorization")}>Work Authorization</Button>
              <Button onClick={() => handleNavigation("/clinic/document/pediatricdosagecalculator")}>Pediatric Dosage Calculator</Button>
              <Button onClick={() => handleNavigation("/clinic/document/rx")}>RX</Button>
              <Button onClick={() => handleNavigation("/clinic/document/consent")}>Consent</Button>
            </>
            </div>
          )}{to === "/clinic/accounting" && (
            <div className="w-[200px] grid grid-rows-2">
            <>
              <Button onClick={() => handleNavigation("/clinic/accounting/billsselect")}>Bills</Button>
              <Button onClick={() => handleNavigation("/clinic/accounting/expenseselect")}>Expense</Button>
            </>
            </div>
          )}
       
      </Popover>
    </div>
  );
}

export default Link;
