import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import "./studentcard.css"
import {useHttp} from "../../../hooks/http.hook";

export default function StudentCard({student}) {
    // const [expanded, setExpanded] = React.useState(false);
    const {request} = useHttp();
    const [listCompetences, setCompetences] = useState([]);
    const [listProjects, setProjects] = useState([]);

    const getCompetences = async (status) => {
        const data = await request('/api/user/competitions', 'POST', {
            userId: student.id
        });
        setCompetences(data);
    }

    const getProjects = async (status) => {
        console.log(student.id);
        const data = await request('/api/project/by_user', 'POST', {
            userId: student.id
        });
        setProjects(data);
    }

    useEffect(() => {
        getCompetences();
        getProjects();
    }, []);

    function projects() {
        let listProjects_ = []
        if (listProjects.length > 0) {
            let counter = 1
            listProjects.forEach((project) => {
                listProjects_.push(
                    <tr>
                        <td>{counter}</td>
                        <td>{project.project_name}</td>
                        <td>{`${project.author_name} ${project.author_surname} ${project.author_second_name}`}</td>
                        <td>{project.project_status}</td>
                    </tr>
                )
                counter++;
            })
            return (
                <div className="container">
                    <div className="row align-items-center flex-row justify-content-center">
                        <h4>Проекты</h4>
                        <div className="fresh-table full-color-orange">
                            <table id="fresh-table" className="table">
                                <thead>
                                <th data-field="id">ID</th>
                                <th data-field="name">Название</th>
                                <th data-field="desc">Автор</th>
                                <th data-field="project">Статус</th>
                                </thead>
                                <tbody>
                                {listProjects_}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
                <div className="row align-items-center flex-row justify-content-center">
                    <h4>Проекты</h4>
                    <div className="fresh-table full-color-orange">
                        <table id="fresh-table" className="table">
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    function competence() {
        let listCompetences_ = [];
        if (listCompetences.length > 0) {
            let counter = 1
            listCompetences.forEach((competence) => {
                listCompetences_.push(
                    <tr>
                        <td>{counter}</td>
                        <td>{competence.name}</td>
                        <td>{competence.comment}</td>
                    </tr>
                )
                counter++;
            })
            return (
                <div className="container">
                    <div className="row align-items-center flex-row justify-content-center">
                        <h4>Компоненты</h4>
                        <div className="fresh-table full-color-orange">
                            <table id="fresh-table" className="table">
                                <thead>
                                <th data-field="id">ID</th>
                                <th data-field="name">Название</th>
                                <th data-field="desc">Описание</th>
                                <th data-field="project">Проект</th>
                                </thead>
                                <tbody>
                                {listCompetences_}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="container">
                <div className="row align-items-center flex-row justify-content-center">
                    <h4>Компоненты</h4>
                    <div className="fresh-table full-color-orange">
                        <table id="fresh-table" className="table">
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="student-card">
                <Typography variant="h5" color="primary" component="h2">
                    {` ${student.name || ''} ${student.second_name || ''} ${student.surname || ''}`}
                </Typography>
            </div>
            {competence()}
            {projects()}
        </div>
    );
}
