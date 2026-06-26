import { createSlice } from "@reduxjs/toolkit";

const storedFlashcards = localStorage.getItem("flashcards");

const initialState = {
  flashcards: storedFlashcards ? JSON.parse(storedFlashcards) : [],
};

const flashcardSlice = createSlice({
  name: "flashcards",
  initialState,

  reducers: {
    addFlashcard: (state, action) => {
      state.flashcards.push(action.payload);
    },
  },
});

export const { addFlashcard } = flashcardSlice.actions;

export default flashcardSlice.reducer;
