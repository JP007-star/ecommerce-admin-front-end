import React from 'react'
import {Navbar ,Nav,Container} from 'react-bootstrap'
import {NavLink } from 'react-router-dom'

/**
* @author
* @function Header
**/

export const Header = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <NavLink to='/' exact className='navbar-brand'>Admin Dashboard </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">


                    </Nav>
                    <Nav>
                       
                        <NavLink to="/signin" className="nav-link"><i className='fa fa-sign-in'></i> SignIn</NavLink>
                        <NavLink to="/signup" className="nav-link"><i className='fa fa-user-plus'></i> SignUp</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}