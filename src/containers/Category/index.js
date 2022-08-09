import React, { useEffect,useState } from 'react'
import { Col, Container, Row ,Modal,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../actions'
import { Layout } from '../../components/Layout'
import {Input} from '../../components/UI/Input'


/**
* @author
* @function Category
**/

export const Category = (props) => {
    const category = useSelector(state => state.category)
    const [categoryName,setCategoryName]=useState('')
    const [parentCategoryId,setParentCategoryId]=useState('')
    const [CategoryImage,setCategoryImage]=useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategory())
    }, []);

    const renderCategories = (categories) => {
        let component = []
        for (let category of categories) {
            component.push(
                <li>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return component;
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button className='btn btn-primary' onClick={handleShow}><i className='fa fa-plus'  ></i></button>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                       value={categoryName}
                       placeholder={`Enter a category name`}
                       onChange={(e)=>setCategoryName(e.target.name)}
                     />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )

}