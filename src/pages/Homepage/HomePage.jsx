import React from 'react';
import Serials from "../Serials";
import Films from "../Films";
import Footer from "../../components/Footer";
import PopularMovie from "../../components/PopulerMovie";

const HomePage = () => {
    return (
       <div>
           <div className="homePage-box" style={{ backgroundImage: `url(https://movie-db-01.netlify.app/static/media/search-background.d0714834dd45e4a87928.jpg)`,
               backgroundPosition: "center top",
               backgroundSize: "cover",
               backgroundRepeat: "no-repeat"}}>
                   <div className="container">
                   <div className="item">
                       <h1 className="home-title">Добро пожаловать.</h1>
                       <h3 className="home-subtitle">Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h3>
                       <label htmlFor="" className="form-control" placeholder="Найти фильм, сериал, персону......">
                           <input  type="text" placeholder="Найти фильм, сериал, персону......"/>
                           <input type="submit" value="Search"/>

                       </label>
                   </div>
               </div>
           </div>
           <PopularMovie />
           <Serials />
           <Films />
       <Footer />
       </div>
    );
};

export default HomePage;