const BASE_URL = 'https://api.themoviedb.org/3/trending/all/week';
const GANRE_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const API_KEY = '212da8d7e84ef8a0df2f733afbf10d5d';

export default class filmApi {
  constructor() {
    this.page = 1;
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

  async fetchFilms() {
    const searchParams = new URLSearchParams({
      media_type: 'all',
      time_window: 'week',
      page: this.page,
      api_key: API_KEY,
    });

    const url = `${BASE_URL}?${searchParams}`;

    const response = await fetch(url);
    const movies = await response.json();

    return movies.results;
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
