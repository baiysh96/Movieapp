import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const PopularMovie = () => {
       const [popular,setPopular] = useState([])
        useEffect(() => {
            axios("https://api.themoviedb.org/3/discover/movie?&language=ru&api_key=042f11beb984d2ca7828fd2109953f49")
                .then(({data}) => setPopular(data.results))
        },[])
    console.log(popular)
        const formatDate = (date) => {
            const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
            const reversedDate = date.split('-').reverse()
            reversedDate[1] = month[reversedDate[1] - 1]
            console.log(reversedDate)
            return reversedDate.join(' ')
        }
        return (
            <div className="container">
                <h2 style={{marginTop:"20px"}}>Что Популярно</h2>
                <div className="scroller">
                    {
                        popular.map((item) => (
                            <div className="movie-card">
                                <div className="card-img">
                                    <Link key={item.id} to={`/movie/${item.id}`}>
                                        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}`} alt=""/>
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

export default PopularMovie;