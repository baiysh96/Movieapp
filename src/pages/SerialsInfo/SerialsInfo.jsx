import React from 'react';
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";
import ReactPlayer from "react-player";

const SerialsInfo = () => {
    const [filmLoader, setFilmLoader] = useState(true);
    const [creditLoader, setCreditLoader] = useState(true);
    const [videoLoader, setVideoLoader] = useState(true);
    const [credits,setCredits] = useState({})
    const {id} = useParams()
    const [films,setFilms] = useState({})
    const [trailer,setTrailer] = useState([])
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/tv/${id}?&language=ru&api_key=042f11beb984d2ca7828fd2109953f49`)
            .then(({data}) => {
                setFilms(data)
                setFilmLoader(false)
            })
        axios(`https://api.themoviedb.org/3/tv/${id}/credits?&language=ru&api_key=042f11beb984d2ca7828fd2109953f49`)
            .then(({data}) => {
                setCredits(data)
                setCreditLoader(false)
            })
        axios(`https://api.themoviedb.org/3/movie/${id}/videos?language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setTrailer(data.results)
                setVideoLoader(false)
            })

    },[id])
    if(filmLoader || creditLoader || videoLoader) {
        return <Spinner />
    }
    return (
        <div>
            <div className="info-film" style={{backgroundImage: `URL(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${films.backdrop_path})`}}>
                <div className="container">
                    <div className="row" >
                        <div className="col-3">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${films.poster_path}`}
                                alt="img"
                            />
                        </div>
                        <div className="col-8">
                            <h2 className="info-title">{films.title}</h2>
                            <div style={{display:"flex",alignItems:"center"}}>
                                {films.release_date}
                                <ul className="info-list">

                                    {
                                        films.genres.map((oneGenre) =>(
                                            <Link to={`/films/${oneGenre.id}`} key={oneGenre.id}>{oneGenre.name}</Link>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div style={{display:"flex",alignItems:"center",marginBottom:"30px"}}>
                                <div className="info-rating">{films.vote_average}</div>
                                <p>Пользовательский счёт</p>
                            </div>
                            <i>{films.tagline}</i>
                            <h3 style={{marginBottom:"20px",fontWeight:"700"}}>Обзор</h3>
                            <p>{films.overview}</p>

                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <h2 style={{marginTop:"20px"}}>В главных ролях</h2>
                <div className="scroller">
                    {
                        credits.cast.map((item) => (
                            <div className="movie-card" style={{zIndex:"2"}}>
                                <div className="card-img">
                                    <Link key={item.id} to={`/movie/${item.id}`}>
                                        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face${item.profile_path}`} alt=""/>
                                    </Link>
                                </div>
                                <div className="card-content">
                                    <Link to={`/movie/${item.id}`}>
                                        <h5 className="card-title">{item.name}</h5>
                                        <h5 className="card-title">{item.character}</h5>

                                    </Link>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
            <div className="container">
                <h2 style={{marginBottom:"20px"}}>Трейлер</h2>
                <div className="row">
                    {
                        trailer.map(el =>
                            <ReactPlayer key={el.id} url={`https://www.youtube.com/watch?v=${el.key}`} className ="col-6"/>
                        )
                    }
                </div>

            </div>

        </div>


    );
};

export default SerialsInfo;