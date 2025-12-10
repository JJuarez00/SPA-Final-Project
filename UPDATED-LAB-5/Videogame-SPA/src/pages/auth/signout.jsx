/*
Name: Ethan Mull
Date: 11/13/2025
File: signout.jsx
Description: create the signout for the project
 */

import {useAuth} from "../../services/useAuth";
import {useEffect} from 'react'

import React from 'react';

const Signout = () => {
    const {logout} = useAuth();

    useEffect(() => {
        logout();
    })

    return (
        <>
            <div className="main-heading">
                <div className="container">Authorization</div>
            </div>
            <div className="sub-heading">
                <div className="container">Sign Out</div>
            </div>
            <div className="main-content container">
                Thank you for your visit. You have signed out.
            </div>
        </>
    );
};

export default Signout;