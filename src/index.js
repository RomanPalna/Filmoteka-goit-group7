import './sass/main.css';
import FilmApi from './js/film-api';
import debounce from 'lodash.debounce';
import filmCardTpl from './templates/filmCard.hbs';
import './js/modal.js';
import modalTpl from './templates/modal.hbs';

const filmApi = new FilmApi();

const refs = {
  galery: document.querySelector('.js-galery'),

  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),



  inputSearch: document.querySelector('.form-group'),
  watchBtn: document.querySelector('.js-button-watched'),
  queueBtn: document.querySelector('.js-button-queue'),
  addWatchBtn: document.querySelector('.add-to-watched-js'),
  addQueueBtn: document.querySelector('.add-to-queue-js'),
};

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
  document.body.classList.toggle('modal-open');
  refs.modal.classList.toggle('is-hidden');
  document.addEventListener('keydown', onCloseModalByEsc);
}

function onCloseModal(event) {
  refs.modal.classList.toggle('is-hidden');
  document.removeEventListener('keydown', onCloseModalByEsc);
}

function onCloseModalByEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

refs.modal.addEventListener('click', onOutModalClick);
function onOutModalClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
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

//films search
refs.inputSearch.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});
refs.inputSearch.addEventListener('input', debounce(onSearch, 1000));

function onSearch(event) {
  event.preventDefault();
  refs.filmSearchMarkup.innerHTML = '';
  fetchingSerchFilms();

}

function fetchingSerchFilms() {
  const searchQuery = refs.inputSearch.elements.query.value;

  return filmApi
    .fetchSearch(searchQuery)
    .then(data => data.results)
    .then(renderStartMarkup);
}

// Local Storage
const WATCHED_FILMS = 'watched';

console.log(localStorage);

refs.addWatchBtn.addEventListener('click', watchedFilms);

function watchedFilms() {
  console.log('Register click');
  // const watch = filmApi
  //   .fetchFilm()
  //   .then(localStorage.setItem(WATCHED_FILMS, JSON.stringify(watch)));

  // localStorage.setItem(WATCHED_FILMS, JSON.stringify(watch));
}

// function watchedFilmsFromLocalStorage() {
//   const savedWatchedFilms = localStorage.getItem(WATCHED_FILMS);

//   if (savedWatchedFilms) {
//   }
// }
