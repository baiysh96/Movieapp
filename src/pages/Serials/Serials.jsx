import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Serials = () => {
    const [popular,setPopular] = useState([])
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/tv?&lenguage=ru&api_key=042f11beb984d2ca7828fd2109953f49`)
            .then(({data}) => setPopular(data.results))
    },[popular])
    // function formatDate (date){
    //     const month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
    //     const reversedDate = date.split('-').reverse()
    //     reversedDate[1] = month[reversedDate[1] - 1]
    //     return reversedDate.join(' ')
    // }
    return (
     <div className="container">
         <h2 style={{marginTop:"20px"}}>Сериалы</h2>
         <div className="scroller">
             {
                 popular.map((item) => (
                     <div key={item.id} className="movie-card">
                         <div className="card-img">
                            <Link to={`/tv/${item.id}`}> <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt=""/></Link>
                         </div>
                         <div className="card-content">
                             <Link to={`/tv/${item.id}`}>
                                 <h5 className="card-title">{item.name}</h5>
                             </Link>
                             <span className="card-year">{item.release_date}</span>
                         </div>
                </div>

                 ))
             }

         </div>

     </div>
    );
};

export default Serials;