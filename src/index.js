
import './sass/main.css';
import FilmApi from './js/film-api';
import debounce from 'lodash.debounce';

const filmApi = new FilmApi();

filmApi.fetchFilms();

