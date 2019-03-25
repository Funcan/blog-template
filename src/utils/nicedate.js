// Turn a javascript Date object into a string like "Tuesday 19 March 15:04".
// Return an empty string for a null date.

const niceDate = function(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let ret;
  if (date) {
    ret = days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0");
  } else {
    ret = "";
  }

  return ret
}

export default niceDate;
