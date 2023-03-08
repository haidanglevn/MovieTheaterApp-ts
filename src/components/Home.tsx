import axios, { AxiosResponse, AxiosError } from "axios";
import { useState, useEffect } from "react";
import "./Home.css"

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
  const [moviesData, setMoviesData] = useState<MoviesData>([]);
  const testKey = "beca0ddb56a192917d51c9b0f0d98844";
  console.log(moviesData);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=beca0ddb56a192917d51c9b0f0d98844&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2022&with_watch_monetization_types=flatrate`
      )
      .then((res) => {
        setMoviesData(res.data.results)
      });
  }, []);
  const posterStyle = {
    "width" : "200px",
    "height": "100%",
    "border-radius":"10px"
  }

  return (
    <div>
      <h1>Homepage</h1>
      <p>What is hot today? </p>
      <img
        src="https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
"
        alt=""
      />
      <div className="movie-wrapper">
        {moviesData.map((movie)=> {
            return (
              <div className="movieCard">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="poster"
                  style={posterStyle}
                />
                <span>★ {movie.vote_average}</span>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Home;
