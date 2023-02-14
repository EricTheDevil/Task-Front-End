import React from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { removeFavorite } from "../../redux/action";
import { InitialState } from "../../redux/store";

function Favorites() {
  const dispatch = useDispatch();

  const removeFromFavorite = (countryName: string) => {
    dispatch(removeFavorite(countryName));
  };
  const favoriteCountries = useSelector(
    (state: InitialState) => state.favorites.favoriteCountries
  );
  const isError = useSelector((state: InitialState) => state.countries.error);

  return (
    <div className="favorite">
      <h1> Countries listed in the Favorites</h1>
      <table>
        {isError && <h2> ERROR </h2>}
        {favoriteCountries.map((country) => (
          <tbody key={country}>
            <tr>
              <td>{country}</td>
              <td>
                <Button onClick={() => removeFromFavorite(country)}>
                  REMOVE
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Favorites;
