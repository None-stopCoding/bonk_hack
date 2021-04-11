import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {useHttp} from '../../hooks/http.hook';
import {AuthContext} from '../../context/AuthContext';
import List from '../../components/List';
import Modal from './../../components/Modal';
import ProjectCard from './../../pages/cards/Project';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Dialog from './../../components/Dialog';

import './index.css';

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
        margin: '0 30px',
        width: '100%'
    },
    addProject: {
        width: 182,
        fontSize: 16,
        marginRight: 40
    },
    formCreate: {
        flexDirection: 'column'
    }
  }));

const defaultCreateForm = {
    name: '',
    documents: '',
    userId: '',
    mentor: ''
};

const Projects = () => {
    const [value, setValue] = useState(0);
    const auth = useContext(AuthContext);
    const {request, loading} = useHttp();
    const classes = useStyles();
    const [listItems, setList] = useState([]);
    const [projectOpen, setProjectOpen] = useState(false);
    const [curProject, setCurProject] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const [mentors, setMentors] = useState([]);
    const [studentsWanted, setStudentsWanted] = useState([]);
    const [universities, setUniversities] = useState([]);

    const [createForm, updateCreateProjectForm] = useState(defaultCreateForm);

    const [dialogContent, changeDialogContent] = useState('createProject');
    const [dialogResult, setDialogResult] = useState({});
    const [dialogHeaders, setDialogHeaders] = useState({
        title: '',
        titleAction: ''
    });
    const [afterCloseAction, setAfterCloseAction] = useState(() => {});

    const changeCreateFormHandler = event => {
		updateCreateProjectForm({ ...createForm, [event.target.name]: event.target.value })
	};
    const changeDialogResult = event => {
        setDialogResult({...dialogResult, [event.target.name]: event.target.value })
    };

    const onDialogOpen = (extra) => {
        setDialogResult({ ...dialogResult, ...extra });
        setOpenDialog(true);
    };
    useEffect(() => {
        const config = {
            'createProject': {
                title: "Создание проекта",
                titleAction: "Создать"
            },
            'chooseStudentToInvite': {
                title: 'Выберите студента на проект',
                titleAction: 'Пригласить'
            },
            'chooseUniversityToSendProject': {
                title: 'Выберите университет для предложения проекта',
                titleAction: 'Отослать предложение'
            }
        }
        setDialogHeaders({
            title: config[dialogContent].title,
            titleAction: config[dialogContent].titleAction
        });
    }, [dialogContent]);

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
        setList(data);
    };

    useEffect(() => {
        getProjects();
    }, [value]);

    useEffect(async () => {
        let data = await request('/api/pm/student/wanted', 'POST', { orgId: auth.orgId });
        setStudentsWanted(data);

        data = await request('/api/vus/all', 'POST', {});
        setUniversities(data);
    }, []);


    const openProjectModal = async (project) => {
        const data = await request(`/api/project`, 'POST', {
            id: project.id
        });

        setCurProject(data);
        setProjectOpen(true);
    }

    const closeProjectModal = () => {
        setCurProject(null);
        setProjectOpen(false);
    }


    const createProject = async () => {
        const data = await request(`/api/profile/get/mentors`, 'POST', {});
        setMentors(data);
        setOpenDialog(true);
    }

    const closeDialog = async () => {
        setOpenDialog(false);

        switch (dialogContent) {
            case 'createProject':
                await request(`/api/project/create`, 'POST', {...createForm, userId: auth.userId});
                getProjects();
                updateCreateProjectForm(defaultCreateForm);
                break;
            case 'chooseStudentToInvite':
                await request('/api/project/pm/invite', 'POST', {
                    projectId: dialogResult.projectId,
                    studentId: dialogResult.studentId,
                    projectRole: dialogResult.projectRole
                });
                setDialogResult({});
                changeDialogContent('createProject');
                break;
            case 'chooseUniversityToSendProject':
                await request('/api/project/pm/redirect', 'POST', {
                    userId: auth.userId,
                    projectId: dialogResult.projectId,
                    vusId: dialogResult.vusId
                });
                setDialogResult({});
                changeDialogContent('createProject');
                break;
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.projectWrapper}>
                <div className={classes.projectList}>
                <AppBar position="static" color="default">
                    <div className='row'>
                        <div className="col">
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
                                            <Tab key={index} label={item} icon={<AssignmentIcon />} {...a11yProps(index)} />            
                                        )
                                    })
                                }
                            </Tabs>
                        </div>
                        <div className="col d-flex align-items-center justify-content-end">
                            {
                                auth.role === 'Project manager' ?
                                <Button variant="contained" color="primary" className={classes.addProject} onClick={createProject}>
                                    Создать проект
                                </Button> : <></>
                            }
                        </div>
                    </div>
                </AppBar>
                
                {
                    loading ?
                    <div className={classes.spinnerWrapper}>
                        <CircularProgress className={classes.spinner}/>
                    </div>
                    :
                    getItemsByRole().map((item, index) => {
                        return (
                            <TabPanel value={value} index={index} key={index}>
                                <List {...{
                                    items: listItems,
                                    onItemClick: openProjectModal,
                                    content: 'project',
                                    contentOptions: {
                                        status: item,
                                        reload: getProjects,
                                        dialog: {
                                            changeDialogContent,
                                            open: onDialogOpen
                                        }
                                    },
                                }}/>
                            </TabPanel>
                        );
                    })
                }
                </div>
            </div>
        {
            curProject &&
            <Modal {...{ open: projectOpen, close: closeProjectModal }}>
                <ProjectCard project={curProject} />
            </Modal>
        }

        <Dialog {...{
            open: openDialog,
            close: closeDialog,
            title: dialogHeaders.title,
            titleAction: dialogHeaders.titleAction
        }}>
            {
                dialogContent === 'createProject' ?
                    <form className={classes.formCreate} noValidate autoComplete="off">
                        <TextField id="outlined-basic" name="name" label="Название проекта" variant="outlined" onChange={changeCreateFormHandler}/>
                        <TextField id="outlined-basic" name="documents" label="Документы" variant="outlined" onChange={changeCreateFormHandler}/>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Наставник</InputLabel>
                            <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            name="mentor"
                            value={mentors.find((mentor) => mentor.id === createForm.mentor)?.name}
                            onChange={changeCreateFormHandler}
                            >
                            {
                                mentors.map((item, index) => <MenuItem value={item.id} key={index}>{`${item.surname} ${item.name} ${item.second_name}`}</MenuItem>)
                            }
                            </Select>
                            <FormHelperText>Выберите наставника проекта</FormHelperText>
                        </FormControl>
                    </form> :
                dialogContent === 'chooseStudentToInvite' ?
                    <form className={classes.formCreate} noValidate autoComplete="off">
                        <TextField id="outlined-basic" name="projectRole" label="Роль в проекте" variant="outlined" onChange={changeDialogResult}/>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Студент</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="studentId"
                                onChange={changeDialogResult}
                            >
                            {
                                studentsWanted.map((item, index) => <MenuItem value={item.id_user} key={index}>{`${item.surname} ${item.name}`}</MenuItem>)
                            }
                            </Select>
                            <FormHelperText>Выберите студента для участия в проекте</FormHelperText>
                        </FormControl>
                    </form> :
                dialogContent === 'chooseUniversityToSendProject' ?
                    <form className={classes.formCreate} noValidate autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Университет</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="vusId"
                                value={universities.find((student) => student.id === dialogResult.vusId)?.name}
                                onChange={changeDialogResult}
                            >
                            {
                                universities.map((item, index) => <MenuItem value={item.id} key={index}>{`${item.name}`}</MenuItem>)
                            }
                            </Select>
                            <FormHelperText>Выберите стулента дял участия в проекте</FormHelperText>
                        </FormControl>
                    </form> : <></>
            }
        </Dialog>
        </div>
    )
};

export default Projects;