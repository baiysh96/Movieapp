import React, {useEffect, useState} from 'react';
import {useParams,Link} from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import {BASE_API, IMAGE_BASE_API} from "../../constants/Constants";
const API_KEY = process.env.REACT_APP_APIKEY
const Search = () => {
    const {name} = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const [search,setSearch] = useState([])
        useEffect(() => {
            axios(`${BASE_API}movie/?&query=${name}&language=ru&api_key=${API_KEY}`)
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
            <h3 className="search-title">Результаты поиска </h3>
              <div className="row">
                  {
                      search.map((item) => (
                          <Link to={`/movie/${item.id}`} key={item.id} className="col-2">
                              <div>
                                  <img style={{width:"100%"}}
                                       src={`${IMAGE_BASE_API}w500/${item.poster_path?item.poster_path:"Нет фото"}`} alt="poster"/>
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