import * as Api from '../../../js/api.js';

export default class HeaderPC extends HTMLElement {
  constructor() {
    super();
    // 로그인 여부
    const token = sessionStorage.getItem('token');
    this.isLogin = token ? true : false;
  }
  connectedCallback() {
    this.innerHTML = `
        <div class="Header__pc">
            ${this.renderHeaderMain()}
            ${this.renderHeaderSub()}
            ${this.renderHeaderMember()}                
        </div>
    `;
    this.renderByRole();
    this.addLogoutFeature();
  }


  renderHeaderMain() {
    const menusWithoutLogin = ` <li class="HeaderMainNavItem">
                                <a class="HeaderMainNavItem__link HeaderMainNavItem__link--active" href="/">홈</a>
                            </li>
                            <li class="HeaderMainNavItem">
                                <a class="HeaderMainNavItem__link" href="/register">회원가입</a>
                            </li>
                            <li class="HeaderMainNavItem">
                                <a class="HeaderMainNavItem__link" href="/cart">장바구니</a>
                            </li>
                            <li class="HeaderMainNavItem">
                                <a class="HeaderMainNavItem__link" href="/login">로그인</a>
                            </li>
                            `;
    const menusWithLogin = ` <li class="HeaderMainNavItem">
                                    <a class="HeaderMainNavItem__link HeaderMainNavItem__link--active" href="/">홈</a>
                            </li>
                            
                            <li class="HeaderMainNavItem">
                                <a class="HeaderMainNavItem__link" href="/updateInfo">마이페이지</a>
                            </li>
                            <li class="HeaderMainNavItem">
                                <a class="HeaderMainNavItem__link" href="/cart">장바구니</a>
                            </li>
                            <!--
                            <li class="HeaderMainNavItem Header__logout">
                                <a class="HeaderMainNavItem__link " href="#" >로그아웃</a>
                            </li>
                            -->
                            `;

    const html = ` <div class="Header__main">
                    <div class="HeaderMain__container Site__container">
                        <div class="HeaderMain__left">
                            <h1 class="HeaderMain__logo">
                                <a class="HeaderMain__logoLink" href="/">STOP MUSINSA</a>
                            </h1>
                            <input class="HeaderMain__search" />
                        </div>
                        <div class="HeaderMain__right">
                            <nav class="HeaderMainNav">
                                <ul class="HeaderMainNav__list">
                                   ${this.isLogin ? menusWithLogin : menusWithoutLogin }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>`;
    return html;
  }
  renderHeaderSub() {
    const html = `<div class="Header__sub">
                    <div class="HeaderSub__container Site__container">무신사 게섯거라</div>
                  </div>`;
    return html;
  }
  renderHeaderMember() {
    const menusWithoutLogin = ` 
                        <a class="HeaderMemberButton__link" href="/login">
                            <button class="Button Button--outline">로그인</button>
                        </a>
                        <div class="HeaderMemberMenus">
                            <div class="HeaderMemberMenu">
                                <a class="HeaderMemberMenu__link" href="/register">회원가입</a>
                            </div>
                            <div class="HeaderMemberMenu">
                                <a class="HeaderMemberMenu__link" href="/cart">장바구니</a>
                            </div>
                            <div class="HeaderMemberMenu">
                                <a class="HeaderMemberMenu__link" href="/register">회원 가입 EVENT. 신규 가입 후 바로 사용 가능한 18% 할인 쿠폰 / 게섯거라 스탠다드 990원 구매 기회</a>
                            </div>
                        </div>
                            `;
    const menusWithLogin = ` 
                        <a class="HeaderMemberButton__link" >
                            <button class="Button Button--outline Header__logout">로그아웃</button>
                        </a>
                        <div class="HeaderMemberMenus">
                            <div class="HeaderMemberMenu">
                                <a class="HeaderMemberMenu__link" href="/updateInfo">마이페이지</a>
                            </div>
                            <div class="HeaderMemberMenu">
                                <a class="HeaderMemberMenu__link" href="/cart">장바구니</a>                                
                            </div>
                            <div class="HeaderMemberMenu">
                                <a class="HeaderMemberMenu__link" href="#" onclick="alert('환영합니다!!!!!!!')">무신사 게섯거라에 오신 것을 환영합니다.</a>
                            </div>
                        </div>
                                `;
    const html = `
                <div class="Header__member">
                    <div class="HeaderMember__container Site__container">
                         ${this.isLogin ? menusWithLogin : menusWithoutLogin }
                    </div>
                </div>
                `;
    return html;
  }
  addLogoutFeature() {
    const logoutElements = document.querySelectorAll('.Header__logout');

    for (const logoutElement of logoutElements) {
      console.log(logoutElement);
      logoutElement.addEventListener('click', () => {
        sessionStorage.removeItem('token');
        window.location.replace('/');
      }, false);
    };
  }

  async renderByRole() {
    const token = sessionStorage.getItem('token');
    const nav = document.querySelector('.HeaderMainNav__list');
    if (token) {
      const user = await Api.get('/api/user');
      // admin 계정
      if (user.role === 'admin') {
        nav.innerHTML += `
            <li class="HeaderMainNavItem">
                <a class="HeaderMainNavItem__link" href="/admin">ADMIN</a>
            </li>
        `;
      }
    }
  }
}
window.customElements.define('common-header-pc', HeaderPC);
