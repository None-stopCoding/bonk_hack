import React, {useContext, useEffect} from 'react';
import "../Student/studentcard.css"

import {AuthContext} from '../../../context/AuthContext';
import {useHttp} from "../../../hooks/http.hook";


export default function StudentsCard({ project }) {
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [students, setStudents] = React.useState(null);

    const getStudents = async (status) => {
        const data = await request('/api/project/students', 'POST',{
            project_id: project.id
        });
        setStudents(data);
    }

    useEffect(() => {
        getStudents();
    }, []);

    function students_table(){
        let table_students = []
        if (students != null){
            students.forEach((student) => {
                table_students.push(
                    <tr>
                        <td>{student.name}</td>
                        <td>{student.surname}</td>
                        <td>{student.second_name}</td>
                    </tr>
                )
            })
            return (
                <div>
                    <div className="container">
                        <div className="row align-items-center flex-row justify-content-center">
                            <div className="fresh-table full-color-orange">
                                <table id="fresh-table" className="table">
                                    <thead>
                                    <th data-field="id">Имя</th>
                                    <th data-field="name">Фамилия</th>
                                    <th data-field="desc">Отчество</th>
                                    </thead>
                                    <tbody>
                                    {table_students}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="container">
                    <div className="row align-items-center flex-row justify-content-center">
                        <div className="fresh-table full-color-orange">
                            <table id="fresh-table" className="table">
                                <thead>
                                <th data-field="id">Имя</th>
                                <th data-field="name">Фамилия</th>
                                <th data-field="desc">Отчество</th>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return students_table();
}
