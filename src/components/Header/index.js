import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signOut } from '../../actions'

/**
* @author
* @function Header
**/

export const Header = (props) => {
    const auth=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const logOut=()=>{
         dispatch(signOut())
    }
    const renderLoggedIn = () => {
        return (
            <Nav>
                <span className="nav-link" onClick={logOut}><i className='fa fa-sign-out'></i> Sign out</span>
            </Nav>
        )
    }
    const renderNonLoggedIn = () => {
        return (
            <Nav>
                <NavLink to="/signin" className="nav-link"><i className='fa fa-sign-in'></i> SignIn</NavLink>
                <NavLink to="/signup" className="nav-link"><i className='fa fa-user-plus'></i> SignUp</NavLink>
            </Nav>
        )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
            <Container fluid>
                <NavLink to='/' exact className='navbar-brand'>Admin Dashboard </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">


                    </Nav>
                    {auth.authenticate ? renderLoggedIn() :  renderNonLoggedIn()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}