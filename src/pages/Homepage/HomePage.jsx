import React, {useState  } from 'react';
import Serials from "../Serials";
import Films from "../Films";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Spinner from "../../components/Spinner";

const HomePage = () => {
    // const {id} = useParams()
    // const [movie,setMovie] = useState({})
    // const [loader,setLoader] = useState(true)
    let navigate = useNavigate();
    const [search,setSearch] = useState("")
    const handlerChange = (e) => setSearch((e.target.value))
    const handlerSearch = (e) => {
        if(e.key === "Enter") {
            navigate(`/search/${search}`)
            setSearch("")
        }
    }
    // useEffect(() => {
    //     axios(`https://api.themoviedb.org/3/movie/${id}?language=ru&api_key=042f11beb984d2ca7828fd2109953f49`)
    //         .then((res) => {
    //             setMovie(res.data)
    //             setLoader(false)
    //         })
    // },[id])
    // if(loader) {
    //     return <Spinner />
    // }
    return (
       <div>
           <div className="homePage-box" style={{
               backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/6LfVuZBiOOCtqch5Ukspjb9y0EB.jpg)`,
               backgroundPosition: "center top",
               backgroundColor:"rgb(65, 143, 143)",
               backgroundSize: "cover",
               backgroundRepeat: "no-repeat"}}>
                   <div className="container">
                   <div className="item">
                       <h1 className="home-title">Добро пожаловать.</h1>
                       <h3 className="home-subtitle">Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</h3>
                       <label htmlFor="" className="form-control" placeholder="Найти фильм, сериал, персону......">
                           <input onKeyPress ={handlerSearch} onChange={handlerChange} type="text" placeholder="Найти фильм, сериал, персону......"/>
                           <button type="submit" onClick={handlerSearch}>Search</button>

                       </label>
                   </div>
               </div>
           </div>
           <Serials />
           <Films />
       </div>
    );
};

export default HomePage;