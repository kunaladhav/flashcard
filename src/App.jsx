import CreateFlashCard from "./Pages/CreateFlashCard";
import MyFlashCards from "./Pages/MyFlashCards";
import FlashcardDetails from "./Pages/FlashcardDetails";
import Header from "./components/Header";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <CreateFlashCard />,
      },
      {
        path: "/my-flashcards",
        element: <MyFlashCards />,
      },
      {
        path: "/flashcards/:id",
        element: <FlashcardDetails />,
      },
    ],
  },
]);
