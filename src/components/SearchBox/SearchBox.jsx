import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <label htmlFor="search" className={styles.label}>
        Find contacts by name:
      </label>
      <input
        type="text"
        id="search"
        className={styles.input}
        name="query"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
