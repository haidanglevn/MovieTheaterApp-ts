import React from "react";
import { useState, useEffect } from "react";
import "./New.css";
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

const Movies: React.FC<Movie> = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayID, setOverlayID] = useState<number>();
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
  const handleMouseEnter = (id: number) => {
    setShowOverlay(true);
    setOverlayID(id);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
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
    <>
      <div
        className="movieCard"
        key={props.id}
        onMouseEnter={() => handleMouseEnter(props.id)}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
          alt="poster"
          style={posterStyle}
        />
        <span style={{fontSize: "20px"}}>★ {props.vote_average}</span>
        {renderOverlay(props)}
      </div>
    </>
  );
};

export default Movies;
