import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {useHttp} from '../../hooks/http.hook';
import {AuthContext} from '../../context/AuthContext';
import List from '../../components/List';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const Projects = () => {
    const [value, setValue] = React.useState(0);
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [listItems, setList] = useState([]);

    const getItemsByRole = () => {
        const permissions = {
            "Student": ['Заявки', 'Выполнение', 'На проверке', 'Архив'],
            "Project manager": ['Новые проекты', 'На выполнении', 'Внешние проекты', 'Архив'],
            "Mentor": ['На проверке', 'Архив']
        };

        return permissions[auth.role];
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getProjects = async () => {
        const data = await request(`/api/projects`, 'POST', {
            status: value,
            userId: auth.userId
        });
        debugger;
        setList(data);
    };

    useEffect(() => {
        getProjects();
    }, [value]);

    return (
        <>
        <AppBar position="static" color="default">
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs example"
            >
                {
                    getItemsByRole().map((item, index) => {
                        return (
                            <Tab key={index} label={item} icon={<PhoneIcon />} {...a11yProps(index)} />            
                        )
                    })
                }
            </Tabs>
        </AppBar>
        
        {
            getItemsByRole().map((item, index) => {
                return (
                    <TabPanel value={value} index={index} key={index}>
                        <List {...{ items: listItems  }}/>
                    </TabPanel>
                );
            })
        }
        </>
    )
};

export default Projects;