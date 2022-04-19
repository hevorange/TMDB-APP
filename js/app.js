//TMDB

const API_KEY = 'api_key=99e8362a15a99f298f3d29fbbc6b1c3b';
const BASE_URL ='https://api.themoviedb.org/3';
const API_URL=BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;

const IMG_URL= 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');

const form =document.getElementById('form');
const search = document.getElementById('search');
const searchURL = BASE_URL+'/search/movie?'+API_KEY;

const getColor = (vote)=>{

   

    return (vote>=8) ? 'green': (vote>=5) ? 'orange' : 'red';
}

const showMovies =(data)=>{

    main.innerHTML='';

    data.forEach(movie =>{

        const {title, poster_path,vote_average, overview} =movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`        
            <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info"> 
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                
                <h3>Trama</h3>
                ${overview}
            </div>`

            main.appendChild(movieEl);
    })
}

const getMovies = (url)=>{

    fetch(url).then(res => res.json()).then(data =>{

        showMovies(data.results);
    })
}

getMovies(API_URL);

form.addEventListener('submit', (e)=>{

    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm){

        getMovies(searchURL+'&query='+searchTerm);
    }else{

        showMovies(API_URL);
    }
})