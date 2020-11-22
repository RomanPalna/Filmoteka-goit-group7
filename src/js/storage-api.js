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

  addToWatched(id) {
    console.log(id);
    console.log('Register click');
    // filmApi
    //       .fetchFilm()
    //       .then(
    //         localStorage.setItem('WatchedFilm', this.watchArray.push(this.watch)),
    //       );
    const watchedFilms = JSON.parse(localStorage.getItem('WatchedFilm'));

    if (Array.isArray(watchedFilms)) {
      if (watchedFilms.includes(id)) {
        return;
      }
      watchedFilms.push(id);
      localStorage.setItem('WatchedFilm', JSON.stringify(watchedFilms));
    } else {
      localStorage.setItem('WatchedFilm', JSON.stringify([id]));
    }
  }
}
