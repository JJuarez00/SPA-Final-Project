/*
Name: Ethan Mull
Date: 12/7/2025
File: editPublisher.jsx
Description:
 */

import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "/src/assets/css/publisher.css";

import React from 'react';

const EditPublisher = () => {

    const {error, isLoading, data: response, update} = UseFetch();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: data,
        shouldUseNativeValidation: false
    });
    const editFormOptions = {
        publisher_id: {required: "ID is required"},
        publisher_name: {required: "Name is required"},
        country: {required: "Country is required"},
        founded_year: {required: "Year is required"}
    }

    const handleUpdate = (publisher) => {
        update(publisher);
        setSubmitted(true);
    }
    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Publishers");
        navigate("/publishers")
    }
    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setSubmitted(false);
        setReload(!reload);
        setSubHeading("All Publishers");
        navigate("/publisher")
    }
    useEffect(() => {
        if (!submitted || error != null) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    })
    return (
        <>
            <Modal show={showModal} onHide={handleClose} centered animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <h4>Edit Publisher</h4>
                </Modal.Header>
                <Modal.Body>
                    {error && <JSONPretty data={error} style={{color: "red"}}></JSONPretty>}
                    {isLoading &&
                        <div className="image-loading">
                            Please wait while data is being loaded
                            <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                        </div>
                    }
                    {response && <JSONPretty data={response}></JSONPretty>}
                    {(!submitted || error != null) &&
                        <form className="form-publisher" id="form-publisher-edit" onSubmit={handleSubmit(handleUpdate)}>
                            <ul className="form-publisher-errors">
                                {errors?.publisher_id && <li>{errors.publisher_id.message}</li>}
                                {errors?.publisher_name && <li>{errors.publisher_name.message}</li>}
                                {errors?.country && <li>{errors.country.message}</li>}
                                {errors?.founded_year && <li>{errors.founded_year.message}</li>}
                            </ul>
                            <div className="form-group">
                                <label>Publisher ID</label>
                                <input name="publisher_id" readOnly="readOnly" {...register('publisher_id', editFormOptions.publisher_id)}/>
                            </div>
                            <div className="form-group">
                                <label>Publisher Name</label>
                                <input type="text" name="publisher_name" {...register('publisher_name', editFormOptions.publisher_name)}/>
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <input name="country" {...register('country', editFormOptions.country)}/>
                            </div>
                            <div className="form-group">
                                <label>Founded Year</label>
                                <input name="founded_year" {...register('founded_year', editFormOptions.founded_year)}/>
                            </div>

                        </form>}
                </Modal.Body>
                <Modal.Footer style={{justifyContent: "center"}}>
                    <Button type="submit" form="form-publisher-edit" variant="primary"
                            style={{display: (!showButton) ? "none" : ""}}>Update</Button>
                    <Button variant="secondary" onClick={handleCancel}
                            style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}
                            style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditPublisher;