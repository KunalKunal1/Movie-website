let movies = JSON.parse(localStorage.getItem("movies")) || [
{
title: "Inception",
country: "USA",
language: "English",
year: 2010,
rating: 5,
poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
description: "A mind-bending sci-fi thriller."
},
{
title: "RRR",
country: "India",
language: "Telugu",
year: 2022,
rating: 4,
poster: "https://image.tmdb.org/t/p/w500/luZlJEVWn2GL6BlqJ7lV6f3L9V4.jpg",
description: "Epic Indian action drama."
}
];

function saveMovies() {
localStorage.setItem("movies", JSON.stringify(movies));
}

function showSection(id) {
document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function starRating(num) {
return "★".repeat(num) + "☆".repeat(5-num);
}

function displayMovies(filtered = movies) {
const container = document.getElementById("movieContainer");
container.innerHTML = "";

filtered.forEach(movie => {
container.innerHTML += `
<div class="movie-card">
<img src="${movie.poster}" alt="${movie.title}">
<div class="overlay">
<h3>${movie.title}</h3>
<p>${movie.country} | ${movie.language}</p>
<p>${movie.year}</p>
<div class="stars">${starRating(movie.rating)}</div>
<p>${movie.description}</p>
</div>
</div>
`;
});
populateFilters();
}

function populateFilters() {
const countries = [...new Set(movies.map(m => m.country))];
const languages = [...new Set(movies.map(m => m.language))];

countryFilter.innerHTML = `<option value="">All Countries</option>`;
languageFilter.innerHTML = `<option value="">All Languages</option>`;

countries.forEach(c => countryFilter.innerHTML += `<option value="${c}">${c}</option>`);
languages.forEach(l => languageFilter.innerHTML += `<option value="${l}">${l}</option>`);
}

function filterMovies() {
const country = countryFilter.value;
const language = languageFilter.value;

const filtered = movies.filter(m =>
(country === "" || m.country === country) &&
(language === "" || m.language === language)
);

displayMovies(filtered);
}

function searchMovies() {
const search = searchBar.value.toLowerCase();
const filtered = movies.filter(m =>
m.title.toLowerCase().includes(search)
);
displayMovies(filtered);
}

document.getElementById("movieForm").addEventListener("submit", function(e){
e.preventDefault();

const newMovie = {
title: title.value,
country: country.value,
language: language.value,
year: year.value,
rating: parseInt(rating.value),
poster: poster.value,
description: description.value
};

movies.push(newMovie);
saveMovies();
displayMovies();
this.reset();
alert("Movie Added Successfully!");
});

displayMovies();