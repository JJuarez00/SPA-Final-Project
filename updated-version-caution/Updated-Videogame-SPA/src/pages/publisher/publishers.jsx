/**
 * Author: Joseph Juarez
 * Date: 11/13/2025
 * File: publishers.jsx
 * Description: Create a component to list all publishers.
 */

import {settings} from "../../config/config";
import {useState, useEffect} from 'react';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import "../../assets/css/publisher.css";
import useXmlHttp from "../../services/useXmlHttp";
import {useAuth} from "../../services/useAuth";
import {useNavigate} from "react-router-dom";
import EditPublisher from './editPublisher';
import CreatePublisher from "./createPublisher";
import DeletePublisher from "./deletePublisher";

const Publishers = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Publishers");
    const url = settings.baseApiUrl + "/publishers";
    const navigate = useNavigate();
    const [activePublisher, setActivePublisher] = useState(""); //the student being edited
    const [showEditModal, setShowEditModal] = useState(false);
    const [reload, setReload] = useState(false);
    const {user} = useAuth();
    const disabled = (user.role !== 1);

    useEffect(() => {
        getAll();
    }, [reload]);

    const handleDelete = (e) => {
        if(disabled) return;
        let publisher = {};
        ["publisher_id", "publisher_name", "country", "founded_year"].forEach(function (key)
        {
            publisher[key] =
                document.getElementById(`publisher-${key}-` + e.target.id).innerText;
        })
        setActivePublisher(publisher);
        setSubHeading("Delete Publisher");
        navigate("/publishers/" + e.target.id);
        setShowDeleteModal(true);
    }

    const handleCreate = (e) => {
        if(disabled) return;
        setShowCreateModal(true);
        setSubHeading("Create Publisher");
    }
    const handleEdit = (e) => {
        if(disabled) return;
//retrieve student data and pass it to the update page
        let publisher = {};
        ["publisher_id", "publisher_name", "country", "founded_year"].forEach(function(key)
        {
            publisher[key] =
                document.getElementById(`publisher-${key}-` + e.target.id).innerText;
        })
        setActivePublisher(publisher);
        navigate("/publishers/" + e.target.id);
        setShowEditModal(true);
        setSubHeading("Edit Publisher");
    }

    const {
        error,
        isLoading,
        data: publishers
    } = useXmlHttp(url, "GET",{Authorization:`Bearer ${user.jwt}`});

    useEffect(() => {
        setSubHeading("All Publishers");
    }, [pathname]);

    return (
        <div>

            {/* Displays the main page title “Publisher”*/}
            <div className="main-heading">
                <div className="container">Publisher</div>
            </div>

            {/* Displays the current subheading, for example “All Publishers” */}
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>

            {/* Displays loading image, error message, or the publisher list */}
            <div className="main-content container">

                {/* --- Error Message --- */}
                {error && <div>{error}</div>}

                {/* --- Loading State --- */}
                {isLoading && <div className="image-loading">
                    Please wait while data is being loaded:
                    <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                </div>}

                {/* --- Publisher List --- */}
                {publishers && <div className="publisher-container">

                    {/* Left side: clickable list of publishers */}
                    <div className="publisher-list">
                        {publishers.map((publisher) => (
                            <NavLink key={publisher.publisher_id}
                                     className={({isActive}) => isActive ? "active" : ""}
                                     to={`/publishers/${publisher.publisher_id}`}>
                                <span>&nbsp;</span><div>{publisher.publisher_name}</div>
                            </NavLink>
                        ))}
                        <button
                            className="button-light"
                            id={publisher.publisher_id}
                            disabled={disabled}
                            onClick={handleEdit}>Edit</button>

                        <button className="button-light" id={publisher.publisher_id} disabled={disabled}
                                onClick={handleDelete}>Delete</button>
                    </div>

                    {/* Right side: area for publisher details */}
                    <div className="publisher-item">
                        <Outlet context={[subHeading, setSubHeading]}/>
                    </div>
                </div>}
                {showEditModal &&
                    <EditPublisher
                        showModal={showEditModal}
                        setShowModal={setShowEditModal}
                        data={activePublisher}
                        reload={reload}
                        setReload={setReload}
                        setSubHeading={setSubHeading}/>}
                {showCreateModal &&
                    <CreateStudent
                        showModal={showCreateModal}
                        setShowModal={setShowCreateModal}
                        reload={reload}
                        setReload={setReload}
                        setSubHeading={setSubHeading}/>}
                {showDeleteModal &&
                    <DeleteStudent
                        showModal={showDeleteModal}
                        setShowModal={setShowDeleteModal}
                        data={activeStudent}
                        reload={reload}
                        setReload={setReload}
                        setSubHeading={setSubHeading}/>}
                <div>
                    <button className="button-create" disabled={disabled} onClick={handleCreate}>
                        Create Publisher
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Publishers;