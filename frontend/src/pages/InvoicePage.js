import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { IoPrintOutline, IoMailOutline } from "react-icons/io5";

function InvoicePage() {
  const [mergedData, setMergedData] = useState([{name: "Patient One", billed: "700", paid: "0"}]);

  return (
    <div className="mt-20 ml-5 ">
      <div className="w-[95%]">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="bg-blue-400">
                <TableCell>
                  <p className="font-bold text-xl">Patient Name</p>
                </TableCell>
                <TableCell>
                  <p className="font-bold text-xl">Billed </p>
                </TableCell>
                <TableCell>
                  <p className="font-bold text-xl"> Paid</p>
                </TableCell>
                <TableCell>
                  <p className="font-bold text-xl"> Balance</p>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {mergedData.map((row) => (
                <TableRow
                  key={row.id}
                  className={""}
                >
                  <TableCell> {row.name} </TableCell>
                  <TableCell> ${row.billed} </TableCell>
                  <TableCell> ${row.paid} </TableCell>
                  <TableCell> ${row.billed - row.paid} </TableCell>
                  <TableCell> <div className="text-2xl flex"><IoPrintOutline className="hover:text-blue-500 mr-1" /> <IoMailOutline className="hover:text-blue-500" /></div> </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default InvoicePage;
