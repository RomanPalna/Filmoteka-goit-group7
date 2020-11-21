import './sass/main.css';
import FilmApi from './js/film-api';
import debounce from 'lodash.debounce';
import filmCardTpl from './templates/filmCard.hbs';
import './js/modal.js';
import modalTpl from './templates/modal.hbs';

const refs = {
  galery: document.querySelector('.js-galery'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
};

const filmApi = new FilmApi();

genresToFilms().then(r => {
  renderStartMarkup(r);
  console.log(r);
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
  console.log('huokygdf');
}

function createMenuMoviesMarkup(movies) {
  return movies.map(filmCardTpl).join('');
  console.log('jjj');
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

// body.addEventListener('click', closeModalByOverlay);

// function closeModalByOverlay(event) {
//   if (event.currentTarget === event.target) {
//     onCloseModal();
//   }
// }

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
