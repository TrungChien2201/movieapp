import React from 'react'
import { Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

function Links() {
    const history = useHistory();
    const handleLogout = () => {
        window.location.href = '/login';
      localStorage.removeItem('Auth');

    }
    
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    My first MERN Application
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/movies/list" className="nav-link">
                                List Movies
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/movies/create" className="nav-link">
                                Create Movie
                            </Link>
                        </Item>
                        <Item>
                            <Button type="link" onClick={handleLogout}>Logout</Button>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
}

export default Links
