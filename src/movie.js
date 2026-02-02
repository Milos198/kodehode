import axios from "axios";

const API_KEY = "72b8da3f";
const BASE_URL = "https://www.omdbapi.com/";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const container = document.getElementById("movieDetails");
const similarDiv = document.getElementById("similarMovies");

async function loadMovie() {
  try {
    const response = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, i: movieId, plot: "full" }
    });

    const movie = response.data;

    const poster =
      movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";

    container.innerHTML = `
      <div class="movie-container">
        <img src="${poster}" alt="${movie.Title}">
        <div class="info">
          <h1>${movie.Title} (${movie.Year})</h1>
          <p><strong>Rating:</strong> ${movie.imdbRating}</p>
          <p><strong>Parents Control:</strong> ${movie.Rated}</p>
          <p><strong>Genre:</strong> ${movie.Genre}</p>
          <p><strong>Runtime:</strong> ${movie.Runtime}</p>
          <p><strong>Released:</strong> ${movie.Released}</p>
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Writer:</strong> ${movie.Writer}</p>
          <p><strong>Actors:</strong> ${movie.Actors}</p>
          <p><strong>Box Office:</strong> ${movie.BoxOffice || "N/A"}</p>
          <p><strong>Plot:</strong> ${movie.Plot}</p>
        </div>
      </div>
    `;


    loadSimilarMovies(movie.Genre.split(",")[0].trim());

  } catch (error) {
    container.innerHTML = "<p>Error loading movie details.</p>";
    console.error(error);
  }
}

async function loadSimilarMovies(genre) {
  try {
    const response = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, s: genre }
    });

    const movies = response.data.Search || [];

    similarDiv.innerHTML = "";

    movies.slice(0, 6).forEach((movie) => {
      const poster =
        movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x450?text=No+Image";

      const card = document.createElement("div");
      card.className = "similar-card";

      card.innerHTML = `
        <img src="${poster}" alt="${movie.Title}">
        <h4>${movie.Title}</h4>
        <p>${movie.Year}</p>
      `;

      card.addEventListener("click", () => {
        window.open(`/movie.html?id=${movie.imdbID}`, "_blank");
      });

      similarDiv.appendChild(card);
    });
  } catch (error) {
    console.error("Similar movies error:", error);
  }
}

loadMovie();
