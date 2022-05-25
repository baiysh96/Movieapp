import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const PopularMovie = () => {
       const [popular,setPopular] = useState([])
       const [mediaType,setMediaType] = useState("movie")
       const [active,setActive] = useState(false)
        useEffect(() => {
            axios(`https://api.themoviedb.org/3/discover/${mediaType}?language=ru&api_key=042f11beb984d2ca7828fd2109953f49`)
                .then(({data}) => setPopular(data.results))
        },[mediaType])
        const formatDate = (date) => {
            const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
            const reversedDate = date.split('-').reverse()
            reversedDate[1] = month[reversedDate[1] - 1]
            return reversedDate.join(' ')
        }
        return (
            <div className="container">
              <div className="films-buttons">
                  <h2 className="films-title" >Что Популярно</h2>
                  <button onClick={() => setActive(!active) || setMediaType("movie")}  className={active?"selector active":"selector"} type="button">Онлайн</button>
                  <button onClick={() => setActive(!active) || setMediaType("tv")} className={!active?"selector active":"selector"} type="button">По ТВ</button>
              </div>
                <div className="scroller">
                    {
                        popular.map((item) => (
                            <div key={item.id} className="movie-card">
                                <div className="card-img">
                                    <Link key={item.id} to={`/movie/${item.id}`}>
                                        <img src={`/t/p/w440_and_h660_face${item.poster_path}`} alt=""/>
                                    </Link>
                                    <div className="consensus">
                                        <div className="info-rating">{item.vote_average}</div>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <Link to={`/movie/${item.id}`}>
                                        <h5 className="card-title">{item.title ||item.name}</h5>
                                    </Link>
                                    <span className="card-year">{item.release_date?formatDate(item.release_date)|| formatDate(item.last_air_date): ""}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );

};

export default PopularMovie;