let movies = JSON.parse(localStorage.getItem("movies")) || [
    { title: "RRR", country: "India", language: "Telugu", year: 2022, description: "Epic action drama." },
    { title: "Parasite", country: "South Korea", language: "Korean", year: 2019, description: "Thriller drama." },
    { title: "Inception", country: "USA", language: "English", year: 2010, description: "Sci-fi thriller." }
];

function saveMovies() {
    localStorage.setItem("movies", JSON.stringify(movies));
}

function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function displayMovies(filtered = movies) {
    const container = document.getElementById("movieContainer");
    container.innerHTML = "";

    filtered.forEach(movie => {
        container.innerHTML += `
            <div class="movie-card">
                <h3>${movie.title}</h3>
                <p><strong>Country:</strong> ${movie.country}</p>
                <p><strong>Language:</strong> ${movie.language}</p>
                <p><strong>Year:</strong> ${movie.year}</p>
                <p>${movie.description}</p>
            </div>
        `;
    });

    populateFilters();
}

function populateFilters() {
    const countries = [...new Set(movies.map(m => m.country))];
    const languages = [...new Set(movies.map(m => m.language))];

    const countrySelect = document.getElementById("countryFilter");
    const languageSelect = document.getElementById("languageFilter");

    countrySelect.innerHTML = `<option value="">All Countries</option>`;
    languageSelect.innerHTML = `<option value="">All Languages</option>`;

    countries.forEach(c => countrySelect.innerHTML += `<option value="${c}">${c}</option>`);
    languages.forEach(l => languageSelect.innerHTML += `<option value="${l}">${l}</option>`);
}

function filterMovies() {
    const country = document.getElementById("countryFilter").value;
    const language = document.getElementById("languageFilter").value;

    const filtered = movies.filter(m =>
        (country === "" || m.country === country) &&
        (language === "" || m.language === language)
    );

    displayMovies(filtered);
}

document.getElementById("movieForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const newMovie = {
        title: title.value,
        country: country.value,
        language: language.value,
        year: year.value,
        description: description.value
    };

    movies.push(newMovie);
    saveMovies();
    displayMovies();
    this.reset();
    alert("Movie Added Successfully!");
});

displayMovies();