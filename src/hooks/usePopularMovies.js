import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(
    (store) => store.movies.popularMovies
  );

  useEffect(() => {
    if (popularMovies) return;

    const getPopularMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS
      );
      const json = await data.json();

      console.log("POPULAR API 👉", json.results);
      dispatch(addPopularMovies(json.results));
    };

    getPopularMovies();
  }, [dispatch, popularMovies]);
};

export default usePopularMovies;
