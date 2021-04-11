import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {useRoutes} from './routes';
import clsx from 'clsx';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import Navbar from './pages/Navbar';
// import {Loader} from './components/Loader';
import './App.css';
import 'materialize-css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const App = () => {
  const {ready, token, login, logout, userId, role} = useAuth();
	const isAuthenticated = !!token;
  const [open, setOpen] = React.useState(false);
  const routes = useRoutes(isAuthenticated);
  const classes = useStyles();

  if (!ready) {
    return "Loading...";
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, role, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar {...{ open, setOpen }} /> }
        <div className="App">
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            {routes}
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;