import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Header from "./components/Header";
import Films from "../src/pages/Films";
import HomePage from "../src/pages/Homepage/HomePage";
import NotFound from "./components/NotFound";
import Serials from "../src/pages/Serials";
import MovieInfo from "./components/MovieInfo";
import SerialsInfo from "../src/pages/SerialsInfo";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes className="container">
                    <Route path="/" element={<HomePage />} />
                    <Route path="/films" element={<Films />} />
                    <Route path={"/movie/:id"} element={<MovieInfo />} />
                    <Route path="/serials" element={<Serials />} />
                    <Route path="/tv/:id" element={<SerialsInfo />} />
                    <Route path="*"  element={<NotFound />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
};

export default App;