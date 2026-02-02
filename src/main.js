import axios from "axios";
import "./style.css";

const API_KEY = "72b8da3f";
const BASE_URL = "https://www.omdbapi.com/";

const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

searchBtn.addEventListener("click", searchMovies);

async function searchMovies() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  resultsDiv.innerHTML = "<p>Searching...</p>";

  try {
    const response = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, s: query }
    });

    if (response.data.Response === "False") {
      resultsDiv.innerHTML = `<p>${response.data.Error}</p>`;
      return;
    }

    const movies = response.data.Search || [];
    resultsDiv.innerHTML = "";

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "movie-card";

      const poster =
        movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x450?text=No+Image";

      card.innerHTML = `
        <img src="${poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;

      // Klik otvara novu karticu sa detaljima
      card.addEventListener("click", () => {
        window.open(`movie.html?id=${movie.imdbID}`, "_blank");
      });

      resultsDiv.appendChild(card);
    });

    
  } catch (error) {
    console.error("Search error:", error);
    resultsDiv.innerHTML = "<p>Something went wrong. Try again.</p>";
  }
}
