export function validateDate(dateStr: string) {
  const regex = /^\d{1,2}-\d{1,2}-\d{4}$/;

  if (!regex.test(dateStr)) {
    return false;
  }

  // Parse the date parts to integers
  const parts = dateStr.split("-");
  const day = parseInt(parts[1]);
  const month = parseInt(parts[0]);
  const year = parseInt(parts[2]);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const convertToMegabytes = (fileSize: number) => {
  return fileSize / 1024 / 1024;
};

export const validateBirthday = (date: Date | undefined) => {
  return date && date <= new Date() && date.toString() !== "Invalid Date";
};

export const calculateAge = (birthday: Date) => {
  const ageDifMs = Date.now() - (birthday as unknown as number);
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export function getFormattedDate(date: Date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
}
