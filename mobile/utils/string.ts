export function validateDate(dateStr: string) {
  const regex = /^\d{1,2}-\d{1,2}-\d{4}$/;

  if (!regex.test(dateStr)) {
    return false;
  }

  // Parse the date parts to integers
  var parts = dateStr.split("-");
  var day = parseInt(parts[1]);
  var month = parseInt(parts[0]);
  var year = parseInt(parts[2]);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12)
    return false;

  var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}