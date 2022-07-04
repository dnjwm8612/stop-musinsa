import * as Api from '../../js/api.js';
export default class OrderEdit {
  constructor(target, category) {
    this.target = target;
    this.target.innerHTML = ``;
    this.title = document.createElement('h1');
    this.title.className = 'EditContainer__title';
    this.target.appendChild(this.title);
    this.orderContiner = document.createElement('div');
    this.orderContiner.className = 'orderContiner';
    this.target.appendChild(this.orderContiner);
    this.orderContiner.innerHTML = `
      <div class='orderContents'>
          <h3>주문자</h3>
          <h3>결제</h3>
          <h3>주문상품</h3>
          <h3>주소</h3>
          <h3>총 주문액</h3>
          <h3>배송상태</h3>
      </div>
    `;
    this.render();
  }

  async render() {
    this.title.innerText = `주문 목록`;
    const orderList = await Api.get('/api/order/orders');
    orderList.forEach(async (order)=> {
      await this.orderli(order, this.orderContiner);
    });
  }

  // 주문 목록별 블록 생성
  async orderli(data, target) {
    const container = document.createElement('div');
    container.className = 'orderContents';
    container.innerHTML = `
    <h3>${data.fullname}</h3>
        <h3>${data.paymentMethod}</h3>
        <div>
          <ol>
            ${data.products.map(({product, count})=>`<li><h4>${product.brand}</h4><h5>${product.name}</h5><h5>${count}</h5></li>`).join('')}
          </ol>
        </div>
        <div>
          <ol>
            <li><h4>${data.address.address1 ? data.address.address1 : ''}</h4></li>
            <li><h4>${data.address.address2 ? data.address.address2 : ''}</h4></li>
            <li><h4>${data.address.postalCode ? data.address.postalCode : ''}</h4></li>
          </ol>
        </div>
        <h3>
          ${data.total} 원
        </h3>
    `;
    const selectConteiner = document.createElement('div');
    if (data.state === '취소') {
      selectConteiner.innerHTML = `<h3>취소</h3>`;
    } else {
      const selectState = document.createElement('select');
      selectState.name = 'state';
      selectState.innerHTML = `
      <option value='준비중' ${data.state === '준비중' ? 'selected' : ''}>준비중</option>
      <option value='배송중' ${data.state === '배송중' ? 'selected' : ''}>배송중</option>
      <option value='배송완료' ${data.state === '배송완료' ? 'selected' : ''}>배송완료</option>
    `;
      // 주문 상태 변경
      selectState.addEventListener('change', async (e)=>{
        await Api.patch(`/api/order/orders`, data._id + '/' + e.target.value);
        alert('변경되었습니다.');
      });
      selectConteiner.appendChild(selectState);
    }
    container.appendChild(selectConteiner);
    target.appendChild(container);
  }
}
