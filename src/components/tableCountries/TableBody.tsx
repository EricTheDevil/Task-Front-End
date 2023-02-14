/* eslint-disable react/prop-types */
import React from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import CountryTableBody from "@mui/material/TableBody";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addFavorite } from "../../redux/action";
import { CountryType } from "../../types";

type TableBodyProps = {
  countries: CountryType[];
};

function TableBody({ countries }: TableBodyProps) {
  const dispatch = useDispatch();

  const addToFavorite = (countryName: string) => {
    dispatch(addFavorite(countryName));
  };

  return (
    <CountryTableBody>
      {countries.map((country) => {
        return (
          <TableRow key={country.name.common}>
            <TableCell>
              <img src={country.flags.png} alt="flag" />
            </TableCell>
            <TableCell>
              <Link to={`/country/${country.name.common}`}>
                {country.name.common}
              </Link>
            </TableCell>
            <TableCell>{country.region}</TableCell>
            <TableCell>
              {country.languages && Object.keys(country.languages).length > 0
                ? Object.values(country.languages).map((value) => (
                    <p key={value}>{value}</p>
                  ))
                : "N/A"}
            </TableCell>
            <TableCell>{country.population}</TableCell>
            <TableCell>
              {country.capital
                ? country.capital.map((capitalName) => (
                    <p key={capitalName}>{capitalName}</p>
                  ))
                : "N/A"}
            </TableCell>
            <TableCell>
              <Button onClick={() => addToFavorite(country.name.common)}>
                Like
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </CountryTableBody>
  );
}

export default TableBody;
