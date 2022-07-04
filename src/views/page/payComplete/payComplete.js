import * as Api from '../../js/api.js';

// payFinish HTML 함수

const cancleBtn = document.querySelector('#cancle__btn');
const finishBtn = document.querySelector('#finish__btn');

function realFinish() {
  const products = [];
  localStorage.setItem('products', products);
  location.replace('/');
}

async function cancleOrder() {
  const result = confirm('주문을 취소하시겠습니까?');
  
  try {
    if (result) {
      const data = await Api.get('/api/order/member/orders');
      const orderId = data[0]._id;
      
      await Api.patch('/api/order/orders', orderId + '/' + '취소');
      alert('주문이 취소되었습니다.');
      location.replace('/');
    }
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

cancleBtn.addEventListener('click', cancleOrder);
finishBtn.addEventListener('click', realFinish);