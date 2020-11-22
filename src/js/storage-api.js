export default class StorageApi {
  constructor() {
    const WATCHED_FILMS = 'watched';
    console.log('class storageapi');
  }

  addToQueue(id) {
    console.log(id);
    console.log('storage. addTo que');
  }
  addToWatched(id) {
    console.log(id);
    console.log('storage. add to watched');
  }
}
