import {Router} from 'express';
import is from '@sindresorhus/is';
import {loginRequired, adminRequired, upload} from '../middlewares';
import {productService} from '../services';

const productRouter = Router();
const filterQuery = (data) =>{
  const obj = data;
  Object.keys(obj).forEach((key)=>{
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
};

//  GET api/product(상품 목록, 페이지네이션)
productRouter.get('/', async (req, res, next) => {
  const {page, show, brand, sex, color, main, sub} = req.query;
  const option = filterQuery({brand, sex, color, main, sub});

  try {
    let product;
    // 로그인 여부에 관계없이 상품데이터 전달
    if (page && show) {
      // pagenation 적용
      product = await productService.getProducts(option, page, show);
    } else {
      // 미적용
      product = await productService.getProducts(option);
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

//  GET api/product/:id(상품 세부사항)
productRouter.get('/:productId', async (req, res, next) => {
  try {
    const {productId} = req.params;
    const product = await productService.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});


//  POST api/product (상품 등록)
productRouter.post(
    '/',
    loginRequired,
    adminRequired,
    upload.fields([{name: 'detailImage'}, {name: 'image'}]),
    async (req, res, next) => {
      console.log(req.body);
      try {
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
          throw new Error(
              'headers의 Content-Type을 application/json으로 설정해주세요',
          );
        }
        // product 스키마에 따라
        const {
          name,
          price,
          image,
          brand,
          sex,
          colors,
          sizes,
          categories,
          modelNumber,
          season,
          view,
          deliveryStart,
          deliveryMethod,
          detailImage,
        } = req.body;

        const productInfo = {
          name,
          price,
          image,
          brand,
          sex,
          colors,
          sizes,
          categories: {_id: categories},
          modelNumber,
          season,
          view,
          deliveryStart,
          deliveryMethod,
          detailImage,
        };
        // populate위한 전처리
        if (Array.isArray(colors)) {
          productInfo.colors = colors.filter((id)=>id).map((id)=>{
            return {color: {_id: id}};
          });
        } else {
          productInfo.colors = [{color: {_id: colors}}];
        }
        if (Array.isArray(sizes)) {
          productInfo.sizes = sizes.filter((id)=>id).map((id)=>{
            return {size: {_id: id}};
          });
        } else {
          productInfo.sizes = [{size: {_id: sizes}}];
        }
        console.log(productInfo);
        const product = await productService.addProduct(productInfo);
        res.status(201).json(product);
      } catch (error) {
        next(error);
      }
    });
//  PATCH api/product/:productId (상품 수정)
productRouter.patch(
    '/:productId',
    loginRequired,
    adminRequired,
    upload.fields([{name: 'detailImage'}, {name: 'image'}]),
    async (req, res, next) => {
      try {
        const {productId} = req.params;
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
          throw new Error(
              'headers의 Content-Type을 application/json으로 설정해주세요',
          );
        }

        // product 스키마에 따라
        const {
          name,
          price,
          image,
          brand,
          sex,
          colors,
          sizes,
          categories,
          modelNumber,
          season,
          view,
          deliveryStart,
          deliveryMethod,
          detailImage,
        } = req.body;

        const productInfo = {
          name,
          price,
          image,
          brand,
          sex,
          colors,
          sizes,
          categories: {_id: categories},
          modelNumber,
          season,
          view,
          deliveryStart,
          deliveryMethod,
          detailImage,

        };
        // populate위한 전처리
        if (Array.isArray(colors)) {
          productInfo.colors = colors.filter((id)=>id).map((id)=>{
            return {color: {_id: id}};
          });
        } else {
          productInfo.colors = [{color: {_id: colors}}];
        }
        if (Array.isArray(sizes)) {
          productInfo.sizes = sizes.filter((id)=>id).map((id)=>{
            return {size: {_id: id}};
          });
        } else {
          productInfo.sizes = [{size: {_id: sizes}}];
        }
        console.log(productInfo);
        const product = await productService.setProduct(productId, productInfo);
        res.status(200).json(product);
      } catch (error) {
        next(error);
      }
    });

//  DELETE api/product (전체 상품 삭제)
productRouter.delete(
    '/',
    loginRequired,
    adminRequired,
    async (req, res, next) => {
      try {
        await productService.deleteProduct();
        res.status(200).json('상품 삭제 완료');
      } catch (error) {
        next(error);
      }
    });

//  DELETE api/product/:productId (상품 삭제)
productRouter.delete(
    '/:productId',
    loginRequired,
    adminRequired,
    async (req, res, next) => {
      try {
        const {productId} = req.params;

        const product = await productService.getProductById(productId);
        if (!product) {
          throw new Error('삭제할 대상 상품이 없습니다.');
        }
        await productService.deleteProduct(productId);
        res.status(200).json('상품 삭제 완료');
      } catch (error) {
        next(error);
      }
    });
export default productRouter;
