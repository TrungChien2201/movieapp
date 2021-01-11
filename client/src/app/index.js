import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { MoviesList, MoviesInsert, MoviesUpdate, Login } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import Authorzited from '../Authozited';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Authorzited path="/movies/list" component={MoviesList} />
                <Route path="/movies/create" exact component={MoviesInsert} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={MoviesUpdate}
                />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Router>
    )
}

export default App
