/**
 * Author: Ashley Rodriguez Vega
 * Date: 12/10/2025
 * File: game.jsx
 * Description: this script creates the game component to display
 * details of a specific game.
 */

import {settings} from "../../config/config";
import {useAuth} from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import {useParams, useNavigate} from "react-router-dom";
import {Modal, Button} from 'react-bootstrap';
import "/src/assets/css/game.css";

//import React from 'react';

const Game = () => {
    //videogameId = courseNum
    const {videogameId} = useParams();
    const url = settings.baseApiUrl + "/courses/" + videogameId;
    const {user} = useAuth();
    const navigate = useNavigate();
    const handleClose = () => { navigate("/videogames") };
    //fetch course data using the useAxios hook
    const {
        error,
        isLoading,
        //game, videogames, videogame???
        data: videogame
    } = useAxios(url, "GET", {Authorization: "Bearer " + user.jwt});
    return (
        <>
            <Modal show={true} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    {/* NOTE: game, videogames, videogame???*/}
                    <h4>{videogame && videogame.title}</h4>
                </Modal.Header>
                <Modal.Body>
                    {error && <div>{error}</div>}
                    {isLoading &&
                        <div className="image-loading">
                            Please wait while data is being loaded
                            <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                        </div>
                    }
                    {/* NOTE: game, videogames, videogame???*/}
                    {videogame &&
                        <div className="game-detail-container">
                            <div className="game-detail-row">
                                <div>Title</div><div>{videogame.title}</div>
                            </div>
                            <div className="game-detail-row">
                                <div>Publisher</div><div>{videogame.publisher?.publisher_name}</div>
                            </div>
                            <div className="videogame-detail-row">
                                <div>Release Year</div><div>{videogame.release_year}</div>
                            </div>
                            <div className="game-detail-row">
                                <div>ESRB Rating</div><div>{videogame.esrb_rating}</div>
                            </div>
                            <div className="game-detail-row">
                                <div>Description</div><div>{videogame.game_description}</div>
                            </div>
                            <div className="game-detail-row">
                                <div>Multiplayer</div><div>{videogame.is_multiplayer ? "Yes" : "No"}</div>
                            </div>
                            <div className="game-detail-row">
                                <div>Categories</div>
                                <div>
                                    {videogame.categories?.map(cat => cat.category_name).join(", ")}
                                </div>
                            </div>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer style={{borderTop: "none"}}>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default Game;