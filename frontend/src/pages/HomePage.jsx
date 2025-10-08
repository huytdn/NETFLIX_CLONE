import React from "react";
import Hero from "../components/Hero";
import CardList from "../components/CardList";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="p-5 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <Hero />
      <CardList title={"Now Playing"} category={"now_playing"} />
      <CardList title={"Top Rated"} category={"top_rated"} />
      <CardList title={"Popular"} category={"popular"} />
      <Footer />
    </div>
  );
};

export default HomePage;
