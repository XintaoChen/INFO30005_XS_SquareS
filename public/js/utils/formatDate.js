export const dateFormat = (date) => {
  let unFormatDate = new Date(date);
  var formatedDate =
    unFormatDate.getFullYear() +
    "/" +
    (unFormatDate.getMonth() + 1) +
    "/" +
    unFormatDate.getDate();
  return formatedDate;
};

export const dayFormat = (date) => {
  let unFormatDate = new Date(date);
  var day = unFormatDate.getDay();
  var daylist = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday ",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var formatedDate = daylist[day];
  return formatedDate;
};

export const dateMonthFormat = (date) => {
  let unFormatDate = new Date(date);
  var month = unFormatDate.getMonth();
  var monthList = [
    "January",
    "February",
    "March",
    "April ",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var formatedDate = unFormatDate.getDate() + " " + monthList[month];
  return formatedDate;
};

export const dateTimeFormat = (date) => {
  let unFormatDate = new Date(date);
  var formatedDate =
    unFormatDate.getDate() +
    "-" +
    (unFormatDate.getMonth() + 1) +
    "-" +
    unFormatDate.getFullYear() +
    " " +
    unFormatDate.getHours() +
    ":" +
    unFormatDate.getMinutes() +
    ":" +
    unFormatDate.getSeconds();
  return formatedDate;
};

export const listOfWeek = (date) => {
  const time = date.getTime();
  const day = date.getDay();
  const oneDayTime = 24 * 60 * 60 * 1000;
  let startOfThisWeek = time - day * oneDayTime;
  let result = [];
  for (let i = 0; i < 7; i++) {
    result[i] = dateFormat(startOfThisWeek + i * oneDayTime);
  }
  return result;
};

export const listOfMonth = (date) => {
  const time = date.getTime();
  const day = date.getDate();
  const oneDayTime = 24 * 60 * 60 * 1000;
  let startOfThisWeek = time - day * oneDayTime;
  let result = [];
  for (let i = 0; i < day; i++) {
    result[i] = dateFormat(startOfThisWeek + (i + 1) * oneDayTime);
  }
  return result;
};
