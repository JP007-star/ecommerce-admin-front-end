import React from 'react'
import { ModalUI } from '../../../components/UI/ModalUI'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { Input } from '../../../components/UI/Input'
const UpdateModal = (props) => {
    
    const { 
        size,
        show,
        handleClose,
        modalTitle,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        createCategoryList,
        onSubmit
     } = props

     console.log({expandedArray,checkedArray});
     
    return (
        <ModalUI
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
            size={size}
        >
           
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 && expandedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Enter a category name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </Col>
                        <Col>
                            <select className='form-control'
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')} >
                                <option>select option</option>
                                {
                                    createCategoryList.map(option =>
                                        <option key={option.name} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <select className='form-control'
                             value={item.type}
                             onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')} 
                             >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>)
            }
            <Row>
                <Col>
                    <h6>Checked</h6>
                </Col>
            </Row>
            {
                checkedArray.length > 0 && checkedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Enter a category name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Col>
                        <Col>
                            <select className='form-control'
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')} >
                                <option>select option</option>
                                {
                                    createCategoryList.map(option =>
                                        <option key={option.name} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Col>
                        <Col>
                            <select className='form-control'
                              value={item.type}
                              onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}>
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>)
            }



            {/* <input type='file' name='categoryImage' onChange={handleCategoryImage} /> */}
        </ModalUI>
    )
}
export default UpdateModal;