import FilmApi from './film-api';
const filmApi = new FilmApi();

export default class StorageApi {
  constructor() {
    const WATCHED_FILMS = 'watched';
    console.log('class storageapi');

    console.log('class storageapi');
    this.watchArray = [];
  }

  addToQueue(id) {
    console.log(id);

    console.log('storage. addTo que');
  }

  addToWatched(movie) {
    console.log(movie);
    console.log('Register click');

    const watchedFilms = JSON.parse(localStorage.getItem('WatchedFilm'));

    if (watchedFilms !== null) {
      watchedFilms[movie.id] = movie;
      localStorage.setItem('WatchedFilm', JSON.stringify(watchedFilms));
    } else {
      localStorage.setItem(
        'WatchedFilm',
        JSON.stringify({ [movie.id]: movie }),
      );
    }
  }
}
