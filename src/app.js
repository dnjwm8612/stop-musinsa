import cors from 'cors';
import express from 'express';
import {viewsRouter, apiRouter} from './routers';
import {errorHandler} from './middlewares';
import bodyParser from 'body-parser';
import passport from 'passport';
import passsportRequired from './passport';

const app = express();
passsportRequired();

app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
// CORS 에러 방지
app.use(cors());
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({extended: false}));

// passport 초기화
app.use(passport.initialize());

// html, css, js 라우팅
app.use(viewsRouter);


// static file 경로 추가
app.use('/assets', express.static(__dirname + '/views/assets'));
app.use('/styles', express.static(__dirname + '/views/styles'));
app.use('/components', express.static(__dirname + '/views/components'));
app.use('/js', express.static(__dirname + '/views/js'));
app.use('/uploads', express.static(__dirname + '/views/uploads'));
// static files for components
app.use('/src', express.static(__dirname));


// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.
app.use('/api', apiRouter);

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler);

export {app};
