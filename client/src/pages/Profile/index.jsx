import React, {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext';
import List from '../../components/List';
import "./project.css"
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {useHttp} from "../../hooks/http.hook";
import Avatar from "@material-ui/core/Avatar";
import {classes} from "istanbul-lib-coverage";

const PersonalInformation = () => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [info, setInfo] = useState({});

    const getPersonalInfo = async (status) => {
        const data = await request('', 'POST', {
            userId: auth.userId
        });
        debugger;
        setInfo(info);
    }

    return (
        <div>
            <Avatar src="../../user.jpg" className={classes.large}/>
            <p id="surname">Иванов</p>
            <p id="name">Иван</p>
            <p id="second_name">Иванович</p>
        </div>
    )
}

const Profile = () => {
    const role = 2;
    const information = () => {
        if (role === 1){
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
    return (
      <Container maxWidth="sm">
          {information()}
      </Container>
    );
}

export default Profile;