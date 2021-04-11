import React, { useEffect, useContext, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';

const getContentByOption = (item, option, contentOptions) => {
    switch (option) {
        case 'project': return <ProjectItem {...{ item, ...contentOptions }}/>
    }
};

const useStyles = makeStyles((theme) => ({
    projectItem: {
        display: 'flex',
        position: 'relative',
        width: '100%'
    },
    projectItemAuthor: {
        position: 'absolute',
        left: 400
    },
    projectItemButtons: {
        alignSelf: 'flex-end'
    },
    projectItemButton: {
        marginLeft: 10
    }
  }));

const ProjectItem = ({ item, status, reload, dialog }) => {
    const classes = useStyles();
    const { request } = useHttp();
    const auth = useContext(AuthContext);

    const getActionsByRole = (project) => {
        const requestDefaultBody = {
            userId: Number(auth.userId),
            projectId: Number(project.id)
        };

        switch (auth.role) {
            case 'Student':
                switch (status) {
                    case 'Заявки':  return [
                        {
                            color: 'default',
                            name: 'Принять',
                            action: () => request('/api/project/student/accept', 'POST', requestDefaultBody)
                        }, {
                            color: 'red',
                            name: 'Отклонить',
                            action: () => request('/api/project/student/drop', 'POST', requestDefaultBody)
                        }
                    ];
                    case 'Выполнение': return [
                        {
                            name: 'Сдать',
                            action: () => request('/api/project/student/send', 'POST', requestDefaultBody)
                        }
                    ];
                    default: return [] 
                }
            case 'Project manager':
                switch (status) {
                    case 'Новые проекты': return [
                        {
                            name: 'Пригласить',
                            action: async () => {
                                dialog.changeDialogContent('chooseStudentToInvite');
                                dialog.open({ projectId: project.id });
                            }
                        }, {
                            name: 'Передать',
                            action: () => {
                                dialog.changeDialogContent('chooseUniversityToSendProject');
                                dialog.open({ projectId: project.id });

                                return request();
                            }
                        }, {
                            name: "Удалить",
                            action: () => request('/api/project/pm/delete', 'POST', {
                                projectId: project.id
                            })
                        }
                    ]
                }
            case 'Mentor': return []; break;
        }
    };

    const handleContextMenuAction = async (event, action) => {
        event.stopPropagation();
        const actionResult = await action();
        reload();
    }

    return (
        <div className={classes.projectItem}>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
            <ListItemText primary={item.author} className={classes.projectItemAuthor}/>
            <div className={classes.projectItemButtons}>
            {
                getActionsByRole(item).map((button) => {
                    return (
                        <Button
                            variant="contained"
                            color={button.color}
                            className={classes.projectItemButton}
                            startIcon={button.startIcon}
                            endIcon={button.endIcon}
                            onClick={(e) => handleContextMenuAction(e, button.action)}
                        >
                            {button.name}
                        </Button>
                    )
                })
            }  
            </div>
        </div>
    );
};

const CustomList = ({ items, onItemClick, content, contentOptions }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const openHelpDialog = () => {
        setOpenDialog(true);
    }

    const dialogOptions = {
        openDialog
    };

    return (
        <>
            <List component="nav" aria-label="main mailbox folders">
                {
                    items.map((item, index) => {
                        return (
                            <ListItem button key={index} onClick={() => onItemClick(item)}>
                                {
                                    getContentByOption(item, content, contentOptions)
                                }
                            </ListItem>
                        )
                    })
                }
            </List>
        </>
    )
};

export default CustomList;