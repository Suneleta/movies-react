import React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

const Movie = ({ movie }) => {
  const poster =
    movie.poster_path === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <div className="movie">
      <h2>{movie.title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.title}`}
          src={poster}
        />
      </div>
      <p>({movie.overview})</p>
    </div>
  );
};

export default Movie;