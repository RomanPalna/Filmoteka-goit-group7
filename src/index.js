import './sass/main.css';
import FilmApi from './js/film-api';
import debounce from 'lodash.debounce';
import filmCardTpl from './templates/filmCard.hbs';
import './js/modal.js';
import modalTpl from './templates/modal.hbs';

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
  
  [...document.getElementsByClassName("card__link")].forEach(
    (element, index, array) => {
        element.addEventListener('click', a)
    }
  );  
}

function createMenuMoviesMarkup (movies)  {
  return movies.map(filmCardTpl).join('');
}


function a(e) {
  e.preventDefault();
  let idFilm = e.currentTarget.getAttribute("data-id");
    filmApi.fetchFilm(idFilm).then(function (movie) {
      const modalContainer = document.querySelector('.modal-container');
      
      const card = modalTpl(movie);
      modalContainer.innerHTML = card;
      let closeModalBtn = document.querySelector('[data-modal-close]');
      closeModalBtn.addEventListener('click', toggleModal);
      toggleModal(movie)
    })
}
