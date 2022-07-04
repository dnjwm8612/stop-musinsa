const totalProductsNum = document.querySelector('#cart-num');
const totalInProducts = document.querySelector('#product-num-all');
const checkAllBox = document.querySelector('#product-check-all');
const deleteAllBtn = document.querySelector('#deleteAllBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const productBox = document.querySelector('#product-box');
const totalPrice = document.querySelector('#orderBtn');


const PRODUCTS_KEY = 'products';
let sum = 0;


// 예시코드
const DEFAUTL_PRODUCTS = [{_id: '629913727585ca9d9ab3cbea', image: 'http://localhost:5000/uploads/1654199154357_ser_image_logisim1.png', name: 'ser', option: 'Large', price: '23', quantity: 1, checked: true}, {_id: '6298dfa9549dddaa414663c5', image: 'http://localhost:5000/uploads/1654185897819_좋은 바_image_logisim1.png', name: '좋은 바', option: 'Large', price: '30000', quantity: 1, checked: true}];


// 로컬스토리지 저장
function saveProducts(newProducts) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
}

function getProductsData() {
  const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
  return products;
}


// 로컬 스토리지 받기
function getProducts() {
  setProductNum();

  sum = 0;

  const element = getProductsData().map((value, i) => {
    const index = i + 1;
    const {image, name, option, price, quantity} = value;
    const result = price * quantity;
    sum = value.checked === true ? sum + result : sum;


    return paintProductBox(index, image, name, option, price, quantity, result);
  });
  productBox.innerHTML = element.join('\n');
  emptyCart(sum);
}

// 장바구니 비었을 때 함수
function emptyCart(sum) {
  if (!sum) {
    totalPrice.disabled = 'disabled';
    totalPrice.classList.add('disabled');
    totalPrice.value = `장바구니가 비었습니다.`;
    totalPrice.style = `
    background-color: rgb(57, 56, 56);
    color: white;
    width: 290px;
    height: 60px;
    border-radius: 5px;
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      cursor: auto;`;
  } else {
    totalPrice.value = `총 ${sum.toLocaleString()}원 주문하기`;
    totalPrice.removeAttribute('disabled');
    totalPrice.classList.remove('disabled');
    totalPrice.removeAttribute('style');
  }
}


// 화면에 getProducts 띄우기
function paintProductBox(index, image, name, option, price, quantity, result) {
  return `
  <div class="product">
      <p id="product-num">${index}</p>
      <input type="checkbox" name="" class="product-check" checked onclick="handleCheck(this)">
      <div class="product-info">
        <img src="${image}" alt="picture" style="width: 50px;">
        <div class="option">
          <p class="product-name">${name}</p>
          <p class="product-option">OPTION: ${option}</p>
        </div>
        </div>
        <p class="product-price">${Number(price).toLocaleString()}</p>
        <div class="product-quantity-box">
          <input type="button" value="-" onclick="changeValue(this);">
          <input type="number" class="product-quantity" value="${quantity}">
          <input type="button" value="+" onclick="changeValue(this);">
        </div>
        <p class="product-result">${Number(result).toLocaleString()}</p>
        <div class="delete-box">
          <input class="delete" type="button" value="삭제하기" onClick="deleteOne(this);">
        </div>
      </div>
    </div>
  </div>
  `;
}


// 상품 갯수 innerText 정리 함수
function setProductNum() {
  const numberOfProducts = JSON.parse(localStorage.getItem('products')).length;
  totalProductsNum.innerText = numberOfProducts;
  totalInProducts.innerText = `전체 ${numberOfProducts}개`;
}


// 전체삭제 버튼 클릭 함수
function handleDeleteAllBtnClick() {
  if (JSON.parse(localStorage.getItem(PRODUCTS_KEY)).length === 0) {
    alert('장바구니가 비어있습니다.');
    return;
  }

  const result = confirm('장바구니를 비우시겠습니까?');

  if (result) {
    saveProducts([]);
    getProducts();
  }
}


