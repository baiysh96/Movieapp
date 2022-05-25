import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import PopularMovie from "../../components/PopulerMovie";

const Films = () => {
    const [time,setTime] = useState("day")
    const [trends,setTrends] = useState([])
    const [active,setActive] = useState(false)
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/trending/movie/${time}?language=ru&api_key=042f11beb984d2ca7828fd2109953f49`)
            .then(({data}) => setTrends(data.results))
    },[time])
    const formatDate = (date) => {
        const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
        const reversedDate = date.split('-').reverse()
        reversedDate[1] = month[reversedDate[1] - 1]
        return reversedDate.join(' ')
    }
    return (
    <div className="container">
    <PopularMovie />
       <div className="films-buttons">
           <h2 className="films-title">Тренды</h2>
           <button onClick={() => setActive(!active) || setTime("day")}  className={active?"selector active":"selector"} type="button">Сегодня</button>
           <button onClick={() => setActive(!active) || setTime("week")} className={!active?"selector active":"selector"} type="button">На этой неделе</button>
       </div>
        <div className="scroller">
            {
                trends.map((item) => (
                    <div  key={item.id} className="movie-card">
                        <div className="card-img">
                            <Link  to={`/movie/${item.id}`}>
                                <img src={`/t/p/w440_and_h660_face${item.poster_path}`} alt=""/>
                            </Link>
                            <div className="consensus">
                                <div className="info-rating">{item.vote_average}</div>
                            </div>
                        </div>
                        <div className="card-content">
                            <Link to={`/movie/${item.id}`}>
                                <h5 className="card-title">{item.title}</h5>
                            </Link>
                            <span className="card-year">{formatDate(item.release_date)}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    );
};

export default Films;



