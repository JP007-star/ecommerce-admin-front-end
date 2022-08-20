import { Modal, Button, Container,Row ,Col} from 'react-bootstrap'
import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Input } from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions/product.action'

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
    const dispatch = useDispatch()

    // modal state variables
    const [show, setShow] = useState(false);

    const handleClose = () => {
        const form=new FormData();
        form.append('name', name)
        form.append('quantity', quantity)
        form.append('description', description)
        form.append('category', categoryId)
        form.append('price', price)
        
        for (let pic of productPicture){
            form.append('productPicture', pic)
        }

        dispatch(addProduct(form))
        setShow(false);
    };
    const handleShow = () => setShow(true);

    // function to create a categoryList
    const createCategoryList=(categories,options=[]) => {
        for(let category of categories) {
            options.push({value: category._id,name:category.name});
            if(category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    //function to store picture
    const handleProductPicture=(e) => {
        setProductPicture([...productPicture,e.target.files[0]])
    }

    console.log(productPicture);

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
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

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
                      onChange={(e)=>setCategoryId(e.target.value)} >
                        <option>select option</option>
                        <option value='62a6325c9a62541cf29238d7'>Samsung</option>

                        {
                          
                            createCategoryList(category.categories).map(option =>
                                  <option key={option.name} value={option.value}>{option.name}</option>
                                )
                        }
                     </select>
                     {  console.log(category)}
                     {
                        productPicture.length > 0 ?
                        productPicture.map((pic,index)=><div key={index}>{JSON.stringify(pic)}</div>) :
                        null
                     }
                     <input type='file' name='productPicture' className='form-control image' onChange={handleProductPicture} />


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