import { Table, Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Input } from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions'
import { ModalUI } from '../../components/UI/ModalUI'
import './style.css'
import { generatePublicURL } from '../../urlConfig'

/**
* @author
* @function Products
**/

export const Products = (props) => {

    // state variables
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [productPicture, setProductPicture] = useState([])
    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const dispatch = useDispatch()

    // modal state variables
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false)
    const [productDetails, setProductDetails] = useState(null)


    const handleClose = () => {
        const form = new FormData();
        form.append('name', name)
        form.append('quantity', quantity)
        form.append('description', description)
        form.append('category', categoryId)
        form.append('price', price)

        for (let pic of productPicture) {
            form.append('productPicture', pic)
        }

        dispatch(addProduct(form))
        setShow(false);
    };
    const handleShow = () => setShow(true);

    // function to create a categoryList
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    //function to store picture
    const handleProductPicture = (e) => {
        setProductPicture([...productPicture, e.target.files[0]])
    }

    console.log(productPicture);



    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>

                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {product.products.length > 0 ?

                        product.products.map(product =>
                            <tr onClick={() => showProductDetailModal(product)} key={product._id}>
                                <td></td>
                                <td>
                                    <div>
                                        <img style={{ height: '30px' }} src={generatePublicURL(product.productPicture[0].image)} />
                                    </div>  
                                </td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category.name}</td>
                            </tr>)
                        : null
                    }

                </tbody>
            </Table>)
    }

    const renderAddProductsModal = () => {
        return (
            <ModalUI
                show={show}
                handleClose={handleClose}
                modalTitle={'Add a Product'}
            >
                <Input
                    value={name}
                    placeholder={`Enter a product name`}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    value={quantity}
                    placeholder={`Enter a product quantity`}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    value={price}
                    placeholder={`Enter a product price`}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    value={description}
                    placeholder={`Enter a product description`}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select className='form-control'
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)} >
                    <option>select option</option>
                    {

                        createCategoryList(category.categories).map(option =>
                            <option key={option.name} value={option.value}>{option.name}</option>
                        )
                    }
                </select>
                {console.log(category)}
                {
                    productPicture.length > 0 ?
                        productPicture.map((pic, index) => <div key={index}>{JSON.stringify(pic)}</div>) :
                        null
                }
                <input type='file' name='productPicture' className='form-control image' onChange={handleProductPicture} />


            </ModalUI>
        )
    }

    const showProductDetailModal = (product) => {
        setProductDetails(product)
        setProductDetailModal(true)

    }

    const renderProductsDetailsModal = () => {
        if (!productDetails) {
            return null
        }
        return (
            <ModalUI
                show={productDetailModal}
                handleClose={() => setProductDetailModal(false)}
                modalTitle={'Product Details'}
                size={'lg'}
            >
                <Row>
                    <Col md={6}>
                        <label className='key'>Name:</label>
                        <p className='value'>{productDetails.name}</p>
                    </Col>
                    <Col md={6}>
                        <label className='key'>Price:</label>
                        <p className='value'>{productDetails.price}</p>
                    </Col>
                    <Col md={6}>
                        <label className='key'>Quantity:</label>
                        <p className='value'>{productDetails.quantity}</p>
                    </Col>
                    <Col md={6}>
                        <label className='key'>Category:</label>
                        <p className='value'>{productDetails.category.name}</p>
                    </Col>
                    <Col md={12}>
                        <label className='key'>Description:</label>
                        <p className='value'>{productDetails.description}</p>
                    </Col>

                    <Col md={12}>
                        <div className='key'>Product Picture</div>
                        <Row>
                            {productDetails.productPicture.map(picture =>
                                <div className='productImage'>
                                    <img src={generatePublicURL(picture.image)} />
                                </div>
                            )
                            }
                        </Row>
                    </Col>

                </Row>

            </ModalUI>
        )
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Product</h3>
                            <button className='btn btn-primary' onClick={handleShow}><i className='fa fa-plus'  ></i></button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductsModal()}
            {renderProductsDetailsModal()}
        </Layout>
    )

}