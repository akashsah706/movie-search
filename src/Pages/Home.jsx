import { useState, useEffect, useRef } from "react";
import MovieList from "../Components/MovieList";
const API_KEY = import.meta.env.VITE_OMDB_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const fetchMovies = async (query) => {
    setLoading(true);
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
    );
    const data = await response.json();
    console.log(data);

    setMovies(data.Search || []);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies("Avengers");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();
    if (query) fetchMovies(query);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch}>
        <input
          ref={inputRef}
          className="searchInput"
          placeholder="Search for a movie..."
        />
        <button type="submit"> Search 🔎</button>
      </form>

      {loading ? <p>Loading... </p> : <MovieList movies={movies} />}
    </div>
  );
}

export default Home;
