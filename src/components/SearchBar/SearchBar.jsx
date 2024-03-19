import "./SearchBar.css";
import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";

export default function SearchBar(props) {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSearch(value);

    setValue("");
  };

  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  useEffect(() => {
    if (search === "") {
      return;
    }

    // call openweathermap api to get the location
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Location not found");

        return response.json();
      })
      .then((data) => {
        props.addLocation({
          id: crypto.randomUUID(),
          lat: data[0].lat,
          lon: data[0].lon,
          name: data[0].name,
          country: data[0].country,
        });

        setTimeout(() => {
          setSearch("");
        }, 2000);
      })
      .catch((error) => {
        props.error();
        console.error(error);
      });

    return () => {};
  }, [search]);

  useEffect(() => {
    if (value === "") {
      return;
    }

    console.log(value);
  }, [value]);

  return (
    <div className="search-bar">
      <form action="" className="form container" onSubmit={handleSubmit}>
        <label htmlFor="search">City, Province, Country</label>
        <input
          type="text"
          placeholder="Enter A Location"
          name="search"
          value={value}
          onChange={handleChange}
        />
        <input type="submit" value="Location" className="submit btn" />
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  addLocation: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired,
};
