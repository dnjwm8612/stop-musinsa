import * as Api from '../../../js/api.js';
export default class ProductList extends HTMLElement {
  constructor() {
    super();
    this.page = 1;
    this.show = 5;
  }
  async connectedCallback() {
    const title = this.getAttribute('title') ? ' - ' + this.getAttribute('title') : '';
    // html 추가
    this.innerHTML = `
        <div class="ProductList">
            <div class="ProductList__container Site__container">
                <h2 class="ProductList__title">제품 보기${title}</h2>
                <div class="ProductList__products">    
                </div>
            </div>
        </div>
    `;
    // css 파일 추가
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/src/views/components/product/ProductList/ProductList.css');
    this.appendChild(linkElem);

    // Add products
    const products = await this.fetchProducts();
    this.page++;
    this.addProductCards(products);

    // 충분한 제품수가 있을때만 무한스크롤
    const numberOfProducts = products.length;
    if (numberOfProducts > 0) {
      this.addInfiniteScroll();
    }
  }


  // Add Products
  async fetchProducts() {
    const requestUrl = `/api/product?page=${this.page}&show=${this.show}`;
    const products = await Api.get(requestUrl);
    return products;
  }
  addProductCards(products) {
    products.forEach((product) => {
      this.addProductCard(product);
    });
  }
  addProductCard(product) {
    const productList = document.querySelector('.ProductList__products');
    const productCard = document.createElement('product-card');
    productCard.product = product;
    productList.appendChild(productCard);
  }
  // Add Loading Items
  addInfiniteScroll() {
    const observerCallback = (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          // product fetch
          this.page++;
          const products = await this.fetchProducts();

          if (products.length === 0) {
            const footer = document.querySelector('.Footer__contact');
            observer.unobserve(footer);
          } else {
            // 로딩 아이템 추가
            this.addLoadingElements(products.length);

            setTimeout(async () => {
              // 리스트에 실제 아이템 추가
              this.addProductCards(products);

              // 로딩아이템 삭제
              this.removeLoadingElements();
            }, 600);
          }
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, {threshold: 1});
    // Observe Footer
    const footer = document.querySelector('.Footer__contact');
    observer.observe(footer);
  }
  addLoadingElements(numberOfProducts) {
    // add skeleton cards
    const productList = document.querySelector('.ProductList__products');
    for (let i = 0; i < numberOfProducts; i++) {
      const skeletonCard = document.createElement('product-card-skeleton');
      productList.appendChild(skeletonCard);
    }

    // // add spinner
    // const bottom = document.querySelector('.ProductList__container');
    // const spinner = document.createElement('common-spinner');
    // bottom.appendChild(spinner);
  }
  removeLoadingElements() {
    // remove skeleton cards
    const productList = document.querySelector('.ProductList__products');
    const skeletonCards = productList.getElementsByTagName('product-card-skeleton');
    while (skeletonCards.length) {
      productList.removeChild(skeletonCards[0]);
    }
    // // remove spinner
    // const bottom = document.querySelector('.ProductList__container');
    // const spinner = document.getElementsByTagName('common-spinner')[0];
    // bottom.removeChild(spinner);
  }
  observeLastItem(observer, items) {
    const lastItem = items[items.length - 1];
    if (lastItem) {
      observer.observe(lastItem);
    }
  }
  // Test
  createSampleProducts(n) {
    // test code start
    const products = [];
    const sampleProduct = {
      name: '[NF]링클워머 스워트 셋업',
      price: 98000,
      image: 'https://image.msscdn.net/images/goods_img/20210609/1989228/1989228_4_500.jpg?t=20210705115809',
      brand: '캘빈클라인 골프',
      sex: 'female',
      colors: [
        {
          'color': {
            '_id': '62947e8f521fe0e0e188fbc1',
            'colorName': 'red',
            'createdAt': '2022-05-30T08:21:35.170Z',
            'updatedAt': '2022-05-30T08:21:35.170Z',
            '__v': 0,
          },
          '_id': '6296629d9b1fc8258d11f955',
        },
      ],
      sizes: [
        {
          'size': {
            '_id': '62965d6e465e33c696d8bbf8',
            'sizeName': 'Small',
            'createdAt': '2022-05-31T18:24:46.560Z',
            'updatedAt': '2022-05-31T18:24:46.560Z',
            '__v': 0,
          },
          '_id': '6296629d9b1fc8258d11f956',
        },
      ],
      categories: {item: '하의', subitem: '슬랙스'},
      modelNumber: '2021SS-02-KHO-2', // 백엔드에 추가해야함
      season: '2021 S/S', // 백엔드에 추가해야함
      view: 56000, // 백엔드에 추가해야함
      deliveryStart: '220615', // 백엔드에 추가해야함
      deliveryMethod: '입점사 배송', // 백엔드에 추가해야함
      detailImage: 'https://image.musinsa.com/images/prd_img/2022052514500100000046988.jpg', // 백엔드에 추가해야함
    };
    for (let i = 0; i < n; i++) {
      products.push(sampleProduct);
    }
    return products;
    // test code end
  }
}
window.customElements.define('product-list', ProductList);
