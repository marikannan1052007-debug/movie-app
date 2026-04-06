import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "./moviedetail.css";


function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMovie = async () => {
      const apiKey = "80d7380ba1de7274a7f6bf6b1c92ead6";

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );

      const data = await res.json();
      console.log("Movie Details:", data);

      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;
  
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  

  return (
     <div className="details">
    <div>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back 
      </button>

      <img
          src={
            movie.poster_path
              ? imageUrl + movie.poster_path
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
        />
    </div>

    <div className="details-info">
      <h1>{movie.title}</h1>

       <p><b>Release:</b> {movie.release_date}</p>
        <p><b>Rating:</b> ⭐ {movie.vote_average}</p>
        <p>
          <b>Genres:</b>{" "}
          {movie.genres?.map((g) => g.name).join(", ")}
        </p>
        <p><b>Overview:</b> {movie.overview}</p>
    </div>
  </div>
  );
}

export default MovieDetails;