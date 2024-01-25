# Muku
![image](https://i.imgur.com/rgVDQHb.jpg)
> 此專案為日系服飾的電子商務平台，包含前台與後台，顧客可在前台觀看商品，並將商品加入購物車、填寫資料並送出訂單，管理者可在後台新增、編輯和刪除商品，也可新增、編輯、刪除優惠券，並可觀看訂單列表。

- [線上觀看連結](https://linyawun.github.io/Muku/)

## 功能 
### 後台(管理者)
- [x] 登入
- [x] 登出
- [x] 顯示商品列表
- [x] 依類別篩選商品
- [x] 新增、編輯、刪除商品
- [x] 顯示優惠券列表
- [x] 新增、編輯、刪除優惠券
- [x] 顯示訂單列表
- [x] 編輯、刪除訂單
### 前台
- [x] 顯示商品列表
- [x] 依類別篩選商品
- [x] 商品加入購物車
- [x] 顯示購物車列表
- [x] 編輯購物車商品數量、刪除購物車
- [x] 購物車使用優惠券
- [x] 填寫顧客資訊，表單驗證
- [x] 送出訂單

## TODOs
- [ ] 改善效能
- [ ] 多國語系(i18n)
- [x] 加入 Google Analytics
- [ ] 加入測試
- [ ] 改用 react query fetch API
- [ ] 以 TypeScript 改寫
- [ ] (Optional) migrate to Next.js

## 畫面
- 前台-商品列表
![image](https://i.imgur.com/vZkSfiKg.jpg)

- 前台-購物車
![image](https://i.imgur.com/S1Nsgmb.jpg)

- 後台-編輯商品
![image](https://i.imgur.com/mDxq0ph.jpg)

- 後台-建立優惠券
![image](https://i.imgur.com/A6jOOe8.png)

## 安裝
以下將會引導你如何安裝此專案到你的電腦上。
> 請先安裝 [Node.js](https://nodejs.org/zh-tw/download)，Node.js 版本建議為：`18.12.0` 以上
### 取得專案
```bash
git clone https://github.com/linyawun/Muku.git
```
### 移動到專案內
```bash
cd Muku
```
### 安裝套件
```bash
npm install
```
### 運行專案
```bash
npm start
```
### 開啟專案
在瀏覽器網址列輸入以下即可看到畫面
```
http://localhost:8000/
```

## 資料夾說明
- public - 靜態檔案放置處
- src
  - assets - 圖片放置處
  - components - React 元件放置處
  - pages - 頁面元件放置處
  - helpers - 共用函式放置處
  - slice - redux slice 放置處
  - store - 共用資料放置處
  - stylesheets - scss 樣式放置處
  
## 專案技術
- Node.js v18.12.0
- React v18.2.0
- React-router-dom v6.9.0
- React-Redux v8.0.5
- React-Hook-Form v7.43.8
- React-scroll v1.8.9
- React-widgets v5.8.4
- Axios v1.3.4
- Bootstrap v5.2.3
- Bootstrap-icons v1.10.3
- Swiper v9.2.2

## 聯絡作者
你可以透過以下方式與我聯絡
- email: linyawun031@gmail.com
