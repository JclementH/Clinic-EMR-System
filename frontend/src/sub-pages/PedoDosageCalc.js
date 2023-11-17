import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import { useState } from "react";
import {
  FIFTEEN,
  FIFTY,
  FIVEZEROZERO,
  ONETWOFIVE,
  TWENTY,
  TWOFIFTY,
} from "../components/Constant";
import { round } from "lodash";

const StyledTable = styled(Table)({
  border: 'none',
});

const StyledTableCell = styled(TableCell)({
  border: 'none',
});

function DosageCalculator() {
  const [dosage, setDosage] = useState(FIFTEEN);
  const [stockStrength, setStockStrength] = useState(ONETWOFIVE);
  const [amox, setAmox] = useState(null);
  const [clinda, setClinda] = useState(null);
  const [paracetamol, setParacetamol] = useState(null);

  const handleAmoxChange = (event) => {
    setAmox(event.target.value.replace(/[^0-9]/g, ""));
  };
  const handleClindaChange = (event) => {
    setClinda(event.target.value.replace(/[^0-9]/g, ""));
  };
  const handleParaChange = (event) => {
    setParacetamol(event.target.value.replace(/[^0-9]/g, ""));
  };
  const handleDosageChange = (event) => {
    setDosage(event.target.value);
    switch (event.target.value) {
      case FIFTEEN:
        setStockStrength(ONETWOFIVE);
        return;
      case TWENTY:
        setStockStrength(TWOFIFTY);
        return;
      case FIFTY:
        setStockStrength(FIVEZEROZERO);
        return;

      default:
        throw new Error(
          "unexpected action type" +
            event.target.value +
            " at PedoDosageCalculator"
        );
    }
  };


  return (
    <div>
      <Select
        id="dropdown-dosage"
        value={dosage}
        label="Change"
        onChange={handleDosageChange}
      >
        <MenuItem value={FIFTEEN}>15 mg/kg</MenuItem>
        <MenuItem value={TWENTY}>20 mg/kg</MenuItem>
        <MenuItem value={FIFTY}>50 mg/kg</MenuItem>
      </Select>
      <div className="text-center text-xl mb-5">
        Pediatric Dosage Calculator
      </div>
      <TableContainer component={Paper}>
        <StyledTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell >Children from 0 - 12 years old</StyledTableCell>
              <StyledTableCell >Amox</StyledTableCell>
              <StyledTableCell >Clinda</StyledTableCell>
              <StyledTableCell >Paracetamol</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell> </StyledTableCell>
              <StyledTableCell align="left">{dosage} mg/kg</StyledTableCell>
              <StyledTableCell align="left">{dosage} mg/kg</StyledTableCell>
              <StyledTableCell align="left">{dosage} mg/kg</StyledTableCell>
            </TableRow>
            <TableRow>
              {/* empty cell */}
              <StyledTableCell > </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell> Child Weight (kg)</StyledTableCell>
              <StyledTableCell>
                <input
                  class="border-b border-black focus:outline-none"
                  value={amox == null ? " " : amox}
                  onChange={handleAmoxChange}
                />
              </StyledTableCell>
              <StyledTableCell>
                <input
                  class="border-b border-black focus:outline-none"
                  value={clinda == null ? " " : clinda}
                  onChange={handleClindaChange}
                />
              </StyledTableCell>
              <StyledTableCell>
                <input
                  class="border-b border-black focus:outline-none"
                  value={paracetamol == null ? " " : paracetamol}
                  onChange={handleParaChange}
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell> Strength Required (mg)</StyledTableCell>
              <StyledTableCell> {amox * dosage}</StyledTableCell>
              <StyledTableCell> {clinda * dosage} </StyledTableCell>
              <StyledTableCell> {paracetamol * dosage} </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell> Stock Strength </StyledTableCell>
              <StyledTableCell> {stockStrength} mg / 5 ml</StyledTableCell>
              <StyledTableCell> {stockStrength} mg / 5 ml </StyledTableCell>
              <StyledTableCell> {stockStrength} mg / 5 ml </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell> ml (ml/day)</StyledTableCell>
              <StyledTableCell> {(dosage / (stockStrength / 5)) * (amox == null ? 0 : amox)} </StyledTableCell>
              <StyledTableCell> {(dosage / (stockStrength / 5)) * (clinda == null ? 0 : clinda)}</StyledTableCell>
              <StyledTableCell>  {(dosage / (stockStrength / 5)) * (paracetamol == null ? 0 : paracetamol)}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell> TID (ml/dose)</StyledTableCell>
              <StyledTableCell> {round(((dosage / (stockStrength / 5)) * (amox == null ? 0 : amox)) / 3, 2)} </StyledTableCell>
              <StyledTableCell> {round(((dosage / (stockStrength / 5)) * (clinda == null ? 0 : clinda)) / 3, 2)} </StyledTableCell>
              <StyledTableCell> {round(((dosage / (stockStrength / 5)) * (paracetamol == null ? 0 : paracetamol)) / 3, 2)} </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell> QID (ml/dos)</StyledTableCell>
              <StyledTableCell> {round(((dosage / (stockStrength / 5)) * (amox == null ? 0 : amox)) / 4, 2)} </StyledTableCell>
              <StyledTableCell> {round(((dosage / (stockStrength / 5)) * (clinda == null ? 0 : clinda)) / 4, 2)} </StyledTableCell>
              <StyledTableCell> {round(((dosage / (stockStrength / 5)) * (paracetamol == null ? 0 : paracetamol)) / 4, 2)} </StyledTableCell>
            </TableRow>
          </TableBody>
        </StyledTable>
      </TableContainer>
    </div>
  );
}

export default DosageCalculator;
