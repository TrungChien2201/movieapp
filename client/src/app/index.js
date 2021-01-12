import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components';
import { MoviesList, MoviesInsert, MoviesUpdate, Login } from '../pages';
import Register from '../pages/user/Register.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Authorzited from '../Authozited';
import ForgotPassword from '../pages/user/Forgot.tsx';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Authorzited path="/movies/list" component={MoviesList} />
                <Authorzited path="/movies/create" component={MoviesInsert} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={MoviesUpdate}
                />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} /> 
                <Route path="/forgot" exact component={ForgotPassword} /> 
            </Switch>
        </Router>
    )
}

export default App
