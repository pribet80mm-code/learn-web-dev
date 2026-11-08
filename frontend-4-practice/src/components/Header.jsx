import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/images/Group 1.svg" alt="STEEL Logo" className="logo-img" />
      </div>
      <nav className="nav-links">
        <a href="#">Услуги</a>
        <a href="#">Галерея</a>
        <a href="#">Команда</a>
        <a href="#">Отзывы</a>
        <a href="#">Контакты</a>
      </nav>
    </header>
  );
}