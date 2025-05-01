import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
import styles from "./ContactList.module.css";
import { selectError, selectLoading } from "../../redux/contactsSlice";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ul className={styles.list}>
        {filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </ul>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Server is dead...</h2>}
    </>
  );
};

export default ContactList;
