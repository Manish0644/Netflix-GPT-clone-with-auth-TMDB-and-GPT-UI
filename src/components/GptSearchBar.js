import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { getGPTResponse } from "../utils/openai"; // ✅ named import

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results || [];
  };

  const handleGptSearchClick = async () => {
    const userQuery = searchText.current?.value?.trim();
    if (!userQuery) return;

    // Make a query for GPT (mocked in frontend)
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      userQuery +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    // ✅ This returns { ok, text, error }
    const gptRes = await getGPTResponse(gptQuery);

    if (!gptRes?.ok) {
      console.log("GPT error:", gptRes?.error);
      return;
    }

    // ✅ In stub: gptRes.text will be some string, so we fallback to userQuery based list
    // If later you connect real GPT, this split logic will still work.
    const rawText = gptRes.text || "";
    let gptMovies = rawText.split(",").map((m) => m.trim()).filter(Boolean);

    // ✅ Fallback: agar stub response me comma-separated movies nahi aaye
    if (gptMovies.length < 2) {
      // just use 5 generic keywords based on query (so app doesn't break)
      gptMovies = [userQuery, "Action", "Drama", "Comedy", "Thriller"];
    }

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
          type="button"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
