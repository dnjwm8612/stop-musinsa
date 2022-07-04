import {productModel} from '../db';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  pagenation(products, page, show) {
    const filtered = products.splice(show * (page - 1), show);
    console.log(filtered);
    return filtered;
  }
  // 상품 등록
  async addProduct(productInfo) {
    // 구조분해 할당 후 스키마 구조에 따라 세팅 const {} = productInfo;
    const product = await this.productModel.create(productInfo);
    return product;
  }

  // 옵션 별 전체상품 및 페이지 상품 조회
  async getProducts(option, page, show) {
    let products = await this.productModel.findAll(option);
    if (page && show) {
      // 페이지네이션
      products = this.pagenation(products, page, show);
    }
    if (option.color) {
      products = products.filter((product)=>{
        let match = false;
        product.colors.forEach((color)=>{
          if (color.color.colorName === option.color) match = true;
        });
        return match;
      });
    }
    if (option.main) {
      products = products.filter((product)=>product.categories.item === option.main);
    }
    if (option.sub) {
      products = products.filter((product)=>product.categories.subItem === option.sub);
    }
    return products;
  }

  // 특정 상품 조회
  async getProductById(productId) {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async getProductByCategoryName(main, sub, page, show) {
    let allProducts = await this.productModel.findAll({}, {main, sub});
    console.log(typeof allProducts);
    if (page && show) {
      allProducts = this.pagenation(page, show);
    }
    return allProducts;
  }

  // 상품 업데이트
  async setProduct(productId, toUpdate) {
    let product = await this.productModel.findById(productId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error('등록된 상품이 없습니다. 다시 한 번 확인해 주세요.');
    }

    product = await this.productModel.update(
        product._id,
        toUpdate,
    );
    return product;
  }
  // 상품 삭제
  async deleteProduct(productId) {
    if (productId) {
      await this.productModel.delete({_id: productId});
    } else {
      await this.productModel.delete();
    }
  }
}

const productService = new ProductService(productModel);

export {productService};
