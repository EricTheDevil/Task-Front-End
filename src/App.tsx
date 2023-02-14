import React from "react";
import { Routes, Route } from "react-router";

import "./App.css";
import Favorites from "./components/favorites";
import CountryPage from "./components/singleCountry";
import CountryTable from "./components/tableCountries";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="countries__container"></div>
      <Routes>
        <Route path="/" element={<CountryTable />} />
        <Route path="/country/:name" element={<CountryPage />} />
        <Route path="/country/favorite" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
