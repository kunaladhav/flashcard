# 📚 Flashcard Generator

A modern Flashcard Generator built with **React**, **Redux Toolkit**, **Formik**, and **Tailwind CSS** that allows users to create, manage, and review flashcard decks with support for multiple terms, images, validation, and persistent storage.

## ✨ Features

### 📖 Create Flashcard Decks

- Create a flashcard group with a title and description.
- Upload a custom image for the flashcard group.
- Add multiple terms and definitions within a single deck.
- Upload individual images for each flashcard.
- Dynamically add or remove flashcards before submission.

### 🎯 Form Validation

- Client-side validation using Formik.
- Required field validation for:
  - Group Name
  - Term
  - Definition

- Inline validation messages for a better user experience.

### 🗂️ Manage Flashcards

- View all created flashcard decks.
- Display total number of cards in each deck.
- Navigate to individual flashcard decks.
- Browse through flashcards using Previous and Next controls.

### 🖼️ Image Support

- Upload images for flashcard groups.
- Upload images for individual flashcards.
- Instant image preview before submission.
- Images are stored using Base64 encoding.

### 💾 Persistent Storage

- Flashcards are stored in Local Storage.
- Data persists across browser refreshes.
- Automatic hydration of Redux state from Local Storage.

### ⚡ User Experience

- Responsive layout.
- Toast notifications for successful actions.
- Dynamic navigation using React Router.
- Keyboard focus support while editing terms.
- Ability to remove unwanted terms before creating the deck.

---

# 🛠️ Tech Stack

- React
- React Router DOM
- Redux Toolkit
- React Redux
- Formik
- Tailwind CSS
- React Icons
- React Hot Toast
- Vite

---

# 📂 Project Structure

```text
src
│
├── assets/
│
├── components/
│   ├── FlashcardTabs.jsx
│   ├── Header.jsx
│
├── Pages/
│   ├── CreateFlashCard.jsx
│   ├── MyFlashCards.jsx
│   └── FlashcardDetails.jsx
│
├── utils/
│   ├── flashcardSlice.jsx
│   └── store.jsx
│
├── App.jsx
└── main.jsx
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/your-username/flashcard-generator.git
```

## Navigate into the project

```bash
cd flashcard-generator
```

## Install dependencies

```bash
npm install
```

## Start the development server

```bash
npm run dev
```

---

# 🧠 What I Learned

This project provided hands-on experience with:

- Dynamic forms using Formik's `FieldArray`
- Redux Toolkit for scalable state management
- Persisting application state using Local Storage
- Image uploads using the FileReader API
- React Router for nested routing
- Managing complex form state without unnecessary React state
- Building reusable React components
- Responsive UI development with Tailwind CSS

---

# 🔮 Future Improvements

- Print flashcard decks
- Export flashcards as PDF

---

# 📸 Screenshots

Add screenshots of:

- Create Flashcard Page
- My Flashcards Page
- Flashcard Details Page

---

# 📄 License

This project is licensed under the MIT License.
