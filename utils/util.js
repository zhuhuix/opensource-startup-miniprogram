/**
 * @desc: 格式化时间
 * @return: eg: '2018/04/09 21:31:00'
 * @param {Date对象} date
 */
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

/**
 * @desc: 格式化数字
 * @return: n > 10 [eg: 12] => 12 | n < 10 [eg: 3] => '03'
 * @param {*} n
 */
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

//时间戳转换成日期时间
function js_date_time(unixtime) {
  var date = new Date(unixtime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
  return y + "-" + m + "-" + d + " " + h + ":" + minute;
}

function isNumberOr_Letter(s,min,max) {
  var regu = "^[0-9a-zA-Z]{"+min+","+max+"}$";
  var re = new RegExp(regu);
  if (re.test(s)) {
    return true;
  } else {
    return false;
  }
}

/*
Tencent  Face-2-Face Translator.
*/
function recordTime(date) {

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()

  return [year,month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

module.exports = {
  formatTime: formatTime,
  js_date_time: js_date_time,
  isNumberOr_Letter:isNumberOr_Letter,
  recordTime: recordTime,
};
