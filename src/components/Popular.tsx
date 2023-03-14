import axios from "axios";
import { useState, useEffect } from "react";
import "./Home.css";
import Movies from "./Movies";

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

const TestNew = () => {
  const [moviesData, setMoviesData] = useState<MoviesData>([]);
  const fetchURL = `https://api.themoviedb.org/3/discover/movie?api_key=beca0ddb56a192917d51c9b0f0d98844&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2022&with_watch_monetization_types=flatrate`;

  useEffect(() => {
    axios.get(fetchURL).then((res) => {
      setMoviesData(res.data.results);
    });
  }, []);

  return (
    <div className="Home">
      <h1>Most Talked About</h1>

      <div className="movie-wrapper">
        {moviesData.map((movie) => {
          return <Movies key={movie.id} {...movie} />;
        })}
      </div>
    </div>
  );
};

export default TestNew;
