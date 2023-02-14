import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchAllCountries } from "../../redux/action";
import { InitialState } from "../../redux/store";

const SingleCountry = () => {
  const { name } = useParams() as any;

  const dispatch = useDispatch();
  const countries = useSelector(
    (state: InitialState) => state.countries.countriesData
  );

  const [currentCountry, setCurrentCountry] = useState(
    countries.filter((country) => country.name.common === name)[0]
  );

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  useEffect(() => {
    setCurrentCountry(
      countries.filter((country) => country.name.common === name)[0]
    );
  }, [countries, name]);

  return (
    <div className="country-page">
      {currentCountry && currentCountry.name && (
        <div className="country-page__details">
          <div className="country-page__details-left">
            <img src={currentCountry.flags.png} alt="flag" />
            <h2 className="country-card__name">{currentCountry.name.common}</h2>
          </div>
          <div className="country-page__details-right">
            <div className="country-page__details-right-list">
              <h2>
                <span>Population: </span>
                <span className="right">
                  {currentCountry.population.toLocaleString("en")}
                </span>
              </h2>
            </div>
            <div className="country-page__details-right-list">
              <h2>
                <span>Region: </span>
                <span className="right">{currentCountry.region}</span>
              </h2>
            </div>
            <div className="country-page__details-right-list">
              <h2>
                <span>Capital city: </span>
                <span className="right">{currentCountry.capital}</span>
              </h2>
            </div>
            <div className="country-page__details-right-list">
              <h2>
                <span>Languages: </span>
                <span className="right">
                  {currentCountry.languages &&
                  Object.keys(currentCountry.languages).length > 0 ? (
                    Object.values(currentCountry.languages).map((value) => (
                      <span key={value}> {value},</span>
                    ))
                  ) : (
                    <h2> LOADING </h2>
                  )}
                </span>
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCountry;
