import axios from 'axios';

export default class Http {
  constructor() {}

  static get (url) {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(resolve)
        .catch(reject);
    });
  }
}