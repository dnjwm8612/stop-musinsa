import * as Api from '../../js/api.js';

// 게시판 형식에 과한 중복이 있는 것 같은데...
// 시간이 좀만 더 있었으면 따로 게시판 로직은 분리했을듯...
export default class UserEdit {
  constructor(target, category) {
    this.target = target;
    this.target.innerHTML = ``;
    this.title = document.createElement('h1');
    this.title.className = 'EditContainer__title';
    this.target.appendChild(this.title);
    this.userContainer = document.createElement('div');
    this.userContainer.className = 'orderContainer';
    this.userContainer.innerHTML = `
      <div class='orderContents'>
        <h3>권한</h3>
        <h3>성명</h3>
        <h3>email</h3>
        <h3>address</h3>
      </div>
    `;
    this.target.appendChild(this.userContainer);
    this.render();
  }
  async render() {
    this.title.innerText = `유저 목록`;
    const userList = await Api.get('/api/user/userlist');
    userList.forEach(async (user) => {
      await this.userli(user, this.userContainer);
    });
  }
  // 유저 목록 블럭 동적생성
  async userli(data, target) {
    const container = document.createElement('div');
    container.className = 'orderContents';
    container.innerHTML = `
      <h3>${data.role}</h3>
      <h3>${data.fullName}</h3>
      <h3>${data.email}</h3>
      <div>
          <ol>
            <li><h3>${data.address.address1}</h3></li>
            <li><h4>${data.address.address2}</h4></li>
            <li><h4>${data.address.postalCode}</h4></li>
          </ol>
      </div>
    `;
    target.appendChild(container);
  }
}
