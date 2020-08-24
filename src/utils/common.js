export function addZero(num) {
  return num < 10? '0'+num: num
}
export function String2Date(string) {
  // format: 'YYYY-MM-DD hh:mm:ss'
  let year        = string.substring(0,4);
  let month       = string.substring(5,7);
  let day         = string.substring(8,9);
  let hour        = string.substring(11,13);
  let minute      = string.substring(14,16);
  let second      = string.substring(17,19);
  return new Date(year, month, day, hour, minute, second)
}
export function Date2String(date) {
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