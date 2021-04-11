import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import "./student.css"
import PropTypes from 'prop-types';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProjectCard from "../cards/Project";
import Modal from "../../components/Modal";
import StudentCard from "../cards/Student";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

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

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 1300,
    },
    spinnerWrapper: {
        display: 'flex',
        justifyContent: "center",
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    spinner: {
        marginTop: 17
    },
    projectWrapper: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        left: 0
    },
    projectList: {
        width: '50vw'
    },
    addProject: {
        width: 182,
        height: 74,
        fontSize: 16,
        marginLeft: 300
    },
    formCreate: {
        flexDirection: 'column'
    }
}));


const Students = () => {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const permission = {
        "Mentor": ["Студенты"],
        "Project manager": ["Хотят на практику", "На практике"]
    }
    const {request, loading} = useHttp();
    const [listStudentsOverwatch, setStudentsOverwatch] = useState([]);
    const [listStudentsApply, setStudentsApply] = useState([]);
    const [listStudentsOnProjects, setStudentsOnProjects] = useState([]);
    const [value, setValue] = React.useState(0);
    const [student, setStudent] = useState([]);
    const [openStudent, setOpenStudent] = useState(false);


    const getStudentsOverwatch = async (status) => {
        const data = await request(`/api/pm/student/my`, 'POST', {
            orgId: auth.userId
        });
        setStudentsOverwatch(data);
    };

    const getStudentsApply = async (status) => {
        const data = await request(`/api/pm/student/wanted`, 'POST', {
            orgId: auth.userId
        });
        setStudentsApply(data);
    };

    const getStudentsOnProjects = async (status) => {
        const data = await request(`/api/students/get_by_org`, 'POST', {
            id_org: 1,
            projects: true
        });
        setStudentsOnProjects(data);
    };

    let handleClick = (index, listStudent) => {
        setStudent(listStudent[index]);
        setOpenStudent(true);
    }

    const closeDialogStudent = () => {
        debugger;
        setOpenStudent(false);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `scrollable-force-tab-${index}`,
            'aria-controls': `scrollable-force-tabpanel-${index}`,
        };
    }


    useEffect(() => {
        getStudentsOnProjects();
        getStudentsApply();
        getStudentsOverwatch();
    }, []);

    const ElementStudent = () => {
        let boxStudents = [], iterationStudents = null;

        if (value === 0) {
            iterationStudents = listStudentsOverwatch;
        } else if (value === 1) {
            iterationStudents = listStudentsApply;
        } else {
            iterationStudents = listStudentsOnProjects;
        }
        iterationStudents.forEach((student, index) => {
            boxStudents.push(
                <tr className="student-tr" onClick={() => handleClick(index, iterationStudents)} key={index}>
                    <td>
                        <AssignmentIndIcon/>
                    </td>
                    <td>{student.name}</td>
                    <td>{student.surname}</td>
                    <td>{student.second_name}</td>
                </tr>
            );
        });
        return (
            <div className={classes.root}>
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
                            auth.role === "Project manager" ?
                                [
                                    <Tab label="Наблюдаемые" icon={<AssignmentIndIcon/>} {...a11yProps(0)} />,
                                    <Tab label="Подали заявку" icon={<AssignmentIndIcon/>} {...a11yProps(1)} />,
                                    <Tab label="На проектах" icon={<AssignmentIndIcon/>} {...a11yProps(2)} />
                                ] : [
                                    <Tab label="На проектах" icon={<AssignmentIndIcon/>} {...a11yProps(2)} />
                                ]
                        }

                    </Tabs>
                </AppBar>
                {
                    auth.role === "Project manager" ? [
                            <TabPanel value={value} index={0}>
                                <div className="container">
                                    <div className="row align-items-center flex-row justify-content-center">
                                        <div className="fresh-table full-color-orange">
                                            <table id="fresh-table" className="table">
                                                <thead>
                                                <th/>
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
                            </TabPanel>,
                            <TabPanel value={value} index={1}>
                                <div className="container">
                                    <div className="row align-items-center flex-row justify-content-center">
                                        <div className="fresh-table full-color-orange">
                                            <table id="fresh-table" className="table">
                                                <thead>
                                                <th/>
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
                            </TabPanel>,
                            <TabPanel value={value} index={2}>
                                <div className="container">
                                    <div className="row align-items-center flex-row justify-content-center">
                                        <div className="fresh-table full-color-orange">
                                            <table id="fresh-table" className="table">
                                                <thead>
                                                <th/>
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
                            </TabPanel>
                        ] :
                        [
                            <TabPanel value={value} index={0}>
                                <div className="container">
                                    <div className="row align-items-center flex-row justify-content-center">
                                        <div className="fresh-table full-color-orange">
                                            <table id="fresh-table" className="table">
                                                <thead>
                                                <th/>
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
                            </TabPanel>
                        ]
                }
                <Modal {...{ open: openStudent, close: closeDialogStudent }}>
                    <StudentCard student={student}/>
                </Modal>
            </div>
        );
    }

    return ElementStudent();
};


export default Students;