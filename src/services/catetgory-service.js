import {categoryModel} from '../db/models/category-model';
import {colorModel} from '../db/models/color-model';
import {sizeModel} from '../db/models/size-model';
import {productModel} from '../db/models/product-model';

class CategoryService {
  constructor(categoryModel, colorModel, sizeModel, productModel) {
    this.categoryModel = categoryModel;
    this.colorModel = colorModel;
    this.sizeModel = sizeModel;
    this.productModel = productModel;
  }

  async createCategory(categoryName, subCategoryName) {
    const category = await this.categoryModel.findByName(categoryName, subCategoryName);
    // 중복 카테고리 등록 방지
    if (category) {
      throw new Error('이미 존재하는 분류입니다.');
    }
    return await this.categoryModel.create(categoryName, subCategoryName);
  }

  async createColor(colorName) {
    const color = await this.colorModel.findByName(colorName);
    if (color) {
      throw new Error('이미 존재하는 색상입니다.');
    }
    return await this.colorModel.create(colorName);
  }

  async createSize(sizeName) {
    const size = await this.sizeModel.findByName(sizeName);
    if (size) {
      throw new Error('이미 존재하는 사이즈입니다.');
    }
    return await this.sizeModel.create(sizeName);
  }

  // updateData:{item:String :subItem?:String}
  async updateCategory(categoryName, updateData) {
    const category = this.categoryModel.findByName(categoryName);

    if (!category) {
      throw new Error('수정 할 대상 카테고리가 없습니다.');
    }
    return await this.categoryModel.updateByCategoryName(categoryName, false, updateData);
  }

  async updateSubCategory(categoryId, updateData) {
    const category = await this.categoryModel.findById(categoryId);

    if (!category) {
      throw new Error('수정 할 대상 카테고리가 없습니다.');
    }
    // 다소 unsafe함
    return await this.categoryModel.updateByCategoryName(category.item, category.subItem, updateData);
  }
  async updateColor(colorId, updateName) {
    const color = await this.colorModel.findById(colorId);
    if (!color) {
      throw new Error('수정할 대상 색상이 없습니다.');
    }
    return await this.colorModel.update(colorId, updateName);
  }
  async updateSize(sizeId, updateName) {
    const size = await this.sizeModel.findById(sizeId);
    if (!size) {
      throw new Error('수정할 대상 사이즈가 없습니다.');
    }
    return await this.sizeModel.update(sizeId, updateName);
  }
  // replaceCategoryIdArray: Array<{productId:Schema.Types.ObjectId, replaceCategoryId: Schema.Types.ObjectId}>
  async deleteCategory(categoryId, replaceCategoryIdArray) {
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new Error('삭제할 대상 카테고리가 없습니다.');
    }
    await Promise.all(
        replaceCategoryIdArray.map(async ({productId, replaceCategoryId})=>{
          const replaceProduct = await this.productModel.findById(productId);
          const replaceCategory = await this.categoryModel.findById(categoryId);
          if (!replaceProduct || !replaceCategory) {
            throw new Error('수정할 대상을 다시 확인해 주세요.');
          }
        }));

    return await this.categoryModel.deleteCategory(categoryId, replaceCategoryIdArray);
  }

  async deleteColor(colorId) {
    const color = await this.colorModel.findById(colorId);
    if (!color) {
      throw new Error('삭제할 대상 색상이 없습니다.');
    }
    return await this.colorModel.delete(colorId);
  }

  async deleteSize(sizeId) {
    const size = await this.sizeModel.findById(sizeId);
    if (!size) {
      throw new Error('삭제할 대상 사이즈가 없습니다.');
    }
    return await this.sizeModel.delete(sizeId);
  }

  async getCategories(categoryId) {
    let categories;
    if (!categoryId) {
      categories = await this.categoryModel.findAll();
    } else {
      categories = await this.categoryModel.findById(categoryId);
    }
    return categories;
  }

  async getCategoryByName(categoryName, subCategoryName) {
    const category = await this.categoryModel.findByName(categoryName, subCategoryName);
    return category;
  }

  async getColors(colorId) {
    let colors;
    if (!colorId) {
      colors = await this.colorModel.findAll();
    } else {
      colors = await this.colorModel.findById(colorId);
    }
    return colors;
  }

  async getColorByName(colorName) {
    const category = await this.colorModel.findByName(colorName);
    return category;
  }

  async getSizes(sizeId) {
    let sizes;
    if (!sizeId) {
      sizes = await this.sizeModel.findAll();
    } else {
      sizes = await this.sizeModel.findById(sizeId);
    }
    return sizes;
  }

  async getSizeByName(sizeName) {
    const size = await this.sizeModel.findByName(sizeName);
    return size;
  }
}

const categoryService = new CategoryService(categoryModel, colorModel, sizeModel, productModel);

export {categoryService};
