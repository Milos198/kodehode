import axios from "axios";
import "./style.css";

const API_KEY = "72b8da3f";
const BASE_URL = "https://www.omdbapi.com/";

const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

searchBtn.addEventListener("click", searchMovies);

const input = document.getElementById("searchInput");

const autocomplete = document.getElementById("autocomplete");

input.addEventListener("input", async () => {
  const query = input.value.trim();

  if (query.length < 2) {
    autocomplete.style.display = "none";
    return;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, s: query }
    });

    const movies = response.data.Search || [];

    autocomplete.innerHTML = "";
    autocomplete.style.display = "block";

    movies.slice(0, 5).forEach(movie => {
      const item = document.createElement("div");
      item.className = "autocomplete-item";
      item.textContent = movie.Title;

      item.addEventListener("click", () => {
        window.open(`./movie.html?id=${movie.imdbID}`, "_blank");
        autocomplete.style.display = "none";
      });

      autocomplete.appendChild(item);
    });

  } catch (err) {
    autocomplete.style.display = "none";
  }
});


input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    searchMovies();
  }
});


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

    for (const movie of movies) {
      // 🔥 Drugi API poziv — ovde dobijamo Runtime
      const details = await axios.get(BASE_URL, {
        params: { apikey: API_KEY, i: movie.imdbID }
      });

      const info = details.data;

      const card = document.createElement("div");
      card.className = "movie-card";

      const poster =
        movie.Poster && movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x450?text=No+Image";

      card.innerHTML = `
        <img src="${poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>

        <div class="year-runtime">
          <p>${movie.Year}</p>
          <p><strong>Runtime:</strong> ${info.Runtime}</p>
        </div>
      `;

      // Klik otvara detalje
      card.addEventListener("click", () => {
        window.open(`/kodehode/movie.html?id=${movie.imdbID}`, "_blank");
      });

      resultsDiv.appendChild(card);
    }

  } catch (error) {
    console.error("Search error:", error);
    resultsDiv.innerHTML = "<p>Something went wrong. Try again.</p>";
  }
}



