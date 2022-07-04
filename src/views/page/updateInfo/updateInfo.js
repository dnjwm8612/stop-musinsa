import * as Api from '../../js/api.js';

const username = document.querySelector('#name');
const curPassword = document.querySelector('#password');
const email = document.querySelector('#email');
const postCode = document.querySelector('#sample6_postcode');
const address = document.querySelector('#sample6_address');
const detailAdd = document.querySelector('#sample6_detailAddress');
const newPassword = document.querySelector('#new__password');
const form = document.querySelector('form');
const deleteBtn = document.querySelector('#delete__btn');

// 폼 제출 함수
async function handleFormSubmit(e) {
  e.preventDefault();

  const user = await Api.get('/api/user');

  const fullName = username.value;
  const currentPassword = curPassword.value;
  const password = newPassword.value.length > 0 ? newPassword.value : curPassword.value;
  const postalCode = postCode.value;
  const address1 = address.value;
  const address2 = detailAdd.value;

  try {
    const data = {
      fullName,
      currentPassword,
      password,
      address: {
        postalCode,
        address1,
        address2,
      },
    };

    await Api.patch('/api/user', '', data);
    alert('정보가 변경되었습니다!');
    location.href = '/';
  }
  catch(err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 기존 회원 정보 넣기
async function paintUserInfo() {
  const user = await Api.get('/api/user');

  username.value = user.fullName;
  email.value = user.email;
  postCode.value = user.address.postalCode;
  address.value = user.address.address1;
  detailAdd.value = user.address.address2;
}

// 회원탈퇴 버튼 클릭 함수
async function handleDeleteBtnClick() {
  const result = confirm('정말로 회원탈퇴를 하시겠습니까?');

  try {
    if(result) {
      await Api.delete('/api/user/');

      sessionStorage.removeItem('token');
      alert('이용해주셔서 감사합니다.');
      location.replace('/');
    }
  }
  catch(err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// 폼 제출 이벤트
form.addEventListener('submit', handleFormSubmit);

// 회원 탈퇴 버튼 클릭 이벤트
deleteBtn.addEventListener('click', handleDeleteBtnClick);

paintUserInfo();














// 주문 내역
const orderBox = document.querySelector('.history__products');
const cancleBtn = document.querySelectorAll('.order__status');

async function getData() {
  const orders = await Api.get('/api/order/member/orders');
  const products = await Api.get('/api/product');
  console.log(orders, products);
  // orders.forEach(order => {
  //   const img = 
  // })
}

function paintData(img, name, date, price) {
  return `
    <div class="history__product">
      <div class="product__title">
          <img src="${img}" alt="product">
          <p class="product__name">${name}</p>
      </div>
      <div class="history__date">
          <p class="order__date">${date}</p>
      </div>
      <div class="history__price">
          <p class="order__price">${price}</p>
      </div>
      <div class="history__status">
          <input type="button" class="order__status" value="주문취소">
      </div>
    </div>
  `
}

getData();