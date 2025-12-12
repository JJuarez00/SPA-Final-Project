/*
Name: Ethan Mull
Date: 12/8/2025
File: editPlatform.jsx
Description:
 */

import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "/src/assets/css/platform.css";

import React from 'react';

const EditPlatform = () => {

    const {error, isLoading, data: response, update} = UseFetch();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: data,
        shouldUseNativeValidation: false
    });
    const editFormOptions = {
        platform_id: {required: "ID is required"},
        platform_name: {required: "Name is required"},
        form_factor: {required: "Form is required"},
        generation: {required: "Generation is required"},
        release_year: {required: "Release Year is required"}
    }

    const handleUpdate = (platform) => {
        update(platform);
        setSubmitted(true);
    }
    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Platforms");
        navigate("/platforms")
    }
    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setSubmitted(false);
        setReload(!reload);
        setSubHeading("All Platforms");
        navigate("/platforms")
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
                    <h4>Edit Platform</h4>
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
                        <form className="form-platform" id="form-platform-edit" onSubmit={handleSubmit(handleUpdate)}>
                            <ul className="form-platform-errors">
                                {errors?.platform_id && <li>{errors.platform_id.message}</li>}
                                {errors?.platform_name && <li>{errors.platform_name.message}</li>}
                                {errors?.form_factor && <li>{errors.form_factor.message}</li>}
                                {errors?.generation && <li>{errors.generation.message}</li>}
                                {errors?.release_year && <li>{errors.release_year.message}</li>}
                            </ul>
                            <div className="form-group">
                                <label>Platform ID</label>
                                <input name="platform_id" readOnly="readOnly" {...register('platform_id', editFormOptions.platform_id)}/>
                            </div>
                            <div className="form-group">
                                <label>Platform Name</label>
                                <input type="text" name="platform_name" {...register('platform_name', editFormOptions.platform_name)}/>
                            </div>
                            <div className="form-group">
                                <label>Form Factor</label>
                                <input name="form_factor" {...register('form_factor', editFormOptions.form_factor)}/>
                            </div>
                            <div className="form-group">
                                <label>Generation</label>
                                <input name="generation" {...register('generation', editFormOptions.generation)}/>
                            </div>
                            <div className="form-group">
                                <label>Release Year</label>
                                <input name="release_year" {...register('release_year', editFormOptions.release_year)}/>
                            </div>
                        </form>}
                </Modal.Body>
                <Modal.Footer style={{justifyContent: "center"}}>
                    <Button type="submit" form="form-platform-edit" variant="primary"
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

export default EditPlatform;
