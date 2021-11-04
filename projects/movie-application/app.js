const url = "https://api.themoviedb.org/3/trending/all/day?api_key=c807fc4227bf2c0227eb3bc0cc7c67f1&page=1";
const tumbnailContainer = document.querySelector(".tumbnail");
const featuredContainer = document.querySelector(".featuredContainer");

const informationEl = document.querySelector(".information");

function fetchMovies() {
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const movies = result.results;

      generateMovie(tumbnailContainer, movies.shift(), "backdrop_path");
      for (let i = 0; i < 4; i++) generateMovie(featuredContainer, movies.shift());
    });
}

function generateMovie(container, movie, image = "poster_path") {
  const wrapper = document.createElement("article");
  wrapper.addEventListener("click", () => openMovie(movie));
  wrapper.tabIndex = 0;
  container.appendChild(wrapper);
  wrapper.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie[image]}" />`;
}

function openMovie(movie) {
  informationEl.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.name}" />
        <h1>${movie.name}</h1>
        <p>${movie.overview}</p>
    `;
  titleEl.innerText = movie.name;
  descriptionEl.innerText = movie.overview;
  console.log("opening...", movie);
}

fetchMovies();
