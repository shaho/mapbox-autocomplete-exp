import React, { useState, useEffect } from "react";
import axios from "axios";

import useDebounce from "./use-debounce";

import "./Autcomplete.css";

const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY3J5cHRvc2hhaG8iLCJhIjoiY2tlczc0Z3NhMGV3aDJ3bDR3dDQ4NzBpNiJ9.vQU9BmvhA4UkLP9sTfKlvg";

export default function Autcomplete({ onSelect }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      performeSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  const performeSearch = async (searchTerm) => {
    if (searchTerm === "") {
      setResults([]);
      setLoading(false);
      return;
    }

    const url = `${BASE_URL}/${searchTerm}.json?access_token=${MAPBOX_TOKEN}`;
    const response = await axios.get(url);
    setResults(response.data.features);
    setLoading(false);
  };

  const handleItemClicked = (place) => {
    setSearch(place.place_name);
    // setResults([]);
    onSelect(place);
  };

  return (
    <div className="AutocompletePlace">
      <input
        name="search"
        className="AutocompletePlace-input"
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Type an address"
      />
      {results.length > 0 && (
        <ul
          className="AutocompletePlace-results"
          style={{ marginTop: "100px" }}
        >
          {results.map((place) => (
            <li
              key={place.id}
              className="AutocompletePlace-items"
              onClick={() => handleItemClicked(place)}
            >
              {place.place_name}
            </li>
          ))}
          {loading && <li>Loading...</li>}
        </ul>
      )}
    </div>
  );
}
