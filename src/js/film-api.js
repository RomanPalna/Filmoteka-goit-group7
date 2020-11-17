const BASE_URL = 'https://api.themoviedb.org/3/trending/all/week?';

export default class filmApi {
  constructor() {}

  async fetchFilms() {
    const searchParams = new URLSearchParams({
      media_type: 'all',
      time_window: 'day',
      api_key: '212da8d7e84ef8a0df2f733afbf10d5d',
    });

    const url = `${BASE_URL}?${searchParams}`;

    const response = await fetch(url);
    const movies = await response.json();

    return movies;
  }
}
