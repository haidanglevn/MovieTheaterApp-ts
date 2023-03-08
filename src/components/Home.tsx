import axios, { AxiosResponse, AxiosError } from "axios";
import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

interface Movie {
  title: string;
  release_date: string;
  id: number;
  overview: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string;
}
type MoviesData = Movie[];

const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayID, setOverlayID] = useState<number>();
  const [moviesData, setMoviesData] = useState<MoviesData>([]);

  const handleMouseEnter = (id: number) => {
    setShowOverlay(true);
    setOverlayID(id);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=beca0ddb56a192917d51c9b0f0d98844&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2022&with_watch_monetization_types=flatrate`
      )
      .then((res) => {
        setMoviesData(res.data.results);
      });
  }, []);

  const posterStyle = {
    width: "200px",
    height: "100%",
    borderRadius: "10px",
  };

  const overlayStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  const renderOverlay = (movie: Movie) => {
    if (showOverlay && movie.id === overlayID) {
      return (
        <div
          className="overlay"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <p>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </p>
          <Link to={`${movie.id}`}>
            <button>More info</button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="Home">
      <h1>Now in the cinema</h1>

      <div className="movie-wrapper">
        {moviesData.map((movie) => {
          return (
            <div
              className="movieCard"
              key={movie.id}
              onMouseEnter={() => handleMouseEnter(movie.id)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="poster"
                style={posterStyle}
              />
              <span>★ {movie.vote_average}</span>
              {renderOverlay(movie)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
