/**
 * Author: Joseph Juarez
 * Date: 11/13/2025
 * File: routes.jsx
 * Description: Defines app routes.
 */

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home";
import NoMatch from "../pages/nomatch";
import Publishers from "../pages/publisher/publishers";
import Publisher from "../pages/publisher/publisher.jsx";
import Videogames from "../pages/videogame/videogames.jsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>

                    <Route path="publishers" element={<Publishers/>}>
                        <Route index element={<p>Select a publisher to view details.</p>} />
                        <Route path=":publisherId" element={<Publisher/>}>
                            <Route path="videogames" element={<Videogames/>}/>
                        </Route>

                    </Route>

                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
