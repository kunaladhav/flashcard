import { NavLink } from "react-router-dom";

const FlashcardTabs = () => {
  return (
    <div className="flex gap-6 border-b border-gray-300 mb-6 text-sm font-medium">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `pb-2 transition-all cursor-pointer ${
            isActive
              ? "text-red-600 border-b-2 border-red-600 font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`
        }
      >
        Create New
      </NavLink>

      <NavLink
        to="/my-flashcards"
        className={({ isActive }) =>
          `pb-2 transition-all cursor-pointer ${
            isActive
              ? "text-red-600 border-b-2 border-red-600 font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`
        }
      >
        My Flashcard
      </NavLink>
    </div>
  );
};

export default FlashcardTabs;
