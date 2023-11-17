import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CHANGE_PATIENT } from "../components/Constant";
import useNavigation from "../hooks/use-navigation";
import { Button } from "@mui/base";
import { useEffect, useState } from "react";

function RecordsPage({ dispatch }) {
  const { navigate } = useNavigation();
  const [mergedData, setMergedData] = useState([
    {
      namelast: "One",
      namefirst: "Patient",
      namemiddle: "Number",
      email: "patientnumberone@gmail.com",
      numbermobile: "09658249104",
    },
  ]);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      fetch("http://25.30.166.184:3500/web/patient/?type=information")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setMergedData(data))
        .catch((error) => {
          // setError(true);
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      // setError(true);
      console.error("Error at: ", error);
    }
  }, []);

  const handlePullChanges = async () => {
    const response = await fetch(
      "http://25.30.166.184:3500/web/patient/?type=information",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setMergedData(await response.json());
    console.log(mergedData);
  };

  function handleOnClick(row) {
    const fullName = row.namefirst + "_" + row.namemiddle + "_" + row.namelast;
    dispatch({ type: CHANGE_PATIENT, payload: fullName });
    navigate(window.location.pathname + `/${fullName}_Profile`);
  }

  return (
    <div className="mt-10 w-[95%]">
      {/* <Button onClick={handlePullChanges}> Test </Button> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-blue-400">
              <TableCell>
                <p className="font-bold text-xl">Last Name</p>
              </TableCell>
              <TableCell>
                <p className="font-bold text-xl">First Name</p>
              </TableCell>
              <TableCell>
                <p className="font-bold text-xl">Middle Name</p>
              </TableCell>
              <TableCell>
                <p className="font-bold text-xl">Email</p>
              </TableCell>
              <TableCell>
                <p className="font-bold text-xl">Contact Number </p>
              </TableCell>
            </TableRow>
          </TableHead>
          {error ? (
            <TableCell> There is no connection </TableCell>
          ) : (
            
            <TableBody>
              {mergedData.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleOnClick(row)}
                  className={"hover:bg-gray-200"}
                >
                  <TableCell> {row.namelast} </TableCell>
                  <TableCell> {row.namefirst} </TableCell>
                  <TableCell> {row.namemiddle} </TableCell>
                  <TableCell> {row.email} </TableCell>
                  <TableCell> {row.numbermobile} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

export default RecordsPage;
