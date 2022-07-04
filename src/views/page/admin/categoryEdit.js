import * as Api from '../../js/api.js';

export default class CategoryEdit {
  constructor(target) {
    this.target = target;
    this.target.innerHTML = ``;
    this.title = document.createElement('h1');
    this.title.className = 'EditContainer__title';
    this.target.appendChild(this.title);
    this.content = document.createElement('div');
    this.content.className = 'EditContainer__content';
    this.target.appendChild(this.content);
    this.render();
  }

  // 카테고리 목록 불러오기
  async fetchCategory() {
    const categories = await Api.get('/api/category');
    return categories;
  }

  render() {
    this.title.innerText = '카테고리';
    this.fetchCategory().then((categories)=>{
      categories.forEach((category)=>{
        // 카테고리별  form 블럭
        const form = document.createElement('form');
        form.className = 'categoryUpdateForm';
        form.innerHTML = `
          <div class='categoryUpdateForm__conatiner'>
            <h3>Main</h3>
            <input name='main' value='${category.item}'/>
            <h3>Sub</h3>
            <input name='sub' value='${category.subItem}'/>
            <button name='update' type='submit'>수정하기</button>
            <button name='delete' type='submit'>삭제하기</button>
          </div>
        `;
        this.content.appendChild(form);

        // 카테고리 수정 액션
        form.addEventListener('submit', async (e)=>{
          e.preventDefault();
          const formData = new FormData(e.target);
          if (e.submitter.name === 'update') {
            if (formData.get('main') !== category.item) {
              await Api.patch(`/api/category/main`, category.item, {newCategory: formData.get('main')});
            }
            await Api.patch(`/api/category/sub?categoryName=${category.item}&subCategoryName=${category.subItem}`, '', {newSubCategory: formData.get('sub')});
            alert('수정되었습니다.');
            location.reload();
          } else if (e.submitter.name === 'delete') {
            await Api.delete(`/api/category/${category._id}`, '', {replaceCategoryIdArray: []});
            alert('삭제되었습니다.');
            location.reload();
          }
        });
      });

      // 새 카테고리 생성
      const registerForm = document.createElement('form');
      this.content.appendChild(registerForm);
      registerForm.className = 'categoryUpdateForm';
      registerForm.innerHTML += `
        <div class='categoryUpdateForm__conatiner'>
          <h3>Main</h3>
          <input name='item'/>
          <h3>Sub</h3>
          <input name='subItem'/>
          <button type='submit'>등록하기</button>
          <div></div>
        </div>
    `;
      registerForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const data = new FormData(e.target);
        await Api.post('/api/category', Object.fromEntries(data));
        alert('등록되었습니다.');
        location.reload();
      });
    });
  }
}
