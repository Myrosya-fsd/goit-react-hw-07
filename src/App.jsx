import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import { useEffect } from "react";
import { fetchDataThunk } from "./redux/operations";
import styles from "./App.module.css";
import { selectContacts } from "./redux/contactsSlice";
import { addContactThunk, deleteContactThunk } from "./redux/operations";
import { selectNameFilter, changeFilter } from "./redux/filtersSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddContact = (name, number) => {
    dispatch(addContactThunk({ name, number }));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContactThunk(id));
  };

  const handleChangeFilter = (filter) => {
    dispatch(changeFilter(filter));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox searchTerm={filter} setSearchTerm={handleChangeFilter} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
};

export default App;
