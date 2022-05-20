import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import Spinner from "../Spinner";
import ReactPlayer from "react-player";

const MovieInfo = () => {
    const {id} = useParams()
    const [film, setFilm] = useState({})
    const [credits, setCredits] = useState({})
    const [trailer,setTrailer] = useState([])
    const [filmLoader, setFilmLoader] = useState(true);
    const [videoLoader, setVideoLoader] = useState(true);
    const [creditLoader, setCreditLoader] = useState(true);

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${id}?language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then((res) => {
                setFilm(res.data)
                setFilmLoader(false)
            })
        axios(`https://api.themoviedb.org/3/movie/${id}/credits?language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then((res) => {
                setCredits(res.data)
                setCreditLoader(false)
            })
        axios(`https://api.themoviedb.org/3/movie/${id}/videos?language=ru&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setTrailer(data.results)
                setVideoLoader(false)
            })
    }, [id])
    console.log(trailer)

    if (filmLoader || creditLoader || videoLoader) {
        return <Spinner />
    }

    return (
        <div>
            <div className="info-film"
                 style={{
                     backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) 150px, rgba(31.5, 31.5, 31.5, 0.84) 100%),
                     url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${film.backdrop_path})`,
                     backgroundSize: 'cover',
                     backgroundRepeat: 'no-repeat',
                     paddingTop:"30px",
                     paddingBottom: "30px"
                     //<div class="backdrop" style="/* padding-top: 30px; *
                     // / /* padding-bottom: 30px; */ background-image:
                     // url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/leeHVfEoza4GaZio1tIzevz6XYc.jpg");">

                 }}
            >
                <div className="container">
                    <div className="row" >
                        <div className="col-3">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                                alt="img"
                            />
                        </div>
                        <div className="col-8">
                            <h2 className="info-title">{film.title}</h2>
                            <div style={{display:"flex",alignItems:"center"}}>
                                {film.release_date}
                                <ul className="info-list">

                                    {
                                        film.genres.map((oneGenre) =>(
                                            <Link to={`/films/${oneGenre.id}`} key={oneGenre.id}>{oneGenre.name}</Link>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div style={{display:"flex",alignItems:"center",marginBottom:"30px"}}>
                                <div className="info-rating">{film.vote_average}</div>
                                <p>Пользовательский счёт</p>
                            </div>
                            <i>{film.tagline}</i>
                            <h3 style={{marginBottom:"20px",fontWeight:"700"}}>Обзор</h3>
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
               <div className="row">
                   <div className="col-6">
                       <img src={`https://api.themoviedb.org/3/movie/${id}/videos?language=ru&api_key=`} alt=""/>
                   </div>
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

export default MovieInfo;