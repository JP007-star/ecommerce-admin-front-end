import React from "react"
import { ModalUI } from '../../../components/UI/ModalUI'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { Input } from '../../../components/UI/Input'

export const AddModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        createCategoryList,
        handleCategoryImage
    } = props
    return (<ModalUI
        show={show}
        handleClose={handleClose}
        modalTitle={modalTitle}
    >
        <Row>
            <Col>
                <Input
                    value={categoryName}
                    placeholder={`Enter a category name`}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </Col>

            <Col>
                <select className='form-control'
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)} >
                    <option>select option</option>
                    {
                        createCategoryList.map(option =>
                            <option key={option.name} value={option.value}>{option.name}</option>
                        )
                    }
                </select>
            </Col>
        </Row>
        <Row>
            <Col>
                <Input type='file' name='categoryImage' onChange={handleCategoryImage} />
            </Col>
        </Row>


    </ModalUI>)
}