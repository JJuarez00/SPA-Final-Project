/**
 * Author: Ashley Rodriguez Vega
 * Date: 12/10/2025
 * File: games.jsx
 * Description: this script creates the games component to list
 * all the games
 */


import {settings} from "../../config/config";
import {useAuth} from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import {NavLink, Outlet} from "react-router-dom";
import "/src/assets/css/game.css";
//import Pagination from "./pagination";
import {useState, useEffect} from "react";

import React from 'react';

const Games = () => {
    //const url = settings.baseApiUrl + "/videogames";
    const [url, setUrl] = useState(settings.baseApiUrl + "/videogames"); //VIDEOGAMES???
    const {user} = useAuth();
    //declare the data fetching function
    const {
        error,
        isLoading,
        //NOTE: videogames???
        data: videogames
    } = useAxios(url, "GET", {Authorization: "Bearer " + user.jwt});
    return (
        <>
            <div className="main-heading">
                <div className="container">Game</div>
            </div>
            <div className="sub-heading">
                <div className="container">All Video Games</div>
            </div>
            <div className="main-content container">
                {error && <div>{error}</div>}
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/asssets/img/loading.gif" alt="Loading ......"/>
                    </div>
                }
                {videogames &&
                    <div className="game-container">
                        <div className="game-row game-row-header">
                            <div>ID</div>
                            <div>Title</div>
                            <div>Publisher</div>
                            <div>Release Year</div>
                            <div>Rating</div>
                        </div>
                        {videogames.data && videogames.data.map((game) => (
                            <div key={game.videogame_id} className="game-row">
                                <div>
                                    <NavLink
                                        className={({isActive}) => isActive ? "active" : ""}
                                        to={`/videogames/${game.number}`}>
                                        {game.videogame_id}
                                    </NavLink>
                                </div>
                                <div>{game.title}</div>
                                <div>{game.publisher.publisher_name}</div>
                                <div>{game.release_year}</div>
                                <div>{game.esrb_rating}</div>
                            </div>
                        ))}
                    </div>}
                {videogames && <Pagination videogames={videogames} setUrl={setUrl}/>}
            </div>
            <Outlet />
        </>
    );
};

export default Games;