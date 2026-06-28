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
      <div className="text-black my-7 flex items-center gap-2 flex-wrap">
        <Link to="/my-flashcards">
          <BsArrowLeftShort className="size-8" />
        </Link>
        <h1 className="px-4 text-2xl font-bold ">{selectedDeck.groupName}</h1>
      </div>

      <p className="text-gray-600 mt-2 leading-7">{selectedDeck.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-4 self-start">
          <h3 className="text-sm text-gray-500 mb-4">Flashcards</h3>

          <div className="flex lg:block gap-2 overflow-x-auto">
            {selectedDeck.cards.map((card, index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`shrink-0 lg:block lg:w-full text-left py-2 px-3 rounded ${
                  currentCardIndex === index
                    ? "bg-red-100 text-red-600"
                    : " hover:bg-gray-200"
                }`}
              >
                {card.term}
              </button>
            ))}
          </div>
        </div>

        {/** Center Card */}
        <div className="lg:col-span-7 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">{currentCard.term}</h2>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {currentCard.image && (
              <img
                src={currentCard.image}
                alt={currentCard.term}
                className="w-full md:w-64 h-52 object-cover rounded-lg"
              />
            )}

            <p className="text-gray-700 text-sm leading-7">
              {currentCard.definition}
            </p>
          </div>

          <div className="flex justify-center items-center gap-6 mt-8 flex-wrap">
            <button
              onClick={() =>
                setCurrentCardIndex((prev) => Math.max(prev - 1, 0))
              }
              disabled={currentCardIndex === 0}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
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
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
            >
              <BsChevronRight />
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-2 flex lg:flex-col gap-3">
          <button
            onClick={() => setIsShareOpen(true)}
            className=" flex justify-center lg:justify-start items-center bg-white shadow-sm rounded-lg py-3 px-3 hover:bg-gray-100 transition cursor-pointer"
          >
            <BsShare className="mr-2" />
            Share
          </button>
          <button className="flex justify-center lg:justify-start items-center bg-white shadow-sm rounded-lg py-3 px-3 hover:bg-gray-100 transition cursor-pointer">
            <BsDownload className="mr-2" />
            Download
          </button>
          <button className="flex justify-center lg:justify-start items-center bg-white shadow-sm rounded-lg py-3 px-3 hover:bg-gray-100 transition cursor-pointer">
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
