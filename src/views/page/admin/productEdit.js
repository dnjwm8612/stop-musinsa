import * as Api from '../../js/api.js';

export default class ProductEdit {
  constructor(target) {
    this.target = target;
    this.target.innerHTML = ``;
    this.title = document.createElement('h1');
    this.title.className = 'EditContainer__title';
    this.target.appendChild(this.title);
    this.content = document.createElement('div');
    this.content.className = 'EditContainer__content__row';
    this.target.appendChild(this.content);
    this.form = document.createElement('form');
    this.content.appendChild(this.form);
    this.ul = document.createElement('ul');
    this.ul.className = 'productuList';
    this.content.appendChild(this.ul);
    this.render();
  }
  async render() {
    await this.formRender();
    await this.productRender();
  }

  // 상품 등록 form 렌더링
  async formRender(product) {
    this.product = product;
    console.log(product);
    this.title.innerText = `상품 목록`;
    this.form.className = 'productRegisterForm';
    this.form.encType = 'multipart/form-data';
    const [colors, sizes, categories] = await Promise.all([Api.get('/api/category/color'), Api.get('/api/category/size'), Api.get('/api/category')]);

    console.log(colors, sizes, categories);
    this.form.innerHTML = `
        <label for='name'>제품명 : </label>
        <input required name='name' id ='name' value='${product ? product.name : ''}'/>
        <label for='price'>가격 : </label>
        <input required name='price' type='number' id ='price' value='${product ? product.price : ''}'/>
        <label for='image'>상품 이미지 : </label>
        <input value='${product ? product.image : ''}' type="file" name="image" id="image" />
        <label for='detailImage'>상품 설명 : </label>
        <input value='${product ? product.detailImage : ''}' name='detailImage' type='file' id ='detailImage'/>
        <label for='brand'>브랜드 : </label>
        <input required name='brand' id ='brand' value='${product ? product.brand : ''}'/>
        <label for='sex'>성별 : </label>
        <label><input required type="radio" id='sex' name="sex" ${product && product.sex === 'male' ? 'checked' : null} value="male">male</label>
        <label><input required type="radio" id='sex' name="sex" ${product && product.sex === 'female' ? 'checked' : null }  value="female"/>female</label>
        <label><input required type="radio" id='sex' name="sex" ${product && product.sex === 'uni' ? 'checked' : null }  value="uni"/>uni</label>
        <label for='season'>시즌 : </label>
        <input required name='season' id ='season' value='${product ? product.deliveryStart : ''}'/>
        <label for='deliveryStart'>츨고 정보 : </label>
        <input required name='deliveryStart' id ='deliveryStart' value='${product ? product.deliveryStart : ''}'/>
        <label for='deliveryMethod'>배송 방법 : </label>
        <input required  name='deliveryMethod' id ='deliveryMethod' value='${product ? product.name : ''}'/>
        <label for='modelNumber'>모델 넘버 : </label>
        <input required name='modelNumber' id ='modelNumber' value='${product ? product.name : ''}'/>
        <p>색상 선택</p>
        `;
    colors.forEach((color, index)=>{
      this.form.innerHTML += `
            <label><input ${product && product.colors.map((color)=>color.color.colorName).includes(color.colorName) ? 'checked' : null } type="checkbox" name="colors[${index}]" value='${color._id}'> ${color.colorName}</label>
        `;
    });
    this.form.innerHTML += `<p>사이즈 선택</p>`;
    sizes.forEach((size, index)=>{
      this.form.innerHTML += `
            <label><input ${product && product.sizes.map((size)=>size.size.sizeName).includes(size.sizeName) ? 'checked' : null} type="checkbox" name="sizes[${index}]" value='${size._id}'> ${size.sizeName}</label>
        `;
    });
    this.form.innerHTML += `<p>카테고리</p>`;
    const categorySelect = document.createElement('select');
    categorySelect.className = 'categorySelect';
    categorySelect.name = 'categories';
    this.form.appendChild(categorySelect);

    categories.forEach((category)=>{
      categorySelect.innerHTML += `
            <option value='${category._id}'>Main : ${category.item} , Sub : ${category.subItem}<opiton>    
        `;
    });

    this.form.innerHTML += `<button class='Button' type='submit' id='${product ? 'update' : 'add'}'>${product ? '상품 정보 수정' : '새 상품 등록'}</button>`;

    this.form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      let res;
      const data = new FormData(this.form);
      console.log(data);
      if (e.submitter.id === 'update') {
        res = await fetch(`/api/product/${this.product._id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: data,
        });
      } else {
        res = await fetch('/api/product', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: data,
        });
      }
      await this.render();
    });
  }
  // 등록된 상품목록 렌더링
  async productRender() {
    while (this.ul.firstChild) {
      this.ul.removeChild(this.ul.firstChild);
    }
    this.ul.innerHTML += `
      <li class='productList__head'>
          <div class='productList__desc'>
              <h3>이미지</h3>
              <h3>제품이름</h3>
              <h4>브랜드</h4>
              <h4>성별</h4>
              <h4>가격</h4>
          </div>
      </li>
    `;
    const products = await Api.get('/api/product');
    console.log(products);
    products.forEach((product)=>{
      const li = document.createElement('li');
      li.className = 'productList';
      this.ul.appendChild(li);
      li.innerHTML = `
            <div class='productList__desc'>
                <img src='${product.image}' alt='제품 이미지'/>
                <h3>${product.name}</h3>
                <h4>${product.brand}</h4>
                <h4>${product.sex}</h4>
                <h4>${product.price}</h4>
            </div>
            <div class='productList__btns'>
                <button class='Button--secondary update'>수정</button>
                <button class='Button--secondary delete'>삭제</button>
            </div>
        `;
      li.querySelector('.update').addEventListener('click', ()=>{
        this.formRender(product);
      });
      li.querySelector('.delete').addEventListener('click', async ()=>{
        Api.delete(`/api/product/${product._id}`);
        alert('삭제 되었습니다.');
        await this.productRender();
      });
    });
  }
}
