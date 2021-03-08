import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Authorzited from '../../Authozited';
import { NavBar } from '../../components';
import { Login, MoviesInsert, MoviesList, MoviesUpdate } from '../../pages';
import ForgotPassword from '../../pages/user/forgot-password';
import Register from '../../pages/user/register';

const LayoutBlank  = () => {
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
                
                <Route path="/register" exact component={Register} /> 
                <Route path="/forgot" exact component={ForgotPassword} /> 
            </Switch>
        </Router>
    )
}
export default LayoutBlank;