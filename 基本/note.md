# basic

## 异步操作

- fs 文件操作
  ```js
  require("fs").readFile("./index.html", (err, data) => {});
  ```
- 数据库操作
- AJAX 请求
  ```js
  $.get("/server", (data) => {});
  ```
- 定时器
  ```js
  setTimeout(() => {}, 1000);
  ```

## 为什么使用promise

1. 支持链式调用，解决了回调地狱问题
2. 指定回调的方式更为灵活