// 전체 체크박스 클릭 함수
function handleCheckAllClick(e) {
  const checkBoxes = document.querySelectorAll('.product-check');
  const products = getProductsData();
  let total = 0;
  products.forEach((product) => {
    total += product.quantity * product.price;
  });

  if (checkAllBox.checked === true) {
    products.forEach((product) => product.checked = true);
  } else {
    products.forEach((product) => product.checked = false);
    total = 0;
  }

  emptyCart(total);

  Array.from(checkBoxes).forEach((x) => {
    x.checked = e.target.checked;
  });

  saveProducts(products);
}


// 선택삭제 클릭 함수
function hadleDeleteBtnClick() {
  const result = confirm('선택한 상품을 제거하시겠습니까?');
  const products = getProductsData();
  const checkBoxes = document.querySelectorAll('.product-check');

  if (result) {
    Array.from(checkBoxes).forEach((checkBox) => {
      if (checkBox.checked === true) {
        const index = Number(checkBox.previousElementSibling.innerText);
        products.splice(index - 1, 1);
        saveProducts(products);
        getProducts();
      }
    });
  }
}


// oerderBtn 클릭 함수
function handleOrderBtnClick() {
  const products = getProductsData();
  const filtered = products.filter((product) => {
    return product.checked === true;
  });
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
  location.replace('/pay');
}


/* html 적용 함수 */


// 삭제하기 버튼 이벤트 함수
function deleteOne(target) {
  const result = confirm('장바구니에서 제거하시겠습니까?');

  if (result) {
    const products = getProductsData();
    const product = target.parentElement.parentElement;
    const index = Number(product.firstElementChild.innerText);
    products.splice(index - 1, 1);

    saveProducts(products);
    getProducts();
  }
}


// 수량 변경 함수
function changeValue(target) {
  let quant = Number(target.parentElement.querySelector('.product-quantity').value);
  if (target.value === '+') {
    quant++;
  } else {
    if (quant === 0) {
      return;
    }
    quant--;
  }

  const index = Number(target.parentElement.parentElement.querySelector('#product-num').innerText);
  const products = getProductsData();
  products[index - 1].quantity = quant;

  saveProducts(products);
  getProducts();
}


// 개별 체크박스 클릭 함수
function handleCheck(checkbox) {
  // 개별 체크박스 선언
  const checkBoxes = document.querySelectorAll('.product-check');
  const isChecked = Array.from(checkBoxes).every((box) => box.checked);

  if (isChecked) {
    checkAllBox.checked = true;
  } else {
    checkAllBox.checked = false;
  }

  const value = checkbox.checked;

  const products = getProductsData();
  const index = Number(checkbox.parentElement.firstElementChild.innerText) - 1;

  const result = checkbox.parentElement.querySelector('.product-result').innerText;
  const resultPrice = result.replace(/,/g, '');

  if (value === false) {
    // 하나라도 false면 전체 체크박스도 false
    checkAllBox.checked = false;

    sum -= Number(resultPrice);
    products[index].checked = false;
    saveProducts(products);
  } else {
    sum += Number(resultPrice);
    products[index].checked = true;
    saveProducts(products);
  }

  emptyCart(sum);
}


/* main */

// 화면에 localStorage 띄우기
saveProducts(DEFAUTL_PRODUCTS);
getProducts();


// 전체삭제 버튼 클릭 이벤트
deleteAllBtn.addEventListener('click', handleDeleteAllBtnClick);


// 전체 체크박스 클릭 이벤트
checkAllBox.addEventListener('click', handleCheckAllClick);


// 선택삭제 이벤트
deleteBtn.addEventListener('click', hadleDeleteBtnClick);

// 결제하기 버튼 이벤트
totalPrice.addEventListener('click', handleOrderBtnClick);


// 장바구니 넣을 때
// const product = Api.get('/api/product/', 'productId');
// const {_id, name, image, price} = product;
// const option = ;

// let products = [];

// const data = {
//   _id,
//   image,
//   name,
//   price,
//   option,
//   quantity: 1,
//   checked: true,
// }

// products.push(data);

// localStorage.setItem('products', products);
