import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsOps";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters"),
    number: Yup.string()
      .required("Phone number is required")
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact({ name: values.name, number: values.number }));
    resetForm();
  };

  return (
    <div className={styles.form}>
      <Formik
        initialValues={{ name: "", number: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label htmlFor="name" className={styles.label}>
            Name:
            <Field
              className={styles.input}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </label>

          <label htmlFor="number" className={styles.label}>
            Phone:
            <Field
              className={styles.input}
              type="text"
              name="number"
              id="number"
              placeholder="Number"
            />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.error}
            />
          </label>

          <button className={styles.button} type="submit">
            Add Contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
