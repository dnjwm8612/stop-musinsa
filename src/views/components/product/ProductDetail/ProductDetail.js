
import * as Api from '../../../js/api.js';
export default class ProductDetail extends HTMLElement {
  async connectedCallback() {
    const product = await this.fetchProduct();

    // colors
    const colors = [];
    product.colors.forEach((obj) => {
      colors.push(obj.color.colorName);
    });
    // sizes
    const sizes = [];
    product.sizes.forEach((obj) => {
      sizes.push(obj.size.sizeName);
    });
    this.innerHTML = `
       <div class="ProductDetail">
            <div class="ProductDetail__brandBar">
                <div class="Site__container">${product.brand}</div>
            </div>
            <div class="ProductDetail__container Site__container">
                <div class="ProductDetail__header">
                    <div class="ProductDetailHeader__breadcrumb">
                        <a>${product.categories ? product.categories.item : 'no category'}</a>
                        <span class="ProductDetailHeader__breadcrumbArrow"> &gt </span>
                        <a>${product.categories ? product.categories.subItem : 'no category'}</a>
                    </div>
                    <p class="ProductDetailHeader__brand">${product.brand}</p>
                    <h2 class="ProductDetailHeader__title">${product.name}</h2>
                    <p class="ProductDetailHeader__price">${this.numberWithCommas(product.price)}원</p>
                    <div class="ProductDetailHeader__border"></div>
                    <div class="ProductDetailHeader__info">
                        <p class="ProductDetailHeaderInfo__title">게섯거라 판매가</h4>
                        <p class="ProductDetailHeaderInfo__body">${this.numberWithCommas(product.price)}원</p>
                    </div>
                    <div class="ProductDetailHeader__info">
                        <p class="ProductDetailHeaderInfo__title">게섯거라 적립금</h4>
                        <p class="ProductDetailHeaderInfo__body">최대 ${this.getPoint(product.price)}원</p>
                    </div>
                    <div class="ProductDetailHeader__textBoxes">
                        <div class="TextBox TextBox--red">게섯거라스토어는 전 상품 유료배송입니다.</div>
                        <div class="TextBox">회원혜택 없음</div>
                    </div>
                </div>
                <div class="ProductDetail__topContainer">
                    <div class="ProductDetail__images">
                        <div class="ProductDetailImages__imageContainer">
                            <img
                                class="ProductDetailImages__image"
                                src="${product.image}"
                                alt="product"
                            />
                        </div>
                    </div>
                    <div class="ProductDetail__content">
                        <div class="ProductDetailGroup">
                            <h3 class="ProductDetailGroup__header">Product Info <span class="ProductDetailGroup__headerCaption">제품정보</span></h3>
                            <div class="ProductDetailGroupItem">
                                <h4 class="ProductDetailGroupItem__title">브랜드/품번</h4>
                                <p class="ProductDetailGroupItem__content">${product.brand} / ${product.modelNumber}</p>
                            </div>
                            <div class="ProductDetailGroupItem">
                                <h4 class="ProductDetailGroupItem__title">시즌/성별</h4>
                                <p class="ProductDetailGroupItem__content">${product.season} / ${product.sex}</p>
                            </div>
                            <div class="ProductDetailGroupItem">
                                <h4 class="ProductDetailGroupItem__title">조회수(1개월)</h4>
                                <p class="ProductDetailGroupItem__content">${this.numberWithCommas(product.view)}회 이상</p>
                            </div>
                            <div class="ProductDetailGroup__border"></div>
                        </div>
                        <div class="ProductDetailGroup">
                            <h3 class="ProductDetailGroup__header">Delivery Info <span class="ProductDetailGroup__headerCaption">배송정보</span></h3>
                            <div class="ProductDetailGroupItem">
                                <h4 class="ProductDetailGroupItem__title">출고정보</h4>
                                <p class="ProductDetailGroupItem__content">${product.deliveryStart} 출고</p>
                            </div>
                            <div class="ProductDetailGroupItem">
                                <h4 class="ProductDetailGroupItem__title">배송방법</h4>
                                <p class="ProductDetailGroupItem__content">${product.deliveryMethod}</p>
                            </div>
                            <div class="ProductDetailGroup__border"></div>
                        </div>
                        <div class="ProductDetailGroup">
                            <h3 class="ProductDetailGroup__header">Price Info <span class="ProductDetailGroup__headerCaption">가격정보</span></h3>
                            <div class="ProductDetailGroupItem">
                                <h4 class="ProductDetailGroupItem__title">게섯거라 판매가</h4>
                                <p class="ProductDetailGroupItem__content">${this.numberWithCommas(product.price)}원</p>
                            </div>
                            <div class="ProductDetailGroupItem">
                                <h4 class="ProductDetailGroupItem__title">게섯거라 적립금</h4>
                                <p class="ProductDetailGroupItem__content">최대 ${this.getPoint(product.price)}원</p>
                            </div>
                            <div class="ProductDetailGroup__textBoxes">
                                <div class="TextBox TextBox--red">게섯거라스토어는 전 상품 유료배송입니다.</div>
                                <div class="TextBox">회원혜택 없음</div>
                            </div>
                            <div class="ProductDetailGroup__border"></div>
                        </div>
                        <div class="ProductDetailOption__container">
                           ${this.createOptionBox('색상', colors)}
                           ${this.createOptionBox('사이즈', sizes)}
                              
                            <div class="ProductDetailOption__price">
                                <p>총 상품 금액</p>
                                <p>${this.numberWithCommas(product.price)}원</p>
                            </div>
                        </div>
                        <div class="ProductDetailPayment">
                            <button onclick="location.href='/pay'" class="ProductDetailPayment__buyButton">바로구매</button>
                            <button class="ProductDetailPayment__cartButton">
                                <img src="../../assets/images/shopping_bag.png" alt="shopping_bag" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="ProductDetail__mobileContent">   
                    <div class="ProductDetail__border"></div>
                    <div class="ProductDetailMobileContent__container">
                         <div class="ProductDetailMobileContent__header">
                        <h3 class="ProductDetailMobileContentHeader__title">Product Details <span class="ProductDetailInfoHeader__titleCaption">상품정보</span></h3>
                        
                    </div>           
                     <div class="ProductDetailMobileContent__info">
                        <p class="ProductDetailMobileContentInfo__title">브랜드 / 품번</h4>
                        <p class="ProductDetailMobileContentInfo__body">${product.brand} /${product.modelNumber}</p>
                     </div>
                     <div class="ProductDetailMobileContent__info">
                        <p class="ProductDetailMobileContentInfo__title">시즌 / 성별</h4>
                        <p class="ProductDetailMobileContentInfo__body">${product.season} / ${product.sex}</p>
                     </div>
                     <div class="ProductDetailMobileContent__info">
                        <p class="ProductDetailMobileContentInfo__title">조회수 (1개월)</h4>
                        <p class="ProductDetailMobileContentInfo__body">${this.numberWithCommas(product.view)}회 이상</p>
                     </div>
                     <div class="ProductDetailMobileContent__info">
                        <p class="ProductDetailMobileContentInfo__title">출고정보</h4>
                        <p class="ProductDetailMobileContentInfo__body">${product.deliveryStart}</p>
                     </div>
                     <div class="ProductDetailMobileContent__info">
                        <p class="ProductDetailMobileContentInfo__title">배송방법</h4>
                        <p class="ProductDetailMobileContentInfo__body">${product.deliveryMethod}</p>
                     </div>
                    </div>
                    <div class="ProductDetail__border"></div>
                </div>
                <div class="ProductDetail__info">
                    <div class="ProductDetailInfo__border"></div>
                    <div class="ProductDetailInfo__header">
                        <h3 class="ProductDetailInfoHeader__title">Info <span class="ProductDetailInfoHeader__titleCaption">정보</span></h3>
                        <p class="ProductDetailInfoHeader__report">해당 상품정보에 문제가 있으면 알려주세요.</p>
                    </div>
                    <div class="ProductDetailInfo__body">
                        <img class="ProductDetailInfo__image" src="${product.detailImage}" alt="detail info" />
                    </div>
                </div>
            </div>
        </div>
    `;

    // css 파일 추가
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/src/views/components/product/ProductDetail/ProductDetail.css');
    this.appendChild(linkElem);
  }
  async fetchProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    this.product = await Api.get(`/api/product/${id}`);
    return this.product;
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getPoint(price) {
    // 적립금 구하기
    const percentage = 5;
    const point = parseInt(price * percentage / 100); ;
    return this.numberWithCommas(point);
  }
  createOption(option) {
    return `<option class="ProductDetailOption__item" value="${option}">${option}</option>`;
  }
  createOptionBox(title, options) {
    let optionPart = '';
    console.log(options);
    options.forEach((option) => {
      optionPart += this.createOption(option);
    });

    const optionBox = `<div class="ProductDetailOption">
                <select class="ProductDetailOption__list">
        <option class="ProductDetailOption__item" value="">${title}</option>        
               ${optionPart}
                </select>
            </div>`;

    return optionBox;
  }
}

window.customElements.define('product-detail', ProductDetail);


// 각 버튼 쿼리셀렉터로 선언
const buyBtn = document.querySelector('.ProductDetailPayment__buyButton');
const cartBtn = document.querySelector('ProductDetailPayment__cartButton');


// 장바구니 버튼 클릭
async function handleCartBtnClick() {
  const result = confirm('장바구니에 추가하시겠습니까?');

  if (result) {
    const cartArr = []; // 이거는 전역에 하나 있어야할듯
    const product = fetchProduct();
    const {image, _id, name, price} = product;
    const option = product.sizes.size.sizeName;

    const data = {
      image,
      _id,
      name,
      price,
      option,
      quantity: 1,
      checked: true,
    };
    cartArr.push(data);

    localStorage.setItem('products', JSON.stringify(cartArr));
    alert('장바구니에 추가했습니다.');
  }
}


// 바로구매 버튼 클릭
async function handleBuyBtnClick() {
  const result = confirm('상품을 구매하시겠습니까?');

  if (result) {
    const product = fetchProduct();
    const {image, _id, name, price} = product;
    const option = product.sizes.size.sizeName;

    const data = [{
      image,
      _id,
      name,
      price,
      option,
      quantity: 1,
      checked: true,
    }];

    localStorage.setItem('products', JSON.stringify(data));
    location.replace('/pay');
  }
}

//  각 버튼 클릭 이벤트
cartBtn.addEventListener('click', handleCartBtnClick);
buyBtn.addEventListener('click', handleBuyBtnClick);
