
import React, { useEffect, useState } from 'react'
import { Col, Container, Row,  Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory } from '../../actions'
import { Layout } from '../../components/Layout'
import { ModalUI } from '../../components/ModalUI'
import { Input } from '../../components/UI/Input'


/**
* @author
* @function Category
**/

export const Category = (props) => {
    const category = useSelector(state => state.category)
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => {
        const form = new FormData()
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)

        dispatch(addCategory(form))
        setCategoryName('')
        setParentCategoryId('')
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()



    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

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
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
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
                            {/* {JSON.stringify(createCategoryList(category.categories))} */}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <ModalUI
               show={show}
               handleClose={handleClose}
               modalTitle={'Add a Category'}
             >
                <Input
                    value={categoryName}
                    placeholder={`Enter a category name`}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select className='form-control'
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)} >
                    <option>select option</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.name} value={option.value}>{option.name}</option>
                        )
                    }
                </select>
                <input type='file' name='categoryImage' onChange={handleCategoryImage} />
            </ModalUI>
        </Layout>
    )

}