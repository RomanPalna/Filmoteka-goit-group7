const BASE_URL = 'https://api.themoviedb.org/3/trending/all/week';
const GANRE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const API_KEY = '212da8d7e84ef8a0df2f733afbf10d5d';
const DOMAIN = 'https://api.themoviedb.org';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';

export default class filmApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async fetchGanres() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
    });
    const url = `${GANRE_URL}?${searchParams}`;

    const response = await fetch(url);
    const ganres = await response.json();

    return ganres;
  }

  async fetchFilm(id) {
    const url = `${DOMAIN}/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url);
    const movie = await response.json();

    return movie;
  }

  async fetchFilms({ page = 1 }) {
    const searchParams = new URLSearchParams({
      page: page,
      api_key: API_KEY,
    });

    const url = `${BASE_URL}?${searchParams}`;

    const response = await fetch(url);
    const movies = await response.json();

    return movies;
  }

  async fetchSearch(searchQuery) {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: searchQuery,
      include_adult: false,
    });

    const url = `${SEARCH_URL}?${searchParams}`;

    const response = await fetch(url);
    const searchingFilm = await response.json();

    return searchingFilm;
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  set(newPage) {
    this.page = newPage;
  }

  get() {
    return this.page;
  }
}
