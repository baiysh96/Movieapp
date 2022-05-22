import React, {useState} from 'react';
import Serials from "../Serials";
import Films from "../Films";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    let navigate = useNavigate();
    const [search,setSearch] = useState("")
    const handlerChange = (e) => setSearch((e.target.value))
    const handlerSearch = () => {
        navigate(`/search/${search}`)
        setSearch("")

    }
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
                           <input onChange={handlerChange} type="text" placeholder="Найти фильм, сериал, персону......"/>
                           <button type="submit" onClick={handlerSearch}>Search</button>

                       </label>
                   </div>
               </div>
           </div>
           <Serials />
           <Films />
       </div>
    );
};

export default HomePage;