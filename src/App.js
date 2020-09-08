import React, { useState } from "react";
import "./App.css";

import Autcomplete from "./Autcomplete";

function App() {
  const [place, setPlace] = useState(null);
  const handleSelect = (place) => {
    setPlace({ place });
  };
  return (
    <div className="App">
      <h1>Test</h1>
      <Autcomplete onSelect={handleSelect} />
      {!place && <div>No place selected</div>}
      {place && (
        <div>
          Info about the place: <pre>{JSON.stringify(place, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
