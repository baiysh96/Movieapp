import React, {useState  } from 'react';
import axios from 'axios'
import Serials from "../Serials";
import Films from "../Films";
import { useNavigate } from "react-router-dom";
import {BASE_API, IMAGE_BASE_API} from "../../constants/Constants";
const API_KEY = process.env.REACT_APP_APIKEY

const HomePage = () => {
    let navigate = useNavigate();
    const [search,setSearch] = useState("")
    const handlerChange = (e) => setSearch((e.target.value))
    const handlerSearch = async () => {
       const {data} = await axios(`${BASE_API}search/${search}/credits?language=ru&api_key=${API_KEY}`)
        console.log(data)
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