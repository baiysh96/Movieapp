import React, {useState} from 'react';
import "./Header.css"
import logo from "../../assets/images/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
import {Link} from "react-router-dom";
const Header = () => {
    const [active,setActive] = useState(false)
    return (
        <div>
        <header>
            <div className="container">
                <div className="header__container">
                    <div className={active? 'burger show-menu':'burger' } onClick={() => setActive(!active)}>
                    <span />
                </div>

                  <Link to="/"><img src={logo} alt="movieImg" width="160" height="20" /></Link>
                    <nav className={active? 'menu show' : 'menu' } onClick={() => setActive(false)}>
                        <Link to="/films" >Фильмы</Link>
                        <Link to="/serials" >Сериалы</Link>
                    </nav>
                </div>
            </div>
        </header>
        </div>

);
};

export default Header;