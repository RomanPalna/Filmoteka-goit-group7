import './sass/main.css';
import FilmApi from './js/film-api';
import debounce from 'lodash.debounce';

const filmApi = new FilmApi();

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
