export const addZero = (num) => {
  return num < 10? '0'+num: num
}
export const String2Date = (string) => {
  // format: 'YYYY-MM-DD hh:mm:ss'
  if (string.length > 10) {
    let year        = string.substring(0,4);
    let month       = string.substring(5,7);
    let day         = string.substring(8,10);
    let hour        = string.substring(11,13);
    let minute      = string.substring(14,16);
    let second      = string.substring(17,19);
    return new Date(year, month-1, day, hour, minute, second)
  }
  else {
    let year        = string.substring(0,4);
    let month       = string.substring(5,7);
    let day         = string.substring(8,10);
    return new Date(year, month-1, day)
  }
}
export const Date2String = (date) => {
  // format: 'YYYY-MM-DD hh:mm:ss'
  let dt = new Date(date)
  let year        = dt.getFullYear();
  let month       = dt.getMonth();
  let day         = dt.getDate();
  let hour        = dt.getHours();
  let minute      = dt.getMinutes();
  let second      = dt.getSeconds();
  return year +'-'+ addZero(month+1) +'-'+ addZero(day) +' '+ addZero(hour) +':'+ addZero(minute) +':'+ addZero(second)
}

export const convertDate = (time) => {
  let new_time = new Date(time)
  let yyyy = new_time.getFullYear();
  let MM = addZero(new_time.getMonth() + 1);
  let dd = addZero(new_time.getDate())
  return yyyy + "-" + MM + "-" + dd
}

//抓取今天和7天前時間
export const getLast7Days = () => {
  let fullDate = new Date();
  let today = convertDate(fullDate);
  let last_week = fullDate.setDate(fullDate.getDate() - 6)
  let last = convertDate(last_week);
  return [last,today];
}