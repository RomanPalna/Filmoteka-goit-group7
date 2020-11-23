import filmCardTpl from './templates/filmCard.hbs';
import './sass/main.css';
console.log('sfdasd');

function createMenuMoviesMarkup(movies) {
    return movies.map(filmCardTpl).join('');
  }

  function preventDefaultForCards(params) {
    [...document.getElementsByClassName('card__link')].forEach(


        (element, index, array) => {
          element.addEventListener('click', e => {
            e.preventDefault();
        });
        },
      );
  }

document.querySelector('.js-button-watched').addEventListener('click', e => {
    e.preventDefault();
    
    console.log('click!!!');
    
    const watchedFilms = JSON.parse(localStorage.getItem('WatchedFilm'));
  
    document.querySelector('.js-library').innerHTML = createMenuMoviesMarkup(Object.values(watchedFilms));
    console.log(Object.values(watchedFilms));
    preventDefaultForCards();
  });






  document.querySelector('.js-button-queue').addEventListener('click', e => {
      e.preventDefault();


      const queueFilms = JSON.parse(localStorage.getItem('QueueFilm'));
      document.querySelector('.js-library').innerHTML = createMenuMoviesMarkup(Object.values(queueFilms));
      console.log(Object.values(queueFilms));
      preventDefaultForCards();
  })