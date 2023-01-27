import { useState, useRef, useEffect } from "react";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SearchbarHeader,
  SearchbarForm,
  SearchbarInput,
  SearchbarBtn,
  LabelBtn,
} from "./Searchbar.styled";
import PropTypes from "prop-types";

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const prevQuery = usePrevious(query);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      return toast.error("empty field, enter the query");
    }

    if (prevQuery === query) {
      return;
    }

    onSubmit(query);
  };

  return (
    <SearchbarHeader className="searchbar">
      <SearchbarForm onSubmit={handleSubmit} className="form">
        <SearchbarBtn type="submit">
          <LabelBtn>Search</LabelBtn>
        </SearchbarBtn>

        <SearchbarInput
          onChange={handleChange}
          value={query}
          name="name"
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
        />
      </SearchbarForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
