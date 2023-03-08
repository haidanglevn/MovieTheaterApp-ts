import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
type MoviesData = Movie;

const MovieSingle = () => {
  const params = useParams();
  const [moviesData, setMoviesData] = useState<MoviesData>();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.single}?api_key=beca0ddb56a192917d51c9b0f0d98844&language=en-US`
      )
      .then((res) => setMoviesData(res.data))
  }, []);
  console.log()
  return (
    <div>
      <h1>{moviesData?.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${moviesData?.poster_path}`} alt="" />

      <button>Check ticket availability</button>
    </div>
  );
};

export default MovieSingle;
