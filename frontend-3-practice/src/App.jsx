import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import { MONTHS_GENITIVE, DAYS_OF_WEEK } from './data/date';

const TODAY = new Date(2025, 5, 1);
const ALL_TIME_SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const BUSY_TIME_SLOTS = ["11:00", "13:00"];

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDay, setSelectedDay] = useState(5);
  const [selectedTime, setSelectedTime] = useState(null);

  const slots = ALL_TIME_SLOTS.map(time => ({
    time: time,
    isBusy: BUSY_TIME_SLOTS.includes(time)
  }));

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedTime(null);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const getSummaryText = () => {
    if (selectedDay && selectedTime) {
      const date = new Date(currentYear, currentMonth, selectedDay);
      const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
      const monthName = MONTHS_GENITIVE[currentMonth];
      return `${dayOfWeek}, ${selectedDay} ${monthName} ${currentYear} • ${selectedTime}`;
    } else if (selectedDay) {
      const monthName = MONTHS_GENITIVE[currentMonth];
      return `${selectedDay} ${monthName} ${currentYear}`;
    }
    return "Выберите дату и время";
  };

  return (
    <div className="page">
      <Header />

      <div className="steps-container">
        <div className="step">
          <div className="circle white"><span>1</span></div>
          <span className="step-label">Мастер</span>
          <div className="step-line"></div>
        </div>
        <div className="step">
          <div className="circle white"><span>2</span></div>
          <span className="step-label">Услуга</span>
          <div className="step-line"></div>
        </div>
        <div className="step">
          <div className="circle red"><span>3</span></div>
          <span className="step-label active">Дата</span>
          <div className="step-line"></div>
        </div>
        <div className="step">
          <div className="circle gray"><span>4</span></div>
          <span className="step-label dim">Контакт</span>
          <div className="step-line"></div>
        </div>
        <div className="step">
          <div className="circle gray"><span>5</span></div>
          <span className="step-label dim">Подтверждение</span>
        </div>
      </div>

      <main className="main-content">
        <div className="title-area">
          <h1>ВЫБЕРИТЕ ВРЕМЯ</h1>
          <p>Доступное время для каждого</p>
        </div>

        <div className="booking-layout">
          <Calendar 
            currentMonth={currentMonth}
            currentYear={currentYear}
            selectedDay={selectedDay}
            onDayClick={handleDayClick}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            today={TODAY}
          />

          <TimeSlots 
            slots={slots}
            selectedTime={selectedTime}
            onTimeClick={handleTimeClick}
          />
        </div>

        <div className="action-area">
          <div className="summary">
            <span className="summary-label">Выбрано:</span>
            <span className="summary-value">{getSummaryText()}</span>
          </div>
          <button className="next-btn">Далее</button>
        </div>
      </main>

      <Footer />
    </div>
  );
}