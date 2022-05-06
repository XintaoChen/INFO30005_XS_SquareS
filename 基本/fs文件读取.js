const fs = require("fs");

// 普通形式

// fs.readFile("./resource/content.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// promise 形式

let p = new Promise((resolve, reject) => {
  fs.readFile("./resourcse/content.txt", (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
}).then(
  (value) => {
    console.log(value.toString());
  },
  (reason) => {
    console.log(reason);
  }
);
