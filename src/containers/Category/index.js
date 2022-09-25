
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, deleteCategory, getAllCategory, updateCategory } from '../../actions'
import { Layout } from '../../components/Layout'
import { ModalUI } from '../../components/UI/ModalUI'
import { Input } from '../../components/UI/Input'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io' //add component name instead of span tag
import UpdateModal from './components/UpdateModal'
import { AddModal } from './components/AddModal'
import '../Category/components/style.css'
/**
* @author
* @function Category
**/

export const Category = (props) => {
    const category = useSelector(state => state.category)
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [updatedCategoriesModal, setUpdatedCategoriesModal] = useState(false)
    const [deletedCategoriesModal, setDeletedCategoriesModal] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const [show, setShow] = useState(false)


    const handleClose = () => {
        if(categoryName==''){
            alert('category Name is required')
        }
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
    const handleupdateCategoryModal = () => setUpdatedCategoriesModal(true);





    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const updatedCategoryTigger = () => {
        updateCheckedAndExpanded()
        setUpdatedCategoriesModal(true);
       
    }
    const updateCheckedAndExpanded = () =>{
        const categories = createCategoryList(category.categories)
        const checkedArray = []
        const expandedArray = []
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)
        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }

   

    const handleCategoryInput = (key, value, index, type) => {
        if (type == 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckedArray)
        } else if (type == 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setExpandedArray(updatedExpandedArray)
        }
    }

    console.log({ category });
    const renderCategories = (categories) => {
        let component = []
        for (let category of categories) {
            component.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }

            );
        }
        return component;
    }
    const updateCategoryForm = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '')
            form.append('type', item.type)
        })
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '')
            form.append('type', item.type)
        })
        dispatch(updateCategory(form))
            // .then(result => {
            //     dispatch(getAllCategory())
            // });
        setUpdatedCategoriesModal(false)
    }

    

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    const deleteCategoryTigger = () => {
        updateCheckedAndExpanded()
        setDeletedCategoriesModal(true)
        
    }
    const deleteCategories =() =>{
        const checkedIdArray=checkedArray.map((item,index)=>({_id:item.value}))
        const expandedIdArray=expandedArray.map((item,index)=>({_id:item.value}))
        const idsArray=expandedIdArray.concat(checkedIdArray);
        if(checkedArray.length > 0){
        dispatch(deleteCategory(checkedIdArray))
        .then(result => {
            if(result){
            dispatch(getAllCategory())
            setDeletedCategoriesModal(false)
            }
        });
    }
    }

    const renderDeleteModal = () => {
        console.log('delete',checkedArray);
        return (
            <ModalUI
                modalTitle={'Confirm Deletion'}
                show={deletedCategoriesModal}
                handleClose={() => setDeletedCategoriesModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
             <h6>Expanded</h6>
             {expandedArray.map((item,index) => <span key={index}>{item.name}</span>)}
              <h6>Checked</h6>
              {checkedArray.map((item,index) => <span key={index}>{item.name}</span>)}
            </ModalUI>
        )
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3>Category</h3>
                        {/* <div style={{ display: 'flex', float: 'right' }}>
                            <button className='btn btn-primary m-3' onClick={handleShow}><i className='fa fa-plus'  ></i></button>
                            <button className="btn btn-secondary m-3" onClick={updatedCategoryTigger} ><i className='fa fa-edit'></i></button>
                            <button className="btn btn-danger m-3" onClick={deleteCategoryTigger} ><i className='fa fa-trash'></i></button>
                        </div> */}
                        <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
                                <button onClick={updatedCategoryTigger}><IoIosCloudUpload /> <span>Edit</span></button>
                                <button onClick={deleteCategoryTigger}><IoIosTrash /> <span>Delete</span></button>
                            </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {/* {renderCategories(category.categories)} */}
                            {/* {JSON.stringify(createCategoryList(category.categories))} */}
                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <span className="rct-icon rct-icon-check" />,
                                    uncheck: <span className="rct-icon rct-icon-uncheck" />,
                                    halfCheck: <span className="rct-icon rct-icon-half-check" />,
                                    expandClose: <span className="rct-icon rct-icon-expand-close" />,
                                    expandOpen: <span className="rct-icon rct-icon-expand-open" />,
                                    expandAll: <span className="rct-icon rct-icon-expand-all" />,
                                    collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                                    parentClose: <span className="rct-icon rct-icon-parent-close" />,
                                    parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                                    leaf: <span className="rct-icon rct-icon-leaf" />,
                                }}
                            />
                        </ul>
                    </Col>
                </Row>
            </Container>
            {/* {'Add Category Modal'} */}
           <AddModal
                show={show}
                handleClose={handleClose}
                modalTitle="Add Category "
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                createCategoryList={createCategoryList(category.categories)}
                handleCategoryImage={handleCategoryImage}
           />
            {/* {'Edit Category Modal'} */}
            <UpdateModal
                  show={updatedCategoriesModal}
                  handleClose={updateCategoryForm}
                  modalTitle={'Edit Categories'}
                  size='lg'
                  expandedArray={expandedArray}
                  checkedArray={checkedArray}
                  handleCategoryInput={handleCategoryInput}
                  createCategoryList={createCategoryList(category.categories)}

            />
            {/* {renderUpdateModal()} */}
            {/* {'Delete Category Modal'} */}
            {renderDeleteModal()}
        </Layout>
    )

}