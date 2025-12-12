/*
Name: Joseph Juarez
Date: 11/20/2025
File: platforms.jsx
Description: Creates the platform component to list all platforms.
*/

import {settings} from "../../config/config";
import {useAuth} from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import {NavLink, Outlet} from "react-router-dom";
import {useState} from "react";
import "/src/assets/css/platform.css";
import Pagination from "./pagination";
import {useNavigate} from "react-router-dom";
import EditPlatform from './editPlatform.jsx';
import CreatePlatform from "./createPlatform.jsx";
import DeletePlatform from "./deletePlatform.jsx";

const Platforms = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [url, setUrl] = useState(settings.baseApiUrl + "/platforms");
    const {user} = useAuth();
    const navigate = useNavigate();
    const [activePlatform, setActivePlatform] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [reload, setReload] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = (e) => {
        if(disabled) return;
        let platform = {};
        ["platform_id", "platform_name", "form_factor", "generation", "release_year"].forEach(function (key)
        {
            platform[key] =
                document.getElementById(`platform-${key}-` + e.target.id).innerText;
        })
        setActiveStudent(platform);
        setSubHeading("Delete Platform");
        navigate("/platforms/" + e.target.id);
        setShowDeleteModal(true);
    }
    const handleCreate = (e) => {
        if(disabled) return;
        setShowCreateModal(true);
        setSubHeading("Create Platforms");
    }

    const disabled = (user.role !== 1);

    useEffect(() => {
        getAll();
    }, [reload]);

    const handleEdit = (e) => {
        if(disabled) return;

        let platform = {};
        ["platform_id", "platform_name", "form_factor", "generation", "release_year"].forEach(function(key)
        {
            platform[key] =
                document.getElementById(`platform-${key}-` + e.target.id).innerText;
        })
        setActivePlatform(platform);
        navigate("/platforms/" + e.target.id);
        setShowEditModal(true);
        setSubHeading("Edit Platform");
    }
    //declare the data fetching function
    const {
        error,
        isLoading,
        data: platforms
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
                {platforms &&
                    <div className="platform-container">
                        <div className="platform-row platform-row-header">
                            <div>ID</div>
                            <div>Platform Name</div>
                        </div>
                        {platforms.data && platforms.data.map((platform) => (
                            <div key={platform.platform_id} className="platform-row">
                                <div>
                                    <NavLink
                                        className={({isActive}) => isActive ? "active" : ""}
                                        to={`/platforms/${platform.platform_id}`}>
                                        {platform.platform_id}
                                    </NavLink>
                                </div>
                                <div>{platform.platform_name}</div>
                            </div>
                        ))}
                    </div>}
                {showEditModal &&
                    <EditPlatform
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                        data={activePlatform}
                        reload={reload}
                        setReload={setReload}
                        setSubHeading={setSubHeading}/>}

                {showDeleteModal &&
                    <DeletePlatform
                        showModal={showDeleteModal}
                        setShowModal={setShowDeleteModal}
                        data={activePlatform}
                        reload={reload}
                        setReload={setReload}
                        setSubHeading={setSubHeading}/>}

                {showCreateModal &&
                    <CreatePlatform
                        showModal={showCreateModal}
                        setShowModal={setShowCreateModal}
                        reload={reload}
                        setReload={setReload}
                        setSubHeading={setSubHeading}/>}
                <div>
                    <button className="button-create" disabled={disabled} onClick={handleCreate}>
                        Create Platform
                    </button>
                </div>

                        {platforms && <Pagination platforms={platforms} setUrl={setUrl}/>}
                <button
                    className="button-light"
                    id={platforms.platform_id}
                    disabled={disabled}
                    onClick={handleEdit}>Edit</button>

                <button className="button-light" id={platforms.platform_id} disabled={disabled}
                        onClick={handleDelete}>Delete</button>
            </div>
            <Outlet/>
        </>
    );
};

export default Platforms;
