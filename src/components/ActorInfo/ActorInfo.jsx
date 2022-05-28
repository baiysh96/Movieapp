import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Spinner from "../Spinner";
import person from "../../assets/images/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"

const ActorInfo = () => {
    const {id} = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const [isFilmLoading,setIsFilmLoading] = useState(true)

    const [actor,setActor] = useState({})
    const [films,setFilms] = useState([])
        useEffect(() => {
            axios(`https://api.themoviedb.org/3/person/${id}?&language=ru&api_key=042f11beb984d2ca7828fd2109953f49`)
                .then(({data}) => {
                    setActor(data)
                    setIsLoading(false)
                })
            axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?&language=ru&api_key=042f11beb984d2ca7828fd2109953f49`)
                .then(({data}) => {
                    setFilms(data)
                    setIsFilmLoading(false)
                })

        },[id])
    if(isLoading || isFilmLoading) {
        return <Spinner />
    }

    return (
        <div>
        <div className="container" style={{marginTop:"30px"}}>
            <div className="row">
                <div className="col-3">
                    <img style={{marginBottom: "30px"}} src={`https:/www.themoviedb.org/t/p/w440_and_h660_face${actor.profile_path}`} alt=""/>
                    <h3 style={{marginBottom:"15px"}} className="actor-title">Персональная информация</h3>
                    <ul>
                        <li>Дата рождения</li>
                        <li>{actor.birthday}</li>
                        <li key={id}>Место рождения</li>
                        <li>{actor.place_of_birth}</li>
                        <li>Пол</li>
                        <li>{actor.gender === 2? "Мужской": "Женский"}</li>
                    </ul>
                </div>
                <div className="col-8" >
                    <h1 className="actor-title">{actor.name}</h1>
                    <h2 style={{color:"black",margin:"10px 0 0 0 "}}>Биография:</h2>
                    <p className="actor-desc">{actor.biography.length === 0?"Нет информации":actor.biography}</p>
                     <h2 style={{color:"black",margin:"10px 0 0 0 "}}>Известность за:</h2>
                    <div className="scroller">
                        {
                            films.cast.map((item,index) => (
                                <div key={index} className="movie-card" style={{zIndex:"2"}}>
                                    <div className="card-img">

                                        <Link to={`/movie/${item.id}`}>
                                            <img src={`https:/www.themoviedb.org/t/p/w440_and_h660_face${item.poster_path || person}`} alt=""/>
                                        </Link>
                                    </div>
                                    <div className="card-content">
                                        <Link to={`/movie/${item.id}`}>
                                            <h5 className="card-title">{item.title}</h5>

                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>

        </div>
        </div>

    );
};

export default ActorInfo;