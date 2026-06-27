import { useEffect } from "react";
import FlashcardTabs from "../components/FlashcardTabs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyFlashCards = () => {
  const flashCards = useSelector((state) => state.flashcards.flashcards);

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashCards));
  }, [flashCards]);

  return (
    <main className="container mx-auto max-w-6xl px-4 mt-8 md:px-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">My Flashcards</h2>

      {/* 2. Reusable Sub-Navbar remains in place */}
      <FlashcardTabs />

      {/* 3. Flashcards Grid Content Area instead of Forms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {/* Render your saved cards here */}
        {flashCards.map((flashcard) => (
          <div
            key={flashcard.id}
            className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mt-5"
          >
            <div className="flex justify-center -mt-12 mb-4">
              {flashcard.groupImage ? (
                <img
                  src={flashcard.groupImage}
                  alt={flashcard.groupName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200"></div>
              )}
            </div>

            <h3 className="font-semibold text-center">{flashcard.groupName}</h3>

            <p className="text-sm text-gray-500 text-center mt-2 line-clamp-2">
              {flashcard.description}
            </p>
            <p className="text-center text-gray-600 mt-3">
              {flashcard.cards.length} Cards
            </p>
            <Link to={`/flashcards/${flashcard.id}`}>
              <button className="w-full mt-4 border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-100">
                View Cards
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyFlashCards;
