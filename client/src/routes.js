import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Students from './pages/Students';
import AuthPage from './pages/AuthPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile" exact>
                    <Profile />
                </Route>
                <Route path="/projects" exact>
                    <Projects />
                </Route>
                <Route path="/students">
                    <Students />
                </Route>
                <Redirect to="/profile"/>
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
};