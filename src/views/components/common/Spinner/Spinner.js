export default class Spinner extends HTMLElement {
  connectedCallback() { // html 추가 const product = this._product;
    this.innerHTML = `
                <div class="Spinner">
                    <img class="Spinner__image" src="src/views/assets/images/spinner.gif"/>
                </div>
                `;
    // css 파일 추가
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/src/views/components/common/Spinner/Spinner.css');
    this.appendChild(linkElem);
  }
}
window.customElements.define('common-spinner', Spinner);
