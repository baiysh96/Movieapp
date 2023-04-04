import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import Spinner from "../Spinner";
import ReactPlayer from "react-player";
import person
    from "../../assets/images/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
import facebook from "../../assets/images/facebook.svg"
import twitter from "../../assets/images/twitter.svg"
import instagram from "../../assets/images/instagram.svg"
import justWatch from "../../assets/images/justwatch-small-grey.svg"
import basicIcon from "../../assets/images/basic-paginate.svg"
import {BASE_API, IMAGE_BASE_API} from "../../constants/Constants";

const API_KEY = process.env.REACT_APP_APIKEY

const MovieInfo = () => {
    const {id} = useParams()
    const [film, setFilm] = useState({})
    const [credits, setCredits] = useState({})
    const [trailer, setTrailer] = useState([])
    const [filmLoader, setFilmLoader] = useState(true);
    const [videoLoader, setVideoLoader] = useState(true);
    const [creditLoader, setCreditLoader] = useState(true);

    useEffect(() => {
        axios(`${BASE_API}/movie/${id}?language=ru&api_key=${API_KEY}`)
            .then((res) => {
                setFilm(res.data)
                setFilmLoader(false)
            })
        axios(`${BASE_API}/movie/${id}/credits?language=ru&api_key=${API_KEY}`)
            .then((res) => {
                setCredits(res.data)
                setCreditLoader(false)
            })
        axios(`${BASE_API}/movie/${id}/videos?language=ru&api_key=${API_KEY}`)
            .then(({data}) => {

                setTrailer(data.results)
                setVideoLoader(false)
            })
    }, [id])

    if (filmLoader || creditLoader || videoLoader) {
        return <Spinner/>
    }
    return (
        <div>
            <div style={{
                backgroundImage: `url(${IMAGE_BASE_API}w1920_and_h800_multi_faces${film.backdrop_path})`,
                // backgroundPosition: "right -200px top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                margin: "30px 0"
            }}
            >
                <div style={{

                    minWidth: "100%",
                    minHeight: "100%",
                    padding: "30px 0"
                }}>


                    <div className=" container custom-bg">
                        <div className="row">
                            <div className="col-3">
                                <img
                                    src={`${IMAGE_BASE_API}w500/${film.poster_path}`}
                                    alt="img"
                                />
                            </div>
                            <div className="col-8">
                                <h2 className="info-title">{film.title}</h2>
                                <div className="info-film" style={{display: "flex", alignItems: "center"}}>
                                    <span>{film.release_date}</span>
                                    <ul className="info-list">

                                        {
                                            film.genres.map((oneGenre) => (
                                                <Link to={`/films/${oneGenre.id}`}
                                                      key={oneGenre.id}>{oneGenre.name}</Link>
                                            ))
                                        }
                                    </ul>
                                    <a style={{color: "inherit", marginLeft: "10px"}}
                                       href="/">{`${film.runtime} мин`}</a>
                                </div>
                                <div style={{display: "flex", alignItems: "center", marginBottom: "30px"}}>
                                    <div className="info-rating">{film.vote_average}</div>
                                    <p>Пользовательский счёт</p>
                                </div>
                                <i>{film.tagline}</i>
                                <h3 style={{marginBottom: "20px", fontWeight: "700"}}>Обзор</h3>
                                <p>{film.overview}</p>
                                <ul className="info-list">
                                    {
                                        film.production_companies.map((item) => (
                                            <a href="/" key={item.id}>{item.name}</a>
                                        ))
                                    }
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container position ">
                <h2 style={{marginTop: "20px"}}>В главных ролях</h2>
                <div className="scroller">
                    {
                        credits.cast.map((item) => (
                            <div key={item.id} className="movie-card" style={{zIndex: "2"}}>
                                <div className="card-img">
                                    <Link to={`/person/${item.id}`}>
                                        <img
                                            src={`${IMAGE_BASE_API}w440_and_h660_face${item.profile_path === null ? person : item.profile_path}`}
                                            alt=""/>
                                    </Link>
                                </div>
                                <div className="card-content">
                                    <Link to={`/person/${item.id}`}>
                                        <h5 className="card-title">{item.name}</h5>
                                        <h5 className="card-title">{item.character}</h5>

                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <div className="film-info">
                        <img className="social-img" src={facebook} width="35px" alt=""/>
                        <img className="social-img" src={twitter} width="35px" alt=""/>
                        <img className="social-img" src={instagram} width="35px" alt=""/>
                        <img className="social-img" src={justWatch} width="35px" alt=""/>
                        <img className="social-img" src={basicIcon} width="35px" alt=""/>
                        <ul>
                            <h3 className="title">Исходное название</h3>
                            <li className="title">{film.original_title}</li>
                            <h3 className="title">Статус</h3>
                            <li className="title">{film.status}</li>
                            <h3 className="title">Исходный язык</h3>
                            <li className="title">{film.original_language}</li>
                            <h3 className="title">Бюджет</h3>
                            <li className="title">{film.budget}$</li>
                            <h3 className="title">Сборы</h3>
                            <li className="title">{film.revenue}$</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img src={`https://www.themoviedb.org/3/movie/${id}/videos?language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`} alt=""/>
                    </div>
                </div>

            </div>
            <div className="container">
                <h2 style={{marginBottom: "20px"}}>Трейлер</h2>
                <div className="row">
                    {
                        trailer.map(el =>
                            <ReactPlayer key={el.id} url={`https://www.youtube.com/watch?v=${el.key}`}
                                         className="col-6"/>
                        )
                    }
                </div>

            </div>

        </div>

    );
};

export default MovieInfo;