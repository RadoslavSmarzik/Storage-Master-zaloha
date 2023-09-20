import React,{useState} from 'react'
import {Card, Button, Row, Col} from "react-bootstrap"
import {imgWarning, imgCheck, imgCross, imgTrash} from "./commonElements/Icons"
import {tooltipBasic} from "./commonElements/TooltipBasic"
import {connect} from "react-redux";
import {compose} from "redux";
import {editItem, deleteItem} from "../../store/actions/menuActions"
import AlertAfterAction from "./commonElements/AlertAfterAction"
import { useMediaQuery } from 'react-responsive'

const MenuCard = (props) => {
        
        const [showAlert, setShowAlert] = useState(false);
        const [deleting, setDeleting] = useState(false);
        const isSmall = useMediaQuery({ query: '(max-width: 1000px)' })

        const second5day = 432000;
        var usingDate = props.menu && props.menu.date.seconds
        var author= props.menu && props.menu.author
        var creatingDate= props.menu && props.menu.creatingDate.seconds
        var state= props.menu && props.menu.state

        var date = new Date(usingDate*1000)
        var date1 = new Date((usingDate + second5day) * 1000)
        var creatingDate = new Date(creatingDate*1000)
        var menuName = date.toLocaleDateString() + " - " + date1.toLocaleDateString()

        if(deleting){
            props.deleteItem(props.index)
            return null
        } else {
            return(
                <>
                    {
                        showAlert ? 
                        <AlertAfterAction variant="danger" text="Do you want to delete this menu?" heading={menuName} setting={setShowAlert} delete={setDeleting}/>
                        :
                        null
                    }
                    <Card bg="Light" style={{marginBottom: "3%", marginTop:"3%"}} as={"article"}>
                        <Card.Header className="menuCardHeader" as={"header"}>
                        <Row className="align-items-center">
                        
                            <Col sm={11}>
                                {
                                state === "2" ? 
                                    <Button variant="warning" className="sendBtn float-left" data-index = {props.index} onClick={(e) => {
                                        var clone = JSON.parse(JSON.stringify(props.menu));
                                        clone["state"] = "1";
                                        props.editItem(clone, e.target.dataset.index);
                                    }}><span data-index = {props.index} className="sendBtn1">Send for approval</span></Button>
                                
                                : state === "1" ? 
                                    tooltipBasic("Waiting for approval", imgWarning(), "warning float-left")
                        
                                : state === "0" ?
                                    tooltipBasic("Approved!", imgCheck(), "approve float-left")
                                
                                : 
                                    tooltipBasic("Declined!", imgCross(), "delete float-left")
                                }

                                <h2 className="nameMenu" style={{margin:"1%", float:"left", textDecoration: "underline"}} data-index = {props.index} 
                                onClick={(e)=> props.setActualMenu(e.target.dataset.index)}>
                                    Menu - week: {menuName}
                                </h2>
                            </Col>
                            {
                                props.sidebar ? null
                                :
                                <Col sm={1} style={{padding:"0px 0px 0px 0px"}}>
                                <Button variant="danger" className="d-flex justify-content-center btnDelete" style={{width:"50px", height:"50px"}} data-index = {props.index} onClick={
                                    (e)=> {setShowAlert(true);
                                    }
                                }>
                                    {imgTrash()}
                                </Button>
                                </Col>
                            }
                        </Row>
                        </Card.Header>
                        <Card.Body className="menuCardFooter" as={"footer"}>
                            {author}, {creatingDate.toLocaleDateString()}
                        </Card.Body>
                    </Card>
    
    
                </>
            )
        }
 
}

const setActualMenu = (id) => {
    return {
        type: "SET_ACTUAL_MENU", 
        payload: id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       deleteItem: (id) => dispatch(deleteItem(id)),
       editItem: (item, index) => dispatch(editItem(item, index)),
       setActualMenu: (id) => dispatch(setActualMenu(id)) 
    }
}


export default compose(
    connect(null,mapDispatchToProps),
)(MenuCard)

