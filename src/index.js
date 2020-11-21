import './sass/main.css';
import FilmApi from './js/film-api';
import debounce from 'lodash.debounce';
import filmCardTpl from './templates/filmCard.hbs';
import './js/modal.js';
import modalTpl from './templates/modal.hbs';

const refs = {
  galery: document.querySelector('.js-galery'),
  inputSearch: document.querySelector('.form-group'),
  filmSearchMarkup: document.querySelector('.search-films'),
};

const filmApi = new FilmApi();

genresToFilms().then(r => {
  renderStartMarkup(r);
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

  [...document.getElementsByClassName('card__link')].forEach(
    (element, index, array) => {
      element.addEventListener('click', a);
    },
  );
}

function createMenuMoviesMarkup(movies) {
  return movies.map(filmCardTpl).join('');
}

function toggleModal() {
  const modal = document.querySelector('[data-modal]');
  document.body.classList.toggle('modal-open');
  modal.classList.toggle('is-hidden');
}

function a(e) {
  e.preventDefault();
  let idFilm = e.currentTarget.getAttribute('data-id');
  filmApi.fetchFilm(idFilm).then(function (movie) {
    const modalContainer = document.querySelector('.modal-container');

    const card = modalTpl(movie);
    modalContainer.innerHTML = card;
    let closeModalBtn = document.querySelector('[data-modal-close]');
    closeModalBtn.addEventListener('click', toggleModal);
    toggleModal(movie);
  });
}

//Film Search

refs.inputSearch.addEventListener('input', debounce(onSearch, 1000));

function onSearch(event) {
  event.preventDefault();
  refs.filmSearchMarkup.innerHTML = '';
  fetchingSerchFilms();
}

async function fetchingSerchFilms() {
  const searchQuery = refs.inputSearch.elements.query.value;

  const fetchFilmSerch = await filmApi.fetchSearch(searchQuery);
  const markupSearchFilms = filmMarkups(fetchFilmSerch);

  return markupSearchFilms;
}

function filmMarkups(searchingFilm) {
  refs.filmSearchMarkup.insertAdjacentHTML(
    'beforeend',
    filmCardTpl(searchingFilm),
  );
}
