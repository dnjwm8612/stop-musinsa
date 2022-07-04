export default class Sidebar {
  constructor(target, sideCategories, setPage) {
    this.target = target;
    this.setPage = setPage;
    this.sideCategories = sideCategories;
    this.ul = document.createElement('ul');
    this.target.appendChild(this.ul);
    this.render();
  }
  // 사이드 바 렌더링
  render() {
    this.sideCategories.forEach((value)=>{
      const li = document.createElement('li');
      li.className = 'SideBarContainer__list';
      li.innerText = value;
      this.ul.appendChild(li);
      li.addEventListener('click', ()=>{
        this.setPage(value);
      });
    });
  }
}
