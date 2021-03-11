import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components';
import Login from '../pages/user/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutBlank from '../layouts/blank-layout';
import LayoutAdmin from '../layouts/admin-layout';

function App() {
    return (
        <Router>
            <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" component={LayoutAdmin} />
                <Route
                    path="/"
                    component={LayoutBlank}
                />
                
           
            </Switch>
            
        </Router>
    )
}

export default App
