import React from 'react';
import "./Footer.css"
import {Link} from "react-router-dom";
import logoFooter from "../../assets/images/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";

const Footer = () => {
    return (
      <footer>
          <div className="container">
              <div className="row">
                  <div className="col-2">
                      <Link to="/"><img src={logoFooter} className="footer-logo" alt="movieImg" width="300" height="150" /></Link>
                  </div>
                  <div className="col-2">
                      <h2>ГЛАВНОЕ</h2>
                      <ul>
                        <li><a href="/"> О TMDB </a></li>
                        <li><a href="/"> Связаться с нами </a></li>
                        <li><a href="/">Форумы поддержки</a></li>
                        <li><a href={`https://www.themoviedb.org/documentation/api?language=ru`}> API</a></li>
                        <li><a href="/">Статус системы</a></li>
                      </ul>
                  </div>
                  <div className="col-2">
                      <h2>УЧАСТВУЙТЕ</h2>
                      <ul>
                          <li><a href="/"> Писание об участии</a></li>
                          <li><a href="/"> Добавить новый фильм </a></li>
                          <li><a href="/">Добавить новый сериал</a></li>
                      </ul>
                  </div>
                  <div className="col-2">
                      <h2>СООБЩЕСТВО</h2>
                      <ul>
                          <li><a href="/"> Руководства</a></li>
                          <li><a href="/"> Обсуждения </a></li>
                          <li><a href="/">Доска почёта</a></li>
                          <li><a href="https://www.twitter.com">Twitter </a></li>

                      </ul>
                  </div>
                  <div className="col-2">
                      <h2>О ПРАВЕ</h2>
                      <ul>
                          <li><a href="/">Условия использования </a></li>
                          <li><a href="/">API Правила использования </a></li>
                          <li><a href="/">Форумы поддержки</a></li>
                          <li><a href="/">Политика конфиденциальности</a></li>
                      </ul>
                  </div>
              </div>
          </div>
      </footer>
    );
};

export default Footer;