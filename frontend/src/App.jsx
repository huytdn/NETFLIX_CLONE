import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import AIRecommendations from "./pages/AIRecommendations";
import ActorSearchPage from "./pages/ActorSearchPage";
import SearchmoviesPage from "./pages/SearchmoviesPage";
import UpcomingPage from "./pages/UpcomingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import WatchlistPage from "./pages/WatchlistPage";
import ActorPage from "./pages/ActorPage";

const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p className="text-white ">Loading...</p>;
  }
  return (
    <>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/actor" element={<ActorSearchPage />} />
        <Route path="/searchmovies" element={<SearchmoviesPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/actors/:id" element={<ActorPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ai-recommendations" element={<AIRecommendations />} />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchlistPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
