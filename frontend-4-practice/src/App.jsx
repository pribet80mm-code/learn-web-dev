import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import { MONTHS_GENITIVE, DAYS_OF_WEEK } from './data/date';
import { fetchToday, fetchSlots } from './api';

export default function App() {
  const [today, setToday] = useState(null);
  const [slots, setSlots] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTodayLoading, setIsTodayLoading] = useState(true);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadToday() {
      try {
        setIsTodayLoading(true);
        setError(null);
        const data = await fetchToday();
        setToday(data);
        setCurrentMonth(data.month);
        setCurrentYear(data.year);
        setSelectedDay(data.day);
      } catch (err) {
        setError("Не удалось загрузить данные с сервера.");
      } finally {
        setIsTodayLoading(false);
      }
    }
    loadToday();
  }, []);

  useEffect(() => {
    if (!selectedDay || !currentMonth || !currentYear) return;
    async function loadSlots() {
      try {
        setIsSlotsLoading(true);
        setError(null);
        const data = await fetchSlots({ day: selectedDay, month: currentMonth, year: currentYear });
        if (data.date.day !== selectedDay) return;
        setSlots(data.slots);
      } catch (err) {
        setError("Не удалось загрузить время.");
      } finally {
        setIsSlotsLoading(false);
      }
    }
    loadSlots();
    setSelectedTime(null);
  }, [selectedDay, currentMonth, currentYear]);

  const handleDayClick = (day) => setSelectedDay(day);
  const handleTimeClick = (time) => setSelectedTime(time);

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else { setCurrentMonth(currentMonth - 1); }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else { setCurrentMonth(currentMonth + 1); }
    setSelectedDay(null);
  };

  const getSummaryText = () => {
    if (selectedDay && selectedTime) {
      const date = new Date(currentYear, currentMonth, selectedDay);
      return `${DAYS_OF_WEEK[date.getDay()]}, ${selectedDay} ${MONTHS_GENITIVE[currentMonth]} ${currentYear} • ${selectedTime}`;
    } else if (selectedDay) {
      return `${selectedDay} ${MONTHS_GENITIVE[currentMonth]} ${currentYear}`;
    }
    return "Выберите дату и время";
  };

  if (isTodayLoading) return <div style={{ padding: '50px', textAlign: 'center', color: 'white', fontSize: '24px' }}>Загрузка...</div>;
  if (error) return <div style={{ padding: '50px', textAlign: 'center', color: 'red', fontSize: '24px' }}>{error}</div>;

  return (
    <div className="page">
      <Header />
      <div className="steps-container">
        <div className="step"><div className="circle white"><span>1</span></div><span className="step-label">Мастер</span><div className="step-line"></div></div>
        <div className="step"><div className="circle white"><span>2</span></div><span className="step-label">Услуга</span><div className="step-line"></div></div>
        <div className="step"><div className="circle red"><span>3</span></div><span className="step-label active">Дата</span><div className="step-line"></div></div>
        <div className="step"><div className="circle gray"><span>4</span></div><span className="step-label dim">Контакт</span><div className="step-line"></div></div>
        <div className="step"><div className="circle gray"><span>5</span></div><span className="step-label dim">Подтверждение</span></div>
      </div>

      <main className="main-content">
        <div className="title-area">
          <h1>ВЫБЕРИТЕ ВРЕМЯ</h1>
          <p>Доступное время для каждого</p>
        </div>

        <div className="booking-layout">
          <Calendar 
            currentMonth={currentMonth} currentYear={currentYear} selectedDay={selectedDay}
            onDayClick={handleDayClick} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth}
            today={today ? new Date(today.year, today.month, today.day) : new Date()} 
          />
          {isSlotsLoading ? (
            <section className="time-block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h3>Загрузка слотов...</h3>
            </section>
          ) : (
            <TimeSlots slots={slots} selectedTime={selectedTime} onTimeClick={handleTimeClick} />
          )}
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