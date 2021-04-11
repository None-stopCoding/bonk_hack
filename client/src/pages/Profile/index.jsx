import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import "./profile.css"
import Grid from "@material-ui/core/Grid";
import {useHttp} from "../../hooks/http.hook";

const PersonalInformation = () => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [info, setInfo] = useState({});

    const getPersonalInfo = async (status) => {
        const data = await request('/api/profile/get', 'POST', {
            user_id: auth.userId
        });
        // debugger;
        setInfo(data);
    }


    useEffect(() => {
        getPersonalInfo();
    }, []);

    const getCompetence = () => {
        let listCompetence = [];
        if (info.competences != undefined){
            if (info.competences.length > 0) {
                let counter = 1;
                info.competences.forEach((competence) => {
                    listCompetence.push(
                        <tr>
                            <td>{counter}</td>
                            <td>{competence.name}</td>
                            <td>{competence.comment}</td>
                            <td>Название проекта Тест</td>
                        </tr>
                    )
                    counter++;
                })

                return (
                    <div className="container">
                        <div className="row align-items-center flex-row justify-content-center">
                            <div className="fresh-table full-color-orange">
                                <table id="fresh-table" className="table">
                                    <thead>
                                    <th data-field="id">ID</th>
                                    <th data-field="name">Название</th>
                                    <th data-field="desc">Описание</th>
                                    <th data-field="project">Проект</th>
                                    </thead>
                                    <tbody>
                                    {listCompetence}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="container">
                <div className="row align-items-center flex-row justify-content-center">
                </div>
            </div>
        )
    }

    return (
        <section className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="dark-color">Профиль:</h3>
                            <h6 className="theme-color lead"></h6>
                            <p>
                                Сюда можно что-то вставить!
                            </p>
                            <div className="row about-list">
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>Фамилия</label>
                                        <p>{info.surname}</p>
                                    </div>
                                    <div className="media">
                                        <label>Имя</label>
                                        <p>{info.name}</p>
                                    </div>
                                    <div className="media">
                                        <label>Отчество</label>
                                        <p>{info.second_name}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>Тест 1</label>
                                        <p>Тест 1</p>
                                    </div>
                                    <div className="media">
                                        <label>Тест 1</label>
                                        <p>Тест 1</p>
                                    </div>
                                    <div className="media">
                                        <label>Тест 1</label>
                                        <p>Тест 1</p>
                                    </div>
                                    <div className="media">
                                        <label>Тест 1</label>
                                        <p>Тест 1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="counter">
                    <div className="row">
                        <div className="col-4 col-lg-4">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="500" data-speed="500">{info.in_work}</h6>
                                <p className="m-0px font-w-600">Проектов в работе</p>
                            </div>
                        </div>
                        <div className="col-4 col-lg-4">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="150" data-speed="150">{info.ready}</h6>
                                <p className="m-0px font-w-600">Успешно завершенных</p>
                            </div>
                        </div>
                        <div className="col-4 col-lg-4">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="850" data-speed="850">{info.comp}</h6>
                                <p className="m-0px font-w-600">Количество компетенций</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {getCompetence()}
        </section>
    )
}

const Profile = () => {
    const role = 2;
    const information = () => {
        if (role === 1) {
            return (
                <div>
                    <Grid item xs={6}>
                        <PersonalInformation/>
                    </Grid>
                    <Grid item xs={6}>
                        <PersonalInformation/>
                    </Grid>
                </div>
            )
        }
        return (
            <div>
                <Grid item xs={12}>
                    <PersonalInformation/>
                </Grid>
            </div>
        )
    }
    return information();
}

export default Profile;