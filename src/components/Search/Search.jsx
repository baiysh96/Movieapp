import React, {useEffect, useState} from 'react';
import {useParams,Link} from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const Search = () => {
    const {name} = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const [search,setSearch] = useState([])
        useEffect(() => {
            axios(`https://api.themoviedb.org/3/search/movie/?&query=${name}&language=ru&api_key=042f11beb984d2ca7828fd2109953f49`)
                .then(({data}) => {
                    setSearch(data.results)
                    setIsLoading(false)
                })
        },[name])
    if(isLoading) {
        return <Spinner />
    }

    return (
        <div style={{marginTop:"30px"}} className="container">
            <div className="row">
                <div className="col-3">
                    <h3 className="search-title">Результаты поиска</h3>
                    <ul className="search-menu">
                        <li>сериалы:{search.length}</li>
                        <li>фильмы</li>
                        <li>Люди</li>
                        <li>Коллекции</li>
                        <li>Компании</li>
                        <li>Ключевые слова</li>
                        <li>Телесети</li>
                    </ul>
                </div>
            <div className="col-8">
              <div className="row">
                  {
                      search.map((item) => (
                          <Link to={`/movie/${item.id}`} key={item.id} className="item-col">
                              <div>
                                  <img style={{width:"100%"}}
                                       src={`/t/p/w500/${item.poster_path}`} alt=""/>
                              </div>
                              <div className="card-content">
                                  <Link to={`/movie/${item.id}`}>
                                      <h5 className="card-title">{item.title}</h5>

                                  </Link>
                              </div>

                          </Link>
                      ))
                  }
              </div>
            </div>
            </div>
        </div>
    );
};

export default Search;