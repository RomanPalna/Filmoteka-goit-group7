const WATCHED_KEY = 'w1';
const QUEUE_KEY = 'ku1'

export default class StorageApi {
    constructor() {
        console.log('class storageapi');
    }

    
    addToQueue(id){
    
       let existedItems = localStorage.getItem(QUEUE_KEY);
       let parsedItems;
       if (existedItems) {
            parsedItems = JSON.parse(existedItems)
       } else {
           parsedItems = [];
       }
       parsedItems.push(id);
       let uniqItems = parsedItems.filter(function (x, i, a) { 
           return a.indexOf(x) == i; 
       });
       localStorage.setItem(QUEUE_KEY, JSON.stringify(uniqItems));
       console.log(localStorage.getItem(QUEUE_KEY));

        console.log(id);
        console.log('storage. addTo que');
    }
    addToWatched(id) {
        console.log(id);
        console.log('storage. add to watched');
    }
}