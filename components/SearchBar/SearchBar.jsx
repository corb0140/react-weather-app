import "./SearchBar.css";
import { useState, useEffect, useRef } from "react";

export default function SearchBar(props) {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSearch(inputRef.current.value);

    ev.target.reset();
  };

  const handleChange = () => {
    setValue(inputRef.current.value);
  };

  useEffect(() => {
    if (search === "") {
      return;
    }

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Location not found");

        return response.json();
      })
      .then((data) => {
        console.log(data);
        props.addLocation({
          id: crypto.randomUUID(),
          lat: data[0].lat,
          lon: data[0].lon,
          name: data[0].name,
          country: data[0].country,
        });
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  useEffect(() => {
    console.log("search", value);
  }, [value]);

  return (
    <div className="search-bar">
      <form action="" className="form container" onSubmit={handleSubmit}>
        <label htmlFor="search">City, Province, Country</label>
        <input
          type="text"
          placeholder="Enter A Location"
          name="search"
          ref={inputRef}
          onChange={handleChange}
        />
        <input type="submit" value="Location" className="submit btn" />
      </form>
    </div>
  );
}
