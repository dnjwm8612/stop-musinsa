export default class ProductCardSkeleton extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() { // html 추가 const product = this._product;
    this.innerHTML = `
                 <div class="ProductCardSkeleton">
                        <div class="ProductCardSkeleton__header">
                        </div>
                        <div class="ProductCardSkeleton__imageContainer">                            
                        </div>
                        <div class="ProductCardSkeleton__body">
                            <div class="ProductCardSkeleton__row ProductCardSkeleton__row--short"></div>
                            <div class="ProductCardSkeleton__row ProductCardSkeleton__row--medium"></div>
                            <div class="ProductCardSkeleton__row ProductCardSkeleton__row--short"></div>
                        </div>
                    </div>
                    `;
    // css 파일 추가
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/src/views/components/product/ProductCardSkeleton/ProductCardSkeleton.css');
    this.appendChild(linkElem);
  }
}
window.customElements.define('product-card-skeleton', ProductCardSkeleton);
