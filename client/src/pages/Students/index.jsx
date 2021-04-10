import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import "./student.css"
import ListItem from "@material-ui/core/ListItem";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const Students = () => {
    const auth = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [listStudents, setStudents] = useState([]);

    const getStudents = async (status) => {
        const data = await request(`/api/students/all`, 'POST', {});
        setStudents(data);
    };

    let handleClick = (e) => {
        alert('eeee');
    }

    useEffect(() => {
        getStudents();
    }, []);

    const ElementStudent = () => {
        let boxStudents = [];
        listStudents.forEach((student) => {
            boxStudents.push(
                <tr className="student-tr" onClick={handleClick}>
                    <td>
                        <AssignmentIndIcon/>
                    </td>
                    <td>{student.name_org}</td>
                    <td>{student.name_user}</td>
                    <td>{student.surname}</td>
                    <td>{student.second_name}</td>
                </tr>
            );
        });
        return (
            <div className="container">
                <div className="row align-items-center flex-row justify-content-center">
                    <div className="fresh-table full-color-orange">
                        <table id="fresh-table" className="table">
                            <thead>
                            <th></th>
                            <th data-field="id">Университет</th>
                            <th data-field="name">Имя</th>
                            <th data-field="desc">Фамилия</th>
                            <th data-field="project">Отчество</th>
                            </thead>
                            <tbody>
                            {boxStudents}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return ElementStudent();
};

export default Students;