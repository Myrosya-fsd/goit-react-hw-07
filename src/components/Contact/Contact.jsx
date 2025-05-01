import { useDispatch } from "react-redux";
import { deleteContactThunk } from "../../redux/operations";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import styles from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContactThunk(contact.id));
  };

  return (
    <div className={styles.box}>
      <li className={styles.item}>
        <div className={styles.info}>
          <p>
            <FaUser className={styles.icon} /> <span>{contact.name}</span>
          </p>
          <p>
            <FaPhoneAlt className={styles.icon} /> <span>{contact.number}</span>
          </p>
        </div>
        <button className={styles.button} onClick={handleDelete}>
          Delete
        </button>
      </li>
    </div>
  );
};

export default Contact;
