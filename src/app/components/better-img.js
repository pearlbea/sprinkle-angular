class BetterImg extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.initShadowDom();
    }

    initShadowDom() {
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = this.template;
    }

    get url() {
      return this.getAttribute('url');
    }

    get width() {
      return this.getAttribute('width') || '640';
    }

    get height() {
      return this.getAttribute('height') || '480';
    }

    get fallback() {
      return this.getAttribute('fallback');
    }

    get template() {
      return `
        <img
          width=${this.width}
          height=${this.height}
          src=${this.url} />
      `;
    }

    onImgError(event) {
      let self = event.target.parentElement;
      self.url = self.fallback;
      self.report();
    }

    report() {
      this.log("Image failed to load, reporting to server");
      // TODO: Report error to server
    }

    log(msg) {
      console.log(`[BI] ${msg}`);
    }
  }

  customElements.define('better-img', BetterImg);
