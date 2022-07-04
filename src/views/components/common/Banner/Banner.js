export default class Banner extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
            <div class="Banner">
                <img class="Banner__image" src="../../assets/images/banner.png" alt="banner" />
            </div>
          `;

    // css 파일 추가
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/src/views/components/common/Banner/Banner.css');
    this.appendChild(linkElem);
  }
}
window.customElements.define('common-banner', Banner);
