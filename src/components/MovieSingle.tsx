import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, Route, Routes } from "react-router-dom";
import "./MovieSingle.css";
import SeatMap from "./SeatMap";

export interface Movie {
  title: string;
  release_date: string;
  id: number;
  overview: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  poster_path: string;
  homepage: string;
  genres: Array<Genre>;
  tagline: string;
  runtime: number;
  production_companies: Array<ProductionCompanies>;
}
export type MoviesData = Movie;
export type Genre = {
  id: number;
  name: string;
};
export type ProductionCompanies = {
  id: number;
  logo_path: string;
  name: string;
};

const MovieSingle = () => {
  const params = useParams();
  const [moviesData, setMoviesData] = useState<MoviesData>();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.single}?api_key=beca0ddb56a192917d51c9b0f0d98844&language=en-US`
      )
      .then((res) => {
        setMoviesData(res.data);
      });
  }, []);

  return (
    <div className="movieSingle">
      <div className="movie-hero">
        <h1>{moviesData?.title}</h1>
        <h2>{moviesData?.tagline.toUpperCase()}</h2>
        <div className="logo">
          <p>{moviesData?.production_companies[0].name}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${moviesData?.production_companies[0].logo_path}`}
            alt="company-logo"
            id="company-logo"
          />
        </div>
        <p>
          {moviesData?.release_date.slice(0, 4)} - {moviesData?.runtime}m
        </p>
        <p>
          {moviesData?.genres.map((genre) => {
            return <span> {genre.name} | </span>;
          })}
        </p>
      </div>
      <div className="movie-info">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${moviesData?.poster_path}`}
            alt="poster"
            className="poster"
          />
        </div>
        <div>
          <div style={{ padding: "20px 0" }}>
            <p>{moviesData?.overview}</p>
          </div>
          <div>
            <p>
              Website: <a href={moviesData?.homepage}>{moviesData?.homepage}</a>{" "}
            </p>
            <p style={{ color: "yellow" }}>
              ★ {moviesData?.vote_average} / 10 ({moviesData?.vote_count})
            </p>
          </div>
          <button>
            <Link to="./ticket">See ticket availability</Link>
            <Routes>
              <Route path="/:single/ticket" element={<SeatMap />} />
            </Routes>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieSingle;
