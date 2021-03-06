import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Autcomplete({ onSelect }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  let timer;
  useEffect(() => {
    setResults([]);
    // eslint-disable-next-line
    timer = setTimeout(() => {
      search && performeSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setLoading(true);
  }

  const performeSearch = async (searchTerm) => {
    if (results.length === 0) {
      const url = `${BASE_URL}/${searchTerm}.json?access_token=${MAPBOX_TOKEN}`;
      const response = await axios.get(url);
      setResults(response.data.features);
      setLoading(false);
    }
  };

  const handleItemClicked = (place) => {
    onSelect(place);
    setSearch(place.place_name);
    console.log(place.geometry.coordinates[0], place.geometry.coordinates[1]);
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
        <ul className="AutocompletePlace-results">
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
