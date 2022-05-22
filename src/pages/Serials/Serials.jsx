import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Serials = () => {
    const [popular,setPopular] = useState([])
    const [mediaType,setMediaType] = useState("movie")
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/trending/${mediaType}?&language=ru&api_key=042f11beb984d2ca7828fd2109953f49`)
            .then(({data}) => setPopular(data.results))
    },[popular,mediaType])
    console.log(popular)
    const formatDate = (date) => {
        const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
        const reversedDate = date.split('-').reverse()
        reversedDate[1] = month[reversedDate[1] - 1]
        return reversedDate.join(' ')
    }
    return (
     <div className="container">
         <div className="films-buttons">
             <h2 className="films-title" >Бесплатные</h2>
             <button onClick={() => setMediaType("movie")} className="glow-on-hover" type="button">Фильмы</button>
             <button onClick={() => setMediaType("tv")} className="glow-on-hover" type="button">Cериалы</button>
         </div>
         <div className="scroller">
             {
                 popular.map((item) => (
                     <div key={item.id} className="movie-card">
                         <div className="card-img">
                            <Link to={`/tv/${item.id}`}> <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt=""/>
                                <div className="consensus">
                                    <div className="info-rating">{item.vote_average}</div>
                                </div>
                            </Link>
                         </div>
                         <div className="card-content">
                             <Link to={`/tv/${item.id}`}>
                                 <h5 className="card-title">{item.name || item.title}</h5>
                             </Link>
                             <span className="card-year">{formatDate(item.first_air_date)}</span>
                         </div>
                </div>

                 ))
             }

         </div>

     </div>
    );
};

export default Serials;