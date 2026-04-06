import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {

   if (location.state) {
    setMovies(location.state.movies || []);
    setQuery(location.state.query || "");
   }
    

    const delay = setTimeout(() => {
      const fetchMovies = async () => {
        if (query.length < 2) {
          setMovies([]);
          return;
        }

        const apiKey = "80d7380ba1de7274a7f6bf6b1c92ead6";

        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        );

        const data = await res.json();
        if (data.results) {
          const filteredMovies = data.results.filter(
            (movie) => movie.poster_path !== null,
          );

          setMovies(filteredMovies);
          
          localStorage.setItem("movies", JSON.stringify(filteredMovies));
          localStorage.setItem("query", query);

        } else {
          setMovies([]);
        }
      };

      fetchMovies();
    }, 500);

    return () => clearTimeout(delay);
  }, [location.state,query]);


  useEffect(() => {
  const savedMovies = localStorage.getItem("movies");
  const savedQuery = localStorage.getItem("query");

  if (savedMovies && savedQuery) {
    setMovies(JSON.parse(savedMovies));
    setQuery(savedQuery);
  }
}, []);

  return (
    <div className="app">
      <h1>🎬 Movie Search App</h1>

      <input
        className="search-box"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />

      <div className="movies">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} className="movie-link" key={movie.id} state={{ movies, query }} >
            <div className="card">
              <img
                src={
                  movie.poster_path
                    ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
