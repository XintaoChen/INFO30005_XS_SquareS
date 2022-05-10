/**
 * a function modules that send ajax request
 * return a promise
 */
function formatParams(data) {
  var arr = [];
  console.log(data);
  for (let name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }

  arr.push(("v=" + Math.random()).replace(".", ""));
  return arr.join("&");
}

export default function ajax(options) {
  options = options || {};
  options.baseUrl = options.baseUrl || "http://localhost:4000";
  options.method = (options.method || "GET").toUpperCase();
  options.dataType = options.dataType || "json";
  options.timeout = options.timeout || 30000;
  let params = formatParams(options.data);

  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXobject("Microsoft.XMLHTTP");
  }
  return new Promise((resolve) => {
    if (options.method == "GET") {
      xhr.open("get", options.baseUrl + options.path + "?" + params, true);
      xhr.send(null);
    } else if (options.method == "POST") {
      xhr.open("post", options.baseUrl + options.path, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(params);
    }

    setTimeout(function () {
      if (xhr.readySate != 4) {
        xhr.abort();
      }
    }, options.timeout);
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        let status = xhr.status;
        if ((status >= 200 && status < 300) || status == 304) {
          resolve(JSON.parse(xhr.responseText));
        }
      }
    };
  });
}
