import React, {useState  } from 'react';
import Serials from "../Serials";
import Films from "../Films";
import { useNavigate } from "react-router-dom";
import {IMAGE_BASE_API} from "../../constants/Constants";;

const HomePage = () => {
    let navigate = useNavigate();
    const [search,setSearch] = useState("")
    const handlerChange = (e) => setSearch((e.target.value))
    const handlerSearch = (e) => {
        if(e.key === "Enter") {
            navigate(`/search/${search}`)
            setSearch("")
        }
    }


    return (
       <div>
           <div className="homePage-box" style={{
               backgroundImage: `url(${IMAGE_BASE_API}w1920_and_h600_multi_faces/kf456ZqeC45XTvo6W9pW5clYKfQ.jpg)`,
               backgroundPosition: "center top",
               backgroundColor:" rgba(3 37 65 0.8) , rgba(-3 37 65  0)",
               backgroundSize: "cover",
               backgroundRepeat: "no-repeat"}}>
                   <div className="container">
                   <div className="item">
                       <h1 className="home-title">Добро пожаловать.</h1>
                       <h3 className="home-subtitle">Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h3>
                       <label htmlFor="" className="form-control" placeholder="Найти фильм, сериал, персону......">
                           <input onKeyPress ={handlerSearch} onChange={handlerChange} type="text" placeholder="Найти фильм, сериал, персону......"/>
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