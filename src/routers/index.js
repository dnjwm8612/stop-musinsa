// 이 routers 폴더에서 만들어진 모듈들을 깔끔하게 묶어주는 역할을 index.js가 함.
// 나중에 import 할 때의 코드도 짧아지는 효과가 있음.
import fs from 'fs';
import path from 'path';
import express from 'express';

export * from './views-router';

const apiRouter = express.Router();
const indexJs = path.basename(__filename);

fs.readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== indexJs) && (file.split('-')[0] !== 'views') && (file.slice(-9) === 'router.js'))
    .forEach((routeFile) => apiRouter.use(`/${routeFile.split('-')[0]}`, require(`./${routeFile}`).default));

export {apiRouter};

