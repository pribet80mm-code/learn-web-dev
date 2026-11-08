import React from 'react';

export default function TimeSlots({ slots, selectedTime, onTimeClick }) {
  return (
    <section className="time-block">
      <div className="block-header">
        <h2>Доступное время</h2>
      </div>
      <div className="time-grid">
        {slots.map(slot => {
          const isBusy = !slot.available; 
          const isSelected = selectedTime === slot.time;
          
          let className = "time-btn";
          if (isSelected) className += " active";
          if (isBusy) className += " disabled";

          return (
            <button
              key={slot.time} className={className} onClick={() => onTimeClick(slot.time)} disabled={isBusy}
            >
              {slot.time}
            </button>
          );
        })}
      </div>
    </section>
  );
}