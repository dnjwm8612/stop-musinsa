

/* eslint-disable */
import HeaderPC from './HeaderPC.js';
import HeaderMobile from './HeaderMobile.js';
/* eslint-enable */

export default class Header extends HTMLElement {
  constructor() {
    super();
    // html 추가
    const type = this.getAttribute('type');
    this.innerHTML = `
        <header>
           <common-header-pc></common-header-pc>
           <common-header-mobile type=${type}></common-header-mobile>
        </header>
    `;
    // css 파일 추가
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/src/views/components/common/Header/Header.css');
    this.appendChild(linkElem);
  }
}
window.customElements.define('common-header', Header);
