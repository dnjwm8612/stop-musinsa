import {model} from 'mongoose';
import {CategorySchema} from '../schemas/category-schema';
import {productModel} from '..';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  async create(category, subCategory) {
    const categoryInfo = {item: category, subItem: subCategory};
    const newCategory = await Category.create(categoryInfo);
    return newCategory;
  }

  async updateByCategoryName(categoryName, subCategoryName, updateData) {
    const option = {returnOriginal: false};
    const filter = {item: categoryName, subItem: subCategoryName};

    let updatedCategory;
    if (subCategoryName) {
      // 서브 카테고리 수정
      updatedCategory = await Category.findOneAndUpdate(filter, updateData, option);
    } else {
      // 메인 카테고리 해당 목록 전원 수정
      updatedCategory = await Category.updateMany(filter, updateData, option);
    }
    console.log(updatedCategory);
    return updatedCategory;
  }
  // replaceCategoryIdArray: Array<{productId:Schema.Types.ObjectId, replaceCategoryId: Schema.Types.ObjectId}>
  async deleteCategory(categoryId, replaceCategoryIdArray) {
    await Promise.all(replaceCategoryIdArray.map(async ({productId, replaceCategoryId}) => {
      await productModel.update(productId, {
        categories: replaceCategoryId,
      });
    }));
    await Category.deleteOne({_id: categoryId});
  }

  async findAll() {
    const category = await Category.find().sort({createdAt: -1});
    return category;
  }

  async findById(categoryId) {
    const category = await Category.findOne({_id: categoryId});
    return category;
  }

  async findByName(categoryName, subCategoryName) {
    let category;
    if (subCategoryName) {
      category = await Category.findOne({item: categoryName, subItem: subCategoryName});
    } else {
      category = await Category.find({item: categoryName}).sort({createdAt: -1});
    }
    return category;
  }
}
const categoryModel = new CategoryModel();
export {categoryModel};
