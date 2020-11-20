import './sass/main.css';
import FilmApi from './js/film-api';
import debounce from 'lodash.debounce';
import filmCardTpl from './templates/filmCard.hbs'
import './js/modal.js';

const refs = {
  galery: document.querySelector('.js-galery'),
  
}

const filmApi = new FilmApi();

genresToFilms().then(r => {
  renderStartMarkup(r);
  console.log(r)
});

async function genresToFilms() {
  const [genres, films] = await Promise.all([
    filmApi.fetchGanres(),
    filmApi.fetchFilms(),
  ]);
  const filmsWithGenres = films.results.map(film => {
    const genresForFilm = genres.genres.filter(genre =>
      film.genre_ids.includes(genre.id),
    );
    return {
      ...film,
      genres: genresForFilm,
    };
  });
  return filmsWithGenres;
}


function renderStartMarkup(movies) {
  refs.galery.innerHTML = createMenuMoviesMarkup(movies);
  let openModal = document.querySelector('.card__link');
  let closeModalBtn = document.querySelector('[data-modal-close]');
  openModal.addEventListener('click', toggleModal);
  closeModalBtn.addEventListener('click', toggleModal);
}

function createMenuMoviesMarkup (movies)  {
  return movies.map(filmCardTpl).join('');
}


function toggleModal(e) {
  // alert();
  console.log('click');
  e.preventDefault();
  let modal = document.querySelector('[data-modal]')

  document.body.classList.toggle('modal-open')
  modal.classList.toggle('is-hidden');
  return false;

}