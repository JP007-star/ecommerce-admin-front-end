import { Modal,Button } from 'bootstrap'
import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Input } from '../../components/UI/Input'

/**
* @author
* @function Products
**/

export const Products = (props) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => {
  //     const form=new FormData()
  //     form.append('name',name)
    
  
  // };
  // const handleShow = () => setShow(true);
  // const [name, setName]= useState('')
  return(
      <Layout sidebar>
          {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   
                    <Input
                       value={name}
                       placeholder={`Enter a product name`}
                       onChange={(e)=>setName(e.target.value)}
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
            </Modal> */}
      </Layout>
   )

 }