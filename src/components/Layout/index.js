import React from 'react'
import { Col, Container, NavLink, Row } from 'react-bootstrap'
import { Header } from '../Header'
/**
* @author
* @function Layout
**/

export const Layout = (props) => {
  return(
   <>
     <Header/>
     {
      props.sidebar  ?
      <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
           
            <NavLink  href="/">Home</NavLink>
            <NavLink  href='/products'>Products</NavLink>
            <NavLink href='/orders'>Orders</NavLink>
           
        </Col>
        <Col md={10} style={{marginLeft:'auto'}}> {props.children}</Col>
      </Row>
    </Container>  :
        props.children
      
     }
    
   </>
   )

 }