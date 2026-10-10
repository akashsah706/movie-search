import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_OMDB_KEY;

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovie() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`,
      );
      const data = await res.json();
      setMovie(data);
      console.log(data);
    }
    getMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <h2>{movie.Title}</h2>
      <img alt={movie.Title} src={movie.Poster} />
      <p>
        <strong>Genre:</strong> {movie.Genre}
      </p>
      <p>
        <strong>Released:</strong>
        {movie.Released}
      </p>
      <p>
        <strong>Plot:</strong> {movie.Plot}
      </p>
    </div>
  );
}

export default MovieDetail;
