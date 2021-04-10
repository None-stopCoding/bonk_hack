import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import List from '../../components/List';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {useHttp} from "../../hooks/http.hook";

const personalInformation = () => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();

    const getPersonalInfo = async (status) => {
        const data = await request('', 'POST', {

        });
        debugger;

    }

    return (

    )
}

const Profile = () => {
    return (
      <div>
          <Container maxWidth="sm">
              <Grid item xs={4}>
                
              </Grid>
              <Grid item xs={4}>

              </Grid>
              <Grid item xs={4}>

              </Grid>
          </Container>
      </div>
    );
}

export default Profile;