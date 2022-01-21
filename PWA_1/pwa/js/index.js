const form = document.getElementById("searchForm")
const searchInput = document.getElementById("searchInput")
const result = document.getElementById("result")

let search = "";  
let movies = []; //variable qui nous permettra de stocker les films

const fetchMovies = async () => { //
    movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eec46273dd8671e2f0422aebf4c0b326&query=${search}`).then((res) => res.json()); //json permet de convertir au bon format
    console.log(movies);
};

// Affichage des films et des visuels
const moviesDisplay = async () => { // on appelle
    await fetchMovies(); //on gère le fetch

    movies.results.length = 12; //Taille maximale d'afficharge des films

    result.innerHTML = movies.results.map( //on mape les movies
        (movie) => /*pour chacun des films individuellement on crée des listes avec :
                    le titre du film, l'mage du film, le résumé du film et une petite icône étoile*/
            ` 
            <li> 
                <h2>${movie.originals_title}</h2>
                <div class="card-content">
        
        
                    <img src='https://image.tmdb.org/t/p/w500${movie.poster.path}'></img>
                    <div class="infos">
                        <p>${movie.overview}</p>
                        <p>Popularité : ${movie.popularity} ⭐</p>
                    </div>
                </div>
            </li>
        `
    )
    .join(""); //le map de base met des virgules alors le join nous permettra de retirer ces virgules  
};

form.addEventListener("submit", function(evt){ //creer un event listener
    evt.preventDefault(); // se premunir contre le comportement de la page
    search = searchInput.value //affiche la recherche dans search ou la barre de recherche
    moviesDisplay();
});