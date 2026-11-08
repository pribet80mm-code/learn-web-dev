export const MONTHS_NOMINATIVE = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

export const MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня", 
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

export const DAYS_OF_WEEK = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

export function isDateSelectable(day, month, year, today) {
  const dateToCheck = new Date(year, month, day).setHours(0, 0, 0, 0);
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).setHours(0, 0, 0, 0);
  return dateToCheck >= todayDate;
}