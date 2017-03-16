
class PhotoCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.initShadowDom();
    this.render();
  }

  initShadowDom() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = this.template;
  }

  render() {
    let card = this.shadowRoot;
    let image = this.image;
    card.querySelector('.image-card-image__author').innerText = image.user.name;
    card.querySelector('.image-card-image__download').setAttribute('href', image.links.download);
    card.querySelector('.mdl-card__menu-open').setAttribute('href', image.links.html);
    card.querySelector('.mdl-card__media').innerHTML = `<better-img url=${image.urls.small}></better-img>`;
  }

  set image(image) {
    this.setAttribute('image', JSON.stringify(image));
  }

  get image() {
    return JSON.parse(this.getAttribute('image'));
  }

  get template() {
    return `
    <style>
      @import 'https://code.getmdl.io/1.3.0/material.red-blue.min.css';

      .image-card-image.mdl-card {
        position: relative;
        width: 384px;
        height: 256px;
        margin: 2px;
      }
      .image-card-image > .mdl-card__actions {
        position: absolute;
        bottom: 0px;
        color: #fff;
        height: 64px;
        padding: 16px;
        background: rgba(0, 0, 0, 0.2);
      }
      .image-card-image__author {
        position: absolute;
        font-size: 14px;
        font-weight: 500;
        bottom: 16px;
        left: 16px;
        line-height: 32px;
      }
      .image-card-image__download {
        position: absolute;
        right: 16px;
        bottom: 16px;
      }
      .mdl-card__supporting-text {
        min-height: 112px;
      }
      .mdl-card__menu {
        color: #fff;
      }
      .mdl-card__media {
        height: 100%;
        width: 100%;
      }
      img {
        min-width: 100%;
        min-height: 100%;
      }
    </style>

    <div class="image-card-image mdl-cell mdl-card">
      <div class="mdl-card__media">
      </div>
      <div class="mdl-card__actions">
        <span class="image-card-image__author"></span>
        <a class="image-card-image__download mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" download href>
          <i class="material-icons">file_download</i>
        </a>
      </div>
      <div class="mdl-card__menu">
        <a class="mdl-card__menu-open mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" target='_blank'>
          <i class="material-icons">open_in_new</i>
        </a>
      </div>
    </div>
  `;
  }
}

customElements.define('photo-card', PhotoCard);
