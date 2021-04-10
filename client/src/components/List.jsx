import React, { useEffect, useContext, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';

const CustomList = ({ items }) => {
    const {request} = useHttp();
    const auth = useContext(AuthContext);



    return (
        <List component="nav" aria-label="main mailbox folders">
            {
                items.map((item, index) => {
                    return (
                        <ListItem button key={index}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                            <ListItemText primary={item.author} />
                        </ListItem>
                    )
                })
            }
        </List>
    )
};

export default CustomList;