class UnsplashApi {

  constructor(clientId) {
    this.clientId = clientId;
  }

  get apiHost() {
    return 'https://api.unsplash.com';
  }

  random() {
    return this.get('photos/random');
  }

  photos() {
    return this.get('photos', {per_page: 25});
  }

  collection(id) {
    return this.get(`collections/${id}/photos`, {per_page: 25});
  }

  get(path, params) {
    let init = {
      method: 'GET',
      headers: this.headers()
    }
    return fetch(this.constructUrl(path, params), init)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      });
  }

  constructUrl(path, params) {
    return `${this.apiHost}/${path}${this.query(params)}`;
  }

  query(params) {
    if (params) {
      return '?' + Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
    } else {
      return '';
    }
  }

  headers() {
    return new Headers({
      'Authorization': `Client-ID ${this.clientId}`
    });
  }
}

export default UnsplashApi;
