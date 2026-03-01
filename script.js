let isAdmin=false;

let movies=[
{
title:"Inception",
country:"USA",
language:"English",
year:2010,
rating:5,
poster:"https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
trailer:"https://www.youtube.com/embed/YoHD9XEInc0",
description:"Sci-fi thriller"
}
];

function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function toggleTheme(){
document.body.classList.toggle("light");
}

function login(){
alert("User logged in (Demo)");
}

function adminLogin(){
if(document.getElementById("adminPass").value==="admin123"){
isAdmin=true;
alert("Admin Logged In");
showSection("add");
}else{
alert("Wrong Password");
}
}

function addMovie(){
if(!isAdmin){alert("Admin only");return;}
let movie={
title:title.value,
country:country.value,
language:language.value,
year:year.value,
rating:rating.value,
poster:poster.value,
trailer:trailer.value.replace("watch?v=","embed/"),
description:description.value
};
movies.push(movie);
displayMovies();
alert("Movie Added");
}

function starRating(n){
return "★".repeat(n)+"☆".repeat(5-n);
}

function displayMovies(){
let container=document.getElementById("movieContainer");
container.innerHTML="";
movies.forEach(m=>{
container.innerHTML+=`
<div class="movie-card">
<img src="${m.poster}">
<div class="overlay">
<h3>${m.title}</h3>
<p>${m.country} | ${m.language}</p>
<p>${m.year}</p>
<div>${starRating(m.rating)}</div>
<button onclick="openTrailer('${m.trailer}')">Watch Trailer</button>
</div>
</div>`;
});
}

function openTrailer(link){
document.getElementById("trailerFrame").src=link;
document.getElementById("trailerModal").style.display="block";
}

function closeModal(){
document.getElementById("trailerModal").style.display="none";
document.getElementById("trailerFrame").src="";
}

displayMovies();