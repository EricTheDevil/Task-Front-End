import React from "react";
import { TableCell, TableRow } from "@mui/material";
import CountryTableHead from "@mui/material/TableHead";

const columns = [
  "flag",
  "name",
  "regions",
  "languages",
  "population",
  "capital",
  "favorites",
];
function TableHead() {
  return (
    <CountryTableHead>
      <TableRow>
        {columns.map((columnName) => (
          <TableCell key={columnName}>{columnName}</TableCell>
        ))}
      </TableRow>
    </CountryTableHead>
  );
}

export default TableHead;
