const API_KEY = 'api_key=c521298dcd6b4625968925fc0f5cd547';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searc_URL = BASE_URL + '/search/movie?' + API_KEY;
const userCardTemplate = document.querySelector("[data-user-template]");
const searchBar = document.querySelector("[data-search]");
const movieContainer = document.querySelector("[data-movie-container]");

let movies = [];

searchBar.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    movies.forEach(movie => {
        const isVisible = movie.title.toLowerCase().includes(value);
        movie.element.classList.toggle("hide", !isVisible);
    });
});

// //for printing data
// fetch(API_URL) 
//     .then(response => response.json())
//     .then(data => {for(i=0;i<20;i++){console.log(data.results[i]);}});

fetch(API_URL)
    .then(response => response.json())
    //.then(data => {for(i=0;i<20;i++){console.log(data.results[i]);}});
    .then(data => {   
            movies = data.results.map(movie => {       
            const movieCard = userCardTemplate.content.cloneNode(true).children[0];
            console.log(movieCard);
            const title = movieCard.querySelector("[data-title]");
            const image = movieCard.querySelector("[data-movie-img]");
            title.textContent = movie.original_title;
            image.src = `${IMG_URL+movie.poster_path}`;
            movieContainer.append(movieCard);
            return{title: movie.original_title, element: movieCard}; 
        });
    })

//  //backup inside .then
        // for(i=0;i<20;i++){
        //     let html="";
        //     html+= `<div id="movies" class="m-1 mt-8 p-6 w-48 h-56 sm:w-56 sm:h-64 md:w-64 md:h-72 shadow-md box-border border-2 border-black rounded-md font-bold flex flex-row justify-center items-end bg-[url('${IMG_URL+data.results[i].poster_path}')] hover:scale-110">
        //                 <p class="align-middle text-white">${data.results[i].original_title}</p>
        //             </div>`
        //     document.getElementById("container").innerHTML += html;
        // }
