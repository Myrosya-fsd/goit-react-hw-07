import { useSelector, useDispatch } from "react-redux";
import Contact from "../Contact/Contact";
import { deleteContact } from "../../redux/contactsOps";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import styles from "./ContactList.module.css";
import { selectError, selectLoading } from "../../redux/contactsSlice";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <ul className={styles.list}>
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} onDelete={handleDelete} />
        ))}
      </ul>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Server is dead...</h2>}
    </>
  );
};

export default ContactList;
