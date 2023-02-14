/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material/index";
import { useDispatch, useSelector } from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import _ from "lodash";

import CountryTableHead from "./TableHead";
import CountryTableBody from "./TableBody";
import TablePaginationActions from "./TablePagination";
import Search from "../search/search";

import { InitialState } from "../../redux/store";
import { fetchAllCountries } from "../../redux/action";

function CountryTable() {
  const dispatch = useDispatch();
  const countries = useSelector(
    (state: InitialState) => state.countries.countriesData
  );
  const searchKeyword = useSelector(
    (state: InitialState) => state.countries.searchWord
  );
  const isLoading = useSelector(
    (state: InitialState) => state.countries.isLoading
  );
  const isError = useSelector((state: InitialState) => state.countries.error);

  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [paginatedCountries, setPaginatedCountries] = useState(countries);

  //Fetch
  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  //update search
  useEffect(() => {
    const _tempCountries: [] = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchKeyword.toLowerCase())
    ) as [];

    setFilteredCountries(_tempCountries);
  }, [searchKeyword, countries]);

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // update pages according to pagination
  useEffect(() => {
    const paginedC = filteredCountries.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ) as [];
    setPaginatedCountries(paginedC);
  }, [page, rowsPerPage, filteredCountries]);

  // sorting
  const [sortBy, setSortBy] = React.useState("name");
  useEffect(() => {
    const tempSorted = _.orderBy(filteredCountries, [sortBy], ["asc"]) as [];
    const paginedC = tempSorted.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ) as [];
    setPaginatedCountries(paginedC);
  }, [sortBy, filteredCountries, page, rowsPerPage]);

  //handle sort
  const handleSort = (event: any) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="table__container">
      <div>
        <Search />
        {isError && <h2> ERROR</h2>}
        {isLoading && <h2>Loading...</h2>}
        {!isLoading && paginatedCountries ? (
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={filteredCountries.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    labelId="sort-country-select-label"
                    onChange={handleSort}
                    defaultValue="population"
                  >
                    <MenuItem value="name.common">Name</MenuItem>
                    <MenuItem value="region">Region</MenuItem>
                    <MenuItem value="population">Population</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            </Table>
            <Table aria-label="simple table">
              <CountryTableHead />
              <CountryTableBody countries={paginatedCountries} />
            </Table>
          </TableContainer>
        ) : (
          <h1>LOADING </h1>
        )}
      </div>
    </div>
  );
}
export default CountryTable;
