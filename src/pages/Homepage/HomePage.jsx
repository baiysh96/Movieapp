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
           <div className="homePage-box" style={{
               backgroundImage: `url(/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/eshe8IkjRbE9maeFFLOBnGU2qTl.jpg)`,
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