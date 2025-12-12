/*
Name: Joseph Juarez
Date: 11/20/2025
File: students.jsx
Description: ...
*/

import {useEffect, useState} from 'react';
import UseFetch from "../../services/useFetch";
import JSONPretty from 'react-json-pretty';
import "/src/assets/css/student.css";

import React from 'react';

const Students = () => {

    const {error, isLoading, data: students, getAll} = UseFetch();
    const [subHeading, setSubHeading] = useState("All Students");
    useEffect(() => {
        getAll();
    }, []);

    return (
        <>
            <div className="main-heading">
                <div className="container">Student</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>
            <div className="main-content container">
                {error && <JSONPretty data={error}></JSONPretty>}
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                    </div>}
                {students &&
                    <div className="student-container">
                        <div className="student-row student-row-header">
                            <div className="student-info">
                                <div className="student-id">Student ID</div>
                                <div className="student-name">Name</div>
                                <div className="student-email">Email</div>
                                <div className="student-major">Major</div>
                                <div className="student-gpa">GPA</div>
                            </div>
                            <div className="student-buttons" style={{textAlign: "center"}}>Actions</div>
                        </div>
                        {students.map((student) => (
                            <div key={student.id} className="student-row">
                                <div className="student-info">
                                    <div id={"student-id-" + student.id} className="student-id">{student.id}</div>
                                    <div id={"student-name-" + student.id} className="student-name">{student.name}</div>
                                    <div id={"student-email-" + student.id} className="student-email">{student.email}</div>
                                    <div id={"student-major-" + student.id} className="student-major">{student.major}</div>
                                    <div id={"student-gpa-" + student.id} className="student-gpa">{student.gpa}</div>
                                </div>
                                <div className="student-buttons">
                                    <button className="button-light" id={student.id}>Edit</button>
                                    <button className="button-light" id={student.id}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>}
            </div>
        </>
    );
};

export default Students;
