# 쇼핑몰 웹 서비스 - Stop-Musinsa

<br />

## 1. 서비스 링크(Closed)

### https://stop-musinsa.herokuapp.com/

<br />

## 2. 서비스 소개

#### 제품 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현합니다. 
1. 회원가입, 로그인, 회원정보 수정 및 탈퇴 등 사용자 관련 CRUD를 할 수 있습니다.
2. 카테고리 관련 CRUD, 제품 관련 CRUD, 주문 관련 CRUD할 할 수 있습니다.
3. 장바구니 관련 기능을 프론트 단에서 수행할 수 있습니다.  
4. 관리자 페이지가 있습니다.

<br />

### 2-1. API 문서

### https://documenter.getpostman.com/view/20919503/VUjSG4bq

<br />

### 2-2. 페이지 별 화면

|  |  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------|
| ![1](https://user-images.githubusercontent.com/59943196/184525828-11c93a47-ae8f-4afb-a3cd-f0bf3923bd14.png) | ![2](https://user-images.githubusercontent.com/59943196/184525864-3002fdf6-d369-4562-bd55-08b19219b04c.png) |
|    메인 페이지                                |      회원가입 페이지                            |
| ![4](https://user-images.githubusercontent.com/59943196/184525962-771676e6-ebdb-4fe2-a70b-5102266a2261.png)                                        | ![3](https://user-images.githubusercontent.com/59943196/184525885-6d58a63f-98c0-4714-958c-a5a90564a144.png) |
|    로그인 페이지                              |     주문 페이지                         |

<br />


## 3. 기술 스택

![image](https://i.ibb.co/N34mXzy/image.png)

<br />

## 4. 인프라 구조

![image](https://i.ibb.co/9tGxmx0/image.png)<br />

<br />

## 5. 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

```bash
git clone <레포지토리 주소>
```


2. 클론한 디렉토리에서 backend 디렉토리로 들어가 아래 명령어를 통해 backend에서 필요한 module 설치

```bash
npm install
```


3. backend에서 필요한 `.env` 설정

```bash
MONGODB_URL=<몽고DB URL>
PORT=5000
JWT_SECERT_KEY=<랜덤 문자열>
```


4. express 앱을 실행

```bash
npm run start
```

<br>

## 6. 버전
### 1.0.0

<br>

## 7. FAQ
<details><summary>1. 현재 배포도 GCP를 이용한 것인가요?</summary>

  <p>
    현재 배포는 Heroku를 사용하였습니다.
  </p>

</details>
