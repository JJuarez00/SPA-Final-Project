/**
 * Author: Ashley Rodriguez Vega
 * Date: 12/10/2025
 * File: categories.jsx
 * Description: this script creates the categories component to list
 * all the games
 */

import {settings} from "../../config/config";
import {useAuth} from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import {NavLink} from "react-router-dom";
import {useState, useEffect} from "react";
import "/src/assets/css/category.css";

import React from 'react';

const Categories = () => {
    const url = settings.baseApiUrl + "/categories";
    const {user} = useAuth();
//declare the data fetching function
    const {
        error,
        isLoading,
        data: categories
    } = useAxios(url, "GET", {Authorization: "Bearer " + user.jwt});
    return (
        <>
            <div className="main-heading">
                <div className="container">Game Categories</div>
            </div>
            <div className="sub-heading">
                <div className="container">All Categories</div>
            </div>
            <div className="main-content container">
                {error && <div>{error}</div>}
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                    </div>
                }
                {categories &&
                    <div className="category-container">
                        <div className="category-row category-row-header">
                            <div>ID</div>
                            <div>Name</div>
                            <div>Description</div>
                            <div>Videogames</div>
                        </div>
                        {categories.data && categories.data.map((category) => (
                            <div key={category.number} className="category-row">
                                <div>{category.category_id}</div>
                                <div>{category.category_name}</div>
                                <div>{category.description}</div>
                                <div>
                                    {category.videogames.length > 0
                                        ? category.videogames.map((game) => game.title).join(", ")
                                        : "No games"}
                                </div>
                            </div>
                        ))}
                    </div>}
            </div>


        </>
    );
};

export default Categories;
