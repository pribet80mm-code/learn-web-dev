// --- 1. ДАННЫЕ И КОНСТАНТЫ ---

// Названия месяцев в именительном падеже (для заголовка "Июнь 2025")
const MONTHS_NOMINATIVE = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

// Названия месяцев в родительном падеже (для итоговой строки "5 июня")
const MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня", 
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

// Дни недели (0 - Воскресенье, 1 - Понедельник...)
const DAYS_OF_WEEK = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

// Захардкодим "сегодняшнюю" дату для удобства проверки (1 июня 2025 года).
// В будущем здесь можно использовать просто new Date().
const TODAY = new Date(2025, 5, 1); 

// Список всего времени, которое доступно в барбершопе
const ALL_TIME_SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

// Время, которое уже занято (для имитации)
const BUSY_TIME_SLOTS = ["11:00", "13:00"];


// --- 2. СОСТОЯНИЕ СТРАНИЦЫ ---
// Это объект, который хранит то, что пользователь выбрал.
let state = {
  currentYear: 2025, // Текущий год на экране
  currentMonth: 5,   // Текущий месяц на экране (5 = Июнь, так как отсчет с 0)
  selectedDay: null, // Выбранное число (например, 5)
  selectedTime: null // Выбранное время (например, "12:00")
};


// --- 3. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

// Проверяет, можно ли выбрать конкретный день (не находится ли он в прошлом)
function isDateSelectable(day, month, year, today) {
  // Создаем дату из переданных параметров и обнуляем время
  const dateToCheck = new Date(year, month, day).setHours(0, 0, 0, 0);
  // Создаем "сегодняшнюю" дату и тоже обнуляем время
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).setHours(0, 0, 0, 0);
  
  // Если проверяемая дата больше или равна сегодняшней — её можно выбрать
  return dateToCheck >= todayDate;
}


// --- 4. ОТРИСОВКА (РЕНДЕР) ---

// Рисует сетку календаря
function renderCalendar() {
  const monthYearEl = document.getElementById('calendar-month-year');
  const daysGrid = document.getElementById('calendar-days');
  
  // Меняем заголовок (например, "Июнь 2025")
  monthYearEl.textContent = `${MONTHS_NOMINATIVE[state.currentMonth]} ${state.currentYear}`;
  
  // Очищаем контейнер перед новой отрисовкой
  daysGrid.innerHTML = '';
  
  // Узнаем, с какого дня недели начинается месяц (0 - Вс, 1 - Пн...)
  const firstDay = new Date(state.currentYear, state.currentMonth, 1).getDay(); 
  // Переводим в наш формат, где неделя начинается с Понедельника
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; 
  
  // Узнаем, сколько дней в этом месяце
  const daysInMonth = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();

  // Добавляем пустые ячейки, чтобы 1-е число встало на нужный день недели
  for (let i = 0; i < startOffset; i++) {
    daysGrid.innerHTML += `<div class="day-empty"></div>`;
  }

  // Генерируем кнопки для каждого дня
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelectable = isDateSelectable(day, state.currentMonth, state.currentYear, TODAY);
    const isSelected = (state.selectedDay === day) ? 'active' : '';
    const dimClass = isSelectable ? '' : 'dim';

    // Вставляем HTML кнопки. В атрибут data-day записываем число, чтобы потом его прочитать.
    daysGrid.innerHTML += `
      <button class="day-btn ${isSelected} ${dimClass}" data-day="${day}" ${!isSelectable ? 'disabled' : ''}>
        ${day}
      </button>
    `;
  }

  // После того как HTML вставился, находим все кнопки дней и вешаем на них клики
  const dayButtons = document.querySelectorAll('.day-btn');
  dayButtons.forEach(btn => {
    // Вешаем клик только на те дни, которые не заблокированы
    if (!btn.classList.contains('dim')) {
      btn.addEventListener('click', (event) => {
        // event.currentTarget — это сама кнопка, на которую кликнули
        const day = parseInt(event.currentTarget.dataset.day);
        onDayClick(day);
      });
    }
  });
}

// Рисует кнопки со временем
function renderTimeSlots() {
  const timeGrid = document.getElementById('time-slots');
  timeGrid.innerHTML = '';

  ALL_TIME_SLOTS.forEach(time => {
    const isBusy = BUSY_TIME_SLOTS.includes(time);
    const isSelected = (state.selectedTime === time) ? 'active' : '';
    const disabledClass = isBusy ? 'disabled' : '';

    timeGrid.innerHTML += `
      <button class="time-btn ${isSelected} ${disabledClass}" data-time="${time}" ${isBusy ? 'disabled' : ''}>
        ${time}
      </button>
    `;
  });

  // Вешаем клики на свободное время
  const timeButtons = document.querySelectorAll('.time-btn');
  timeButtons.forEach(btn => {
    if (!btn.classList.contains('disabled')) {
      btn.addEventListener('click', (event) => {
        const time = event.currentTarget.dataset.time;
        onTimeSlotClick(time);
      });
    }
  });
}

// Обновляет текст в нижней панели
function updateBottomBar() {
  const summaryText = document.getElementById('summary-text');
  
  if (state.selectedDay && state.selectedTime) {
    // Если выбрано и день, и время
    const date = new Date(state.currentYear, state.currentMonth, state.selectedDay);
    const dayOfWeek = DAYS_OF_WEEK[date.getDay()]; // Узнаем день недели
    const monthName = MONTHS_GENITIVE[state.currentMonth]; // Узнаем месяц в родительном падеже
    
    // Формат: Понедельник, 5 июня 2025 • 12:00
    summaryText.textContent = `${dayOfWeek}, ${state.selectedDay} ${monthName} ${state.currentYear} • ${state.selectedTime}`;
  } else if (state.selectedDay) {
    // Если выбран только день
    const monthName = MONTHS_GENITIVE[state.currentMonth];
    summaryText.textContent = `${state.selectedDay} ${monthName} ${state.currentYear}`;
  } else {
    // Если ничего не выбрано
    summaryText.textContent = "Выберите дату и время";
  }
}


// --- 5. ОБРАБОТЧИКИ (ЧТО ПРОИСХОДИТ ПРИ КЛИКЕ) ---

// Когда кликнули по дню
function onDayClick(day) {
  state.selectedDay = day;
  state.selectedTime = null; // ВАЖНО: при смене дня сбрасываем выбранное время!
  
  renderCalendar(); // Перерисовываем календарь (чтобы выделить новый день)
  renderTimeSlots(); // Перерисовываем время (чтобы сбросить выделение)
  updateBottomBar(); // Обновляем текст внизу
}

// Когда кликнули по времени
function onTimeSlotClick(time) {
  state.selectedTime = time;
  
  renderTimeSlots(); // Перерисовываем время, чтобы выделить выбранное
  updateBottomBar(); // Обновляем текст внизу
}


// --- 6. ЗАПУСК ПРИЛОЖЕНИЯ ---

// Ждем, пока страница полностью загрузится
document.addEventListener('DOMContentLoaded', () => {
  
  // Настраиваем кнопку "Предыдущий месяц"
  document.getElementById('prev-month').addEventListener('click', () => {
    state.currentMonth--;
    if (state.currentMonth < 0) {
      state.currentMonth = 11;
      state.currentYear--;
    }
    state.selectedDay = null; // При смене месяца сбрасываем выбор
    state.selectedTime = null;
    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
  });

  // Настраиваем кнопку "Следующий месяц"
  document.getElementById('next-month').addEventListener('click', () => {
    state.currentMonth++;
    if (state.currentMonth > 11) {
      state.currentMonth = 0;
      state.currentYear++;
    }
    state.selectedDay = null; // При смене месяца сбрасываем выбор
    state.selectedTime = null;
    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
  });

  // При первой загрузке страницы выберем 5-е число по умолчанию (как на твоем макете)
  state.selectedDay = 5; 
  
  // Запускаем первую отрисовку
  renderCalendar();
  renderTimeSlots();
  updateBottomBar();
});