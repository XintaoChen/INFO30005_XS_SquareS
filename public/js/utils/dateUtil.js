export const dateFormat =(date)=>{
  let unFormatDate = new Date(date)
  var day = unFormatDate.getDay();
  var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
  var formatedDate = unFormatDate.getDate()+'/'+(unFormatDate.getMonth()+1)+'/'+unFormatDate.getFullYear()+', '+daylist[day];
  return formatedDate;
}

export const dateTimeFormat = (date) => {
  let unFormatDate = new Date(date)
  var formatedDate = unFormatDate.getDate()+'-'+(unFormatDate.getMonth()+1)+'-'+unFormatDate.getFullYear()+' '+unFormatDate.getHours()+':'+unFormatDate.getMinutes()+':'+unFormatDate.getSeconds();
  return formatedDate;
}
  
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date+' '+time;