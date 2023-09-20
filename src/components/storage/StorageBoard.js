import React, { useEffect, useState } from "react";
import {Container, Row, Col, Button, Table, Form,Collapse, Spinner} from "react-bootstrap";
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

import {addItem} from "../../store/actions/storageActions"
import StorageItem from "./StorageItem"
import { useMediaQuery } from 'react-responsive'

import {Helmet} from "react-helmet";

const StorageBoard = (props) => {
    var {addItem,storage} = props

    const isMobile = useMediaQuery({ query: '(max-width: 765px)' })
    const [add, setAdd] = useState(false)
    const [newItem, setNewItem] = useState({"measurementUnit":"pcs"})

    const handleAdd = () => {
        setAdd(!add)
    }

    const handleChange = (e, name) => {
        var value = ""
      
        if(name === "expirationDate"){
            value = e.target.valueAsDate
        }else{
            value = e.target.value
        }
   
        setNewItem({...newItem, [name] : value})
    }

    const handleSave = (e) => {
        e.preventDefault()
        
        if(Object.keys(newItem).length === 4){
            if(newItem.name !== "" && newItem.amount !== "" && newItem.measurementUnit !== "" && newItem.expirationdate !== ""){ 
                addItem(newItem)
                handleAdd()
            }
        }
    }

    const renderItem = (item, id) => {
        if(Object.keys(item).length > 1){
            return(
                <StorageItem key = {item.id} item = {item}/>
            )
        }else{
            console.log("nechapem kde som sa zobral", item)
        }
    }

    const showForm = () => {
        return(
            <Collapse className={"p-1"} in={add}>
                <Form id="addFormCollapse">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={(e) => handleChange(e,"name")} required/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter Amount" onChange={(e) => handleChange(e,"amount")} required/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridUnit">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control as="select" placeholder="Choose Unit" onChange={(e) => handleChange(e,"measurementUnit")} defaultValue="pcs" required>
                                <option>pcs</option>
                                <option>kg</option>
                                <option>g</option>
                                <option>l</option>
                                <option>ml</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridExpiration">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Expiration Date" onChange={(e) => handleChange(e,"expirationDate")} required/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button type="submit" variant = {"success"} style ={{"fontWeight":"bold"}} onClick={(e) => handleSave(e)}>Save</Button>
                    </Form.Row>
                </Form>
            </Collapse>
        )
    }

    const showFormMobile = () => {
        return(
            <Collapse className={"p-1"} in={add}>
                <Form id="addFormCollapse">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={(e) => handleChange(e,"name")} required/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter Amount" onChange={(e) => handleChange(e,"amount")} required/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridUnit">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control as="select" placeholder="Choose Unit" onChange={(e) => handleChange(e,"measurementUnit")} defaultValue="pcs" required>
                                <option>pcs</option>
                                <option>kg</option>
                                <option>g</option>
                                <option>l</option>
                                <option>ml</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridExpiration">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Expiration Date" onChange={(e) => handleChange(e,"expirationDate")} required/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button type="submit" variant = {"success"} style ={{"fontWeight":"bold"}} onClick={(e) => handleSave(e)}>Save</Button>
                    </Form.Row>
                </Form>
            </Collapse>
        )
    }
      

    return(       
        storage===undefined ?
            <Container className="text-center justify-content-center">
                <Spinner animation="border" role="status"/>
            </Container>
            :
            <Container as="section" className={isMobile ? "p-0":""}>
            <Helmet>
                <title>Storage</title>
            </Helmet>
            
            <Row className={isMobile ? "justify-content-center m-0":"justify-content-center"} >            
                <Col className={isMobile ? "p-0":""}>  
                    <h1 style={{"color":"#069697"}}>Storage</h1>
                    <Button 
                    className={"m-1"}
                    variant={"success"} 
                    onClick={() => handleAdd()}
                    aria-controls="addFormCollapse"
                    aria-expanded={add}
                    style ={{"fontWeight":"bold"}}
                    >+ New Ingredient</Button>
                    {
                        isMobile ? 
                            showFormMobile()
                        :
                            showForm()
                    }
                    <Table  striped bordered hover responsive size={isMobile ? "sm":""} >
                    <thead>
                        <tr>
                            {
                                isMobile ?
                                    null
                                :
                                    <th></th>
                            }
                            
                            <th>Name</th>
                            <th>{isMobile ? "#":"Amount"}</th>
                            <th>Unit</th>
                            <th>{isMobile ? "Exp. Date":"Expiration Date"}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            storage && storage.map((item) => {
                                //return(renderItem({...storage[item],id:item}, item))
                                return(renderItem(item, null))
                            })
                        }    
                    </tbody>   
                        </Table>                
                </Col>          
            </Row>          
            </Container>
         
    )      
}

const mapStateToProps = (state, props) => {
    return {
        storage: state.firestore.ordered.storage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       addItem: (item) => dispatch(addItem(item))
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"storage",orderBy:["expirationDate","asc"]}])
)(StorageBoard)