import React from "react"
import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const API_KEY = "4b613698";
function App() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState([]);
  const [debounceQuery, setDebounceQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    if (debounceQuery.trim() === "") {
      setMovie([]);
      return;
    }
    const fetchMovies = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${debounceQuery}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.Search) {
        setMovie(data.Search);
      } else {
        setMovie([]);
      }
    };
    fetchMovies();
  }, [debounceQuery]);
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Movie App with Debouncing</h1>
      
      <input
        type="text"
        value={query}
        placeholder="Search Your Movie here..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md p-3 mb-6 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {movie.length > 0 ? (
          movie.map((m) => (
            <div key={m.imdbID} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <img src={m.Poster} alt={m.Title} className="w-full h-60 object-cover rounded-md" />
              <p className="mt-3 font-bold text-lg">{m.Title}</p>
              <p className="text-gray-400">Year: {m.Year}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No Results Found...</p>
        )}
      </div>
    </div>
  );
}

export default App;
