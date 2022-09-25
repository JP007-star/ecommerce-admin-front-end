import React from 'react'
import { Col, Container, NavLink, Row } from 'react-bootstrap'
import { Category } from '../../containers/Category';
import { Header } from '../Header'
/**
* @author
* @function Layout
**/
let active=[]
active=window.location.href.split('/');
export const Layout = (props) => {
  return(
   
   <>
     <Header/>
    {console.log(active[3])}
     { 
      props.sidebar  ?
      <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
           <ul>
            <li><NavLink  href="/"  className={(active[3]=='') ? 'active' : ''} >Home</NavLink></li>
            <li><NavLink  href="/page"  className={(active[3]=='page') ? 'active' : ''} >Page</NavLink></li>
            <li><NavLink  href="/category"  className={(active[3]=='category') ? 'active' : ''}>Category</NavLink></li>
            <li><NavLink  href='/products' className={(active[3]=='products') ? 'active' : ''}>Products</NavLink></li>
            <li><NavLink href='/orders' className={(active[3]=='orders') ? 'active' : ''}>Orders</NavLink></li>
          </ul>
        </Col>
        <Col md={10} style={{marginLeft:'auto',paddingTop:'60px'}}> {props.children}</Col>
      </Row>
    </Container>  :
        props.children
      
     }
    
   </>
   )

 }