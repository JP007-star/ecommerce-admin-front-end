import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { getAllCategory } from '../../actions'
import { Layout } from '../../components/Layout'


/**
* @author
* @function Category
**/

export const Category = (props) => {
    const category=useSelector(state =>state.category)

    const dispatch=useDispatch()

    useEffect(() => {
       dispatch(getAllCategory())
    },[]);

    const renderCategories = (categories) =>{
        let component=[]
        for(let category of categories){
            component.push( 
                <li>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li> 
            );
        }
        return component;
    }
  return(
       <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between' }}>
                           <h3>Category</h3>
                           <button className='btn btn-primary'><i className='fa fa-plus'></i></button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>
       </Layout>
   )

 }