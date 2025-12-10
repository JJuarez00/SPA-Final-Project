/*
Name: Ethan Mull
Date: 12/8/2025
File: createPublisher.jsx
Description:
 */

import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {Button, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "/src/assets/css/publisher.css";

import React from 'react';

const CreatePublisher = () => {

    const {error, isLoading, data: response, create} = UseFetch();
    const [submitted, setSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {publisher_id: "", publisher_name: "", country: "", founded_year: ""},
        shouldUseNativeValidation: false
    });
    const createFormOptions = {
        publisher_idid: {required: "ID is required"},
        publisher_name: {required: "Name is required"},
        country: {required: "Country is required"},
        founded_year: {required: "Year is required"},
    }

    const handleCreate = (publisher) => {
        create(publisher);
        setSubmitted(true);
    }
    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Publishers");
    }
    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setSubmitted(false);
        setReload(!reload);
        setSubHeading("All Publishers");
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
                    <h4>Create Publisher</h4>
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
                        <form className="form-publisher" id="form-publisher-edit" onSubmit={handleSubmit(handleCreate)}>
                            <ul className="form-publisher-errors">
                                {errors?.publisher_id && <li>{errors.publisher_id.message}</li>}
                                {errors?.publisher_name && <li>{errors.publisher_name.message}</li>}
                                {errors?.country && <li>{errors.country.message}</li>}
                                {errors?.founded_year && <li>{errors.founded_year.message}</li>}
                            </ul>
                            <div className="form-group">
                                <label>Publisher ID</label>
                                <input name="publisher_id" {...register('publisher_id', createFormOptions.publisher_id)}/>
                            </div>
                            <div className="form-group">
                                <label>Publisher Name</label>
                                <input type="text" name="publisher_name" {...register('publisher_name', createFormOptions.publisher_name)}/>
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <input name="country" {...register('country', createFormOptions.country)}/>
                            </div>
                            <div className="form-group">
                                <label>Year</label>
                                <input name="founded_year" {...register('founded_year', createFormOptions.founded_year)}/>
                            </div>
                        </form>
                    }
                </Modal.Body>
                <Modal.Footer style={{justifyContent: "center"}}>
                    <Button variant="primary" form="form-publisher-edit" type="submit"
                            style={{display: (!showButton) ? "none" : ""}}>Create</Button>
                    <Button variant="secondary" onClick={handleCancel}
                            style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}
                            style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreatePublisher;