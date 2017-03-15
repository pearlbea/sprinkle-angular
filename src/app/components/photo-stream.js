import UnsplashApi from './unsplash.js';

class PhotoStream extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.initShadowDom();
    this.getPhotos()
      .then(photos => {
        this.renderPhotos(photos);
      });
  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
  }

  get clientId() {
    this.getAttribute('client-id');
  }

  get collectionId() {
    this.getAttribute('collection-id');
  }

  get api() {
    return new UnsplashApi(this.getAttribute('client-id'));
  }

  getPhotos() {
    return this.api.collection(this.getAttribute('collection-id'));
  }

  get grid() {
    return this.shadowRoot.querySelector('.mdl-grid');
  }

  get template() {
    return  `
      <style>
        @import 'https://code.getmdl.io/1.3.0/material.red-blue.min.css';
        :host {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 60px;
        }
        .mdl-grid {
          display: flex;
          justify-content: center;
        }
        .mdl-card {
          margin: 2px;
        }
      </style>
      <div class="mdl-grid">
        <about-card></about-card>
      </div>
    `;
  }

  renderPhoto(image) {
    let card = document.createElement('photo-card');
    card.image = image;
    this.grid.appendChild(card);
  }

  renderPhotos(images) {
    images.forEach(image => this.renderPhoto(image));
  }
}

customElements.define('photo-stream', PhotoStream);
