import './sass/main.css';
import FilmApi from './js/film-api';
import debounce from 'lodash.debounce';
import filmCardTpl from './templates/filmCard.hbs'

const refs = {
  galery: document.querySelector('.js-galery')
}

const filmApi = new FilmApi();
console.log(filmApi)

filmApi.fetchFilms().then(movies => {
  renderStartMarkup(movies);
});

function createMenuMoviesMarkup (movies)  {
  return movies.map(filmCardTpl).join('');
}

function renderStartMarkup(movies) {
  refs.galery.innerHTML = createMenuMoviesMarkup(movies);
}