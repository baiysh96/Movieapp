import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {BASE_API, IMAGE_BASE_API} from "../../constants/Constants";
const API_KEY = process.env.REACT_APP_APIKEY

const Serials = () => {
    const [popular,setPopular] = useState([])
    const [mediaType,setMediaType] = useState("movie")
    const [active,setActive] = useState(false)

    useEffect(() => {
        axios(`${BASE_API}trending/${mediaType}/day?&language=ru&api_key=${API_KEY}`)
            .then(({data}) => setPopular(data.results))
    },[popular,mediaType])
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
             <button onClick={() => setActive(!active) || setMediaType("movie")}  className={active?"selector active":"selector"} type="button">Фильмы</button>
             <button onClick={() => setActive(!active) || setMediaType("tv")} className={!active?"selector active":"selector"} type="button">Сериалы</button>
         </div>
         <div className="scroller">
             {
                 popular.map((item) => (
                     <div key={item.id} className="movie-card">
                         <div className="card-img">
                            <Link to={mediaType === "tv"?`/tv/${item.id}`:`/movie/${item.id}`}> <img src={`${IMAGE_BASE_API}w500/${item.poster_path}`} alt=""/>
                                <div className="consensus">
                                    <div className="info-rating">{item.vote_average}</div>
                                </div>
                            </Link>
                         </div>
                         <div className="card-content">
                             <Link to={`/tv/${item.id}`}>
                                 <h5 className="card-title">{item.name || item.title}</h5>
                             </Link>
                             <span className="card-year">{item.first_air_date?formatDate(item.first_air_date):formatDate(item.release_date)}</span>
                         </div>
                </div>

                 ))
             }

         </div>

     </div>
    );
};

export default Serials;