import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Spinner from "../Spinner";
import person from "../../assets/images/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
import {BASE_API, IMAGE_BASE_API} from "../../constants/Constants";
import circle from "../../assets/images/glyphicons-basic-298-circle-empty-04c378f484e29180410eb305f586561b024cc969e038a8687fffd641f55b894c.svg"

const API_KEY = process.env.REACT_APP_APIKEY
const ActorInfo = () => {
    const {id} = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const [isFilmLoading,setIsFilmLoading] = useState(true)
    // const [more,setMore] = useState(false)
    const date = (str) => {
        return str.split("-").filter(el => el.length>=4).join("")
    }
    // const readMore = (str)  => {
    //     if(str.length >= 3000) {
    //         return str
    //     }else {
    //         str.slice(5000,str.length - 1)
    //     }
    // }

    const [actor,setActor] = useState({})
    const [films,setFilms] = useState([])
        useEffect(() => {
        axios(`${BASE_API}person/${id}?&language=ru&api_key=${API_KEY}`)
                .then(({data}) => {
                    setActor(data)
                    setIsLoading(false)
                })
            axios(`${BASE_API}person/${id}/movie_credits?&language=ru&api_key=${API_KEY}`)
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
                    <img style={{marginBottom: "30px"}} src={`${IMAGE_BASE_API}w440_and_h660_face${actor.profile_path}`} alt="img"/>
                    <h3 style={{marginBottom:"15px"}} className="actor-title">Персональная информация</h3>
                    <ul>
                        <h4 style={{marginBottom:"10px"}}>Дата рождения</h4>
                        <li>{actor.birthday}</li>
                        <h4 style={{marginBottom:"10px"}} key={id}>Место рождения</h4>
                        <li>{actor.place_of_birth}</li>
                        <h4 style={{marginBottom:"10px"}}>Пол</h4>
                        <li>{actor.gender === 2? "Мужской": "Женский"}</li>
                    </ul>
                    <h3 style={{marginBottom:"10px"}}>Также известность как:</h3>
                    <ul>
                        {
                            actor.also_known_as.map((item,idx) => (
                                <li key={idx}>{item}</li>
                            ))

                        }
                    </ul>
                </div>
                <div className="col-8" >
                    <h1 className="actor-title">{actor.name}</h1>
                    <h2 style={{color:"black",margin:"10px 0 0 0 "}}>Биография:</h2>
                    <p className="actor-desc ">
                        {actor.biography.length === 0?"Нет информации":actor.biography}
                    </p>
                    {/*<button onClick={() => readMore(actor.biography)}> read more</button>*/}
                     <h2 style={{color:"black",margin:"10px 0 0 0 "}}>Известность за:</h2>
                    <div className="scroller">
                        {
                            films.cast.map((item,index) => (
                                <div key={index} className="movie-card" style={{zIndex:"2"}}>
                                    <div className="card-img">

                                        <Link to={`/movie/${item.id}`}>
                                            <img src={`${IMAGE_BASE_API}w440_and_h660_face${item.poster_path || person}`} alt=""/>
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
                    <h2 style={{marginBottom:"10px",color:"black"}}>Актёрское искусство</h2>
                    <div className="actors-movie-container">
                        {
                            films.cast.map((item) => (
                                <div className="actors-movie" style={{marginBottom:"10px",color:"black"}} key={item.id}>
                                    <p>{date(item.release_date)}</p>
                                    <Link to={`/movie/${item.id}`} clasName="pagination-circle"><img src={circle} width="25px" alt="circle"/></Link>
                                    <Link to={`/movie/${item.id}`}>{item.title} как {item.original_title}</Link>
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