import React from 'react';
import { MONTHS_NOMINATIVE, isDateSelectable } from '../data/date';

export default function Calendar({ 
  currentMonth, 
  currentYear, 
  selectedDay, 
  onDayClick, 
  onPrevMonth, 
  onNextMonth,
  today
}) {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; 
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const emptyCells = Array.from({ length: startOffset });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <section className="calendar-block">
      <div className="block-header">
        <h2>{MONTHS_NOMINATIVE[currentMonth]} {currentYear}</h2>
        <div className="calendar-arrows">
          <button className="arrow-btn" onClick={onPrevMonth}>&lt;</button>
          <button className="arrow-btn" onClick={onNextMonth}>&gt;</button>
        </div>
      </div>
      
      <div className="weekdays">
        <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
      </div>
      
      <div className="days-grid">
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="day-empty"></div>
        ))}
        
        {days.map(day => {
          const isSelectable = isDateSelectable(day, currentMonth, currentYear, today);
          const isSelected = selectedDay === day;
          let className = "day-btn";
          if (isSelected) className += " active";
          if (!isSelectable) className += " dim";

          return (
            <button 
              key={day}
              className={className}
              onClick={() => onDayClick(day)}
              disabled={!isSelectable}
            >
              {day}
            </button>
          );
        })}
      </div>
    </section>
  );
}