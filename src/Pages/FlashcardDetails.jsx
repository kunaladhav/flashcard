import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FlashcardTabs from "../components/FlashcardTabs";
import ShareModal from "../components/ShareModal";

import { BsArrowLeftShort } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsShare } from "react-icons/bs";
import { BsPrinter } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";

const FlashcardDetails = () => {
  const { id } = useParams();

  const flashcard = useSelector((state) => state.flashcards.flashcards);
  const selectedDeck = flashcard.find((deck) => deck.id === id);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const currentCard = selectedDeck?.cards[currentCardIndex];
  const shareLink = `${window.location.origin}/flashcards/${id}`;

  console.log("Selected Deck: ", selectedDeck);

  if (!selectedDeck) {
    return <div className="p-8">Flashcard not found</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 my-8">
      <FlashcardTabs />
      <div className="text-black my-7 text-sm flex items-center">
        <Link to="/my-flashcards">
          <BsArrowLeftShort className="size-8" />
        </Link>
        <h1 className="px-4 text-2xl font-bold ">{selectedDeck.groupName}</h1>
      </div>

      <p className="text-gray-600 mt-2">{selectedDeck.description}</p>

      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* Left Sidebar */}
        <div className="col-span-3 bg-white rounded-lg shadow-sm p-4 self-start">
          <h3 className="text-sm text-gray-500 mb-4">Flashcards</h3>

          {selectedDeck.cards.map((card, index) => (
            <button
              key={index}
              onClick={() => setCurrentCardIndex(index)}
              className={`block w-full text-left py-2 px-2 rounded mb-2 ${
                currentCardIndex === index
                  ? "bg-red-100 text-red-600"
                  : " hover:bg-gray-200"
              }`}
            >
              {card.term}
            </button>
          ))}
        </div>

        {/** Center Card */}
        <div className="col-span-7 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">{currentCard.term}</h2>

          <div className="flex justify-around gap-5">
            {currentCard.image && (
              <img
                src={currentCard.image}
                alt={currentCard.term}
                className="w-64 h-44 object-cover rounded-lg mb-4"
              />
            )}

            <p className="text-gray-700 text-sm">{currentCard.definition}</p>
          </div>

          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={() =>
                setCurrentCardIndex((prev) => Math.max(prev - 1, 0))
              }
              disabled={currentCardIndex === 0}
              className="cursor-pointer"
            >
              <BsChevronLeft />
            </button>
            <span>
              {currentCardIndex + 1} / {selectedDeck.cards.length}
            </span>
            <button
              onClick={() =>
                setCurrentCardIndex((prev) =>
                  Math.min(prev + 1, selectedDeck.cards.length - 1),
                )
              }
              disabled={currentCardIndex === selectedDeck.cards.length - 1}
              className="cursor-pointer"
            >
              <BsChevronRight />
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-2 space-y-3">
          <button
            onClick={() => setIsShareOpen(true)}
            className="flex items-center w-full bg-white shadow-sm rounded-lg py-3 px-2 hover:bg-gray-200 cursor-pointer text-left"
          >
            <BsShare className="mr-2" />
            Share
          </button>
          <button className="flex items-center w-full bg-white shadow-sm rounded-lg py-3 px-2 hover:bg-gray-200 cursor-pointer text-left">
            <BsDownload className="mr-2" />
            Download
          </button>
          <button className="flex items-center w-full bg-white shadow-sm rounded-lg py-3 px-2 hover:bg-gray-200 cursor-pointer text-left">
            <BsPrinter className="mr-2" />
            Print
          </button>
        </div>
      </div>
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        link={shareLink}
      />
    </div>
  );
};

export default FlashcardDetails;
