import {Router} from 'express';
import {loginRequired, adminRequired} from '../middlewares';
import {categoryService} from '../services';

const categorytRouter = Router();

categorytRouter.get('/', async (req, res, next)=>{
  try {
    const categories = await categoryService.getCategories();

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

categorytRouter.get('/color', async (req, res, next)=>{
  try {
    const colors = await categoryService.getColors();

    res.status(200).json(colors);
  } catch (error) {
    next(error);
  }
});

categorytRouter.get('/size', async (req, res, next)=>{
  try {
    const sizes = await categoryService.getSizes();
    res.status(200).json(sizes);
  } catch (error) {
    next(error);
  }
});

categorytRouter.post(
    '/',
    loginRequired,
    adminRequired,
    async (req, res, next)=>{
      try {
        const {item, subItem} = req.body;
        const category = await categoryService.getCategoryByName(item, subItem);
        if (category) {
          throw new Error('이미 해당 카테고리가 존재합니다.');
        }
        const newCategory = await categoryService.createCategory(item, subItem);
        res.status(201).json(newCategory);
      } catch (error) {
        next(error);
      }
    });

categorytRouter.post(
    '/color',
    loginRequired,
    adminRequired,
    async (req, res, next)=>{
      try {
        const {colorName} = req.body;
        const color = await categoryService.getColorByName(colorName);
        if (color) {
          throw new Error('이미 해당 컬러가 존재합니다.');
        }
        const newColor = await categoryService.createColor(colorName);
        res.status(201).json(newColor);
      } catch (error) {
        next(error);
      }
    });

categorytRouter.post(
    '/size',
    loginRequired,
    adminRequired,
    async (req, res, next)=>{
      try {
        const {sizeName} = req.body;
        const size = await categoryService.getSizeByName(sizeName);
        if (size) {
          throw new Error('이미 해당 사이즈가 존재합니다.');
        }
        const newSize = await categoryService.createSize(sizeName);
        res.status(201).json(newSize);
      } catch (error) {
        next(error);
      }
    });

categorytRouter.patch(
    '/main/:categoryName',
    loginRequired,
    adminRequired,
    async (req, res, next)=>{
      try {
        const {categoryName} = req.params;
        const {newCategory} = req.body;

        if (!newCategory) {
          throw new Error('메인 카테고리를 지정해주세요.');
        }
        const category = await categoryService.getCategoryByName(categoryName);
        if (!category.length) {
          throw new Error('수정할 대상 카테고리가 없습니다.');
        }
        const updatedCategory = await categoryService.updateCategory(categoryName, {item: newCategory});
        res.status(200).json(updatedCategory);
      } catch (error) {
        next(error);
      }
    });

categorytRouter.patch(
    '/sub',
    loginRequired,
    adminRequired,
    async (req, res, next)=>{
      try {
        const {categoryName, subCategoryName} = req.query;
        const {newSubCategory} = req.body;

        const category = await categoryService.getCategoryByName(categoryName, subCategoryName);

        if (!category) {
          throw new Error('수정할 대상 카테고리가 없습니다.');
        }
        const updatedCategory = await categoryService.updateSubCategory(category._id, {subItem: newSubCategory});
        res.status(200).json(updatedCategory);
      } catch (error) {
        next(error);
      }
    });

categorytRouter.patch(
    '/color/:colorId',
    loginRequired,
    adminRequired,
    async (req, res, next)=>{
      try {
        const {colorId} = req.params;
        const {colorName} = req.body;
        const color = await categoryService.getColors(colorId);
        if (!color) {
          throw new Error('수정할 대상 색상이 없습니다.');
        }
        const updatedColor = await categoryService.updateColor(colorId, colorName);
        res.status(200).json(updatedColor);
      } catch (error) {
        next(error);
      }
    });

categorytRouter.patch(
    '/size/:sizeId',
    loginRequired,
    adminRequired,
    async (req, res, next)=>{
      try {
        const {sizeId} = req.params;
        const {sizeName} = req.body;
        const size = await categoryService.getSizes(sizeId);
        if (!size) {
          throw new Error('수정할 대상 사이즈가 없습니다.');
        }
        const updatedSize = await categoryService.updateSize(sizeId, sizeName);
        res.status(200).json(updatedSize);
      } catch (error) {
        next(error);
      }
    });

categorytRouter.delete(
    '/:categoryId',
    loginRequired,
    adminRequired,
    async (req, res, next)=>{
      try {
        const {categoryId} = req.params;
        const {replaceCategoryIdArray} = req.body;

        const category = await categoryService.getCategories(categoryId);
        if (!category) {
          throw new Error('삭제할 대상 카테고리가 없습니다.');
        }
        await categoryService.deleteCategory(categoryId, replaceCategoryIdArray);

        res.status(200).json({});
      } catch (error) {
        next(error);
      }
    });

categorytRouter.delete(
    '/color/:colorId',
    loginRequired,
    adminRequired,
    async (req, res, next)=>{
      try {
        const {colorId} = req.params;

        const color = await categoryService.getColors(colorId);
        if (!color) {
          throw new Error('삭제할 대상 색상이 없습니다.');
        }

        await categoryService.deleteColor(colorId);

        res.status(200).json({});
      } catch (error) {
        next(error);
      }
    });

categorytRouter.delete(
    '/size/:sizeId',
    loginRequired,
    adminRequired,
    async (req, res, next)=>{
      try {
        const {sizeId} = req.params;
        const size = await categoryService.getSizes(sizeId);
        if (!size) {
          throw new Error('삭제할 대상 사이즈가 없습니다.');
        }
        await categoryService.deleteSize(sizeId);

        res.status(200).json({});
      } catch (error) {
        next(error);
      }
    });
export default categorytRouter;
