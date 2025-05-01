import { createSlice, isAnyOf } from "@reduxjs/toolkit";
//import { nanoid } from "nanoid";
import {
  addContactThunk,
  deleteContactThunk,
  fetchDataThunk,
  editContact,
} from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setFavorites: () => {}, // залишено як заглушку
  },

  extraReducers: (builder) => {
    builder

      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addMatcher(
        isAnyOf(
          editContact.rejected,
          addContactThunk.rejected,
          deleteContactThunk.rejected,
          fetchDataThunk.rejected
        ),
        (state, action) => {
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          editContact.pending,
          addContactThunk.pending,
          deleteContactThunk.pending,
          fetchDataThunk.pending
        ),
        (state) => {
          state.error = null;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          editContact.fulfilled,
          addContactThunk.fulfilled,
          deleteContactThunk.fulfilled,
          fetchDataThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

// Селектори:
export const selectLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;
export const selectContacts = (state) => state.contacts.items;

export default contactsSlice.reducer; // Експорти:
