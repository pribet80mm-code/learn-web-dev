import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/images/Group 1.svg" alt="STEEL Logo" className="logo-img" />
          </div>
          
          <div className="footer-col">
            <h3>КОНТАКТЫ</h3>
            <a href="#">+7-(980)-657-57-67</a>
            <a href="#">Пн-Вс: 10:00–22:00</a>
          </div>
          
          <div className="footer-col">
            <h3>РАЗДЕЛЫ</h3>
            <div className="links-row">
              <div className="links-inner">
                <a href="#">«Услуги»</a>
                <a href="#">«Мастера»</a>
              </div>
              <div className="links-inner">
                <a href="#">«Отзывы»</a>
                <a href="#">«Контакты»</a>
              </div>
            </div>
          </div>
          
          <div className="footer-col">
            <h3>МЫ В СЕТЯХ</h3>
            <a href="#">VK barber</a>
            <a href="#">Instagram barber</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span>© 2024 STEEL. Все права защищены</span>
          <a href="#">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}