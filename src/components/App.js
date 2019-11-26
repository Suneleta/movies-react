import React, { useReducer, useEffect } from "react";

import Header from "./Header";
import Movie from "./Movie";
import spinner from "../assets/loader.gif";
import Search from "./Search";
import '../App.css'
import { initialState, reducer } from "../store/reducer";
import axios from "axios";

const MOVIE_API_URL ="https://api.themoviedb.org/3/discover/movie?api_key=10eb07f06e8b0e42e2c3fd785eb62c45&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.results,
      });
    });
  }, []);


  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://api.themoviedb.org/3/search/movie?api_key=10eb07f06e8b0e42e2c3fd785eb62c45&query=${searchValue}`).then(
      jsonResponse => {
        if (jsonResponse.data) {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.results,
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error,
          });
        }
      },
    );
  };

  const { movies, errorMessage, loading } = state;

  const foundMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <div className="m-container">
        <Header text="Movies" />

        <Search search={search} />

        <p className="App-intro"></p>

        <div className="movies">{foundMovies}</div>
      </div>
    </div>
  );
};

export default App;
