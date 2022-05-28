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
            <h3 className="search-title">Результаты поиска</h3>
              <div className="row">
                  {
                      search.map((item) => (
                          <Link to={`/movie/${item.id}`} key={item.id} className="col-2">
                              <div>
                                  <img style={{width:"100%"}}
                                       src={`https:/www.themoviedb.org/t/p/w500/${item.poster_path?item.poster_path:"Нет фото"}`} alt="poster"/>
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
    );
};

export default Search;