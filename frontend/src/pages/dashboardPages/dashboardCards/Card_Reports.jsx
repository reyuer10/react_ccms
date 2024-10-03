import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCanister } from "../../../features/canisterSlice";
import { editIcons } from "../../../assets/data/svg";

function createData(name, color, capacity, fuel, price) {
  return { name, color, capacity, fuel, price };
}

const rows = [
  createData("TATA HARRIER", "BLACK", 6, "DIESEL", "14 LACS"),
  createData("MAHINDRA THAR", "RED", 4, "DIESEL", "16 LACS"),
  createData("MARUTI SWIFT", "WHITE", 5, "PETROL", "9 LACS"),
  createData("MG HECTOR", "BLACK", 5, "PETROL", "18 LACS"),
  createData("MERCEDES GLS", "WHITE", 5, "DIESEL", "52 LACS"),
];

export default function Card_Reports() {
  const { canister } = useSelector((state) => state.canister);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCanister());
	console.log(canister)
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell align="center">Code</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date modified</TableCell>
            {/* <TableCell align="center">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {canister.map((row) => (
            <TableRow
              key={row.canister_ID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.canister_code}
              </TableCell>
              <TableCell align="center">{row.canister_desc}</TableCell>
              <TableCell align="center">{row.canister_num}</TableCell>
              <TableCell align="center">{new Date(row.canister_timestamp).toLocaleString()}</TableCell>
              {/* <TableCell align="center">{editIcons}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
