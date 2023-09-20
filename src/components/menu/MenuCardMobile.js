import React,{useState} from 'react'
import {Card, Button, Row, Col} from "react-bootstrap"
import {imgWarning, imgCheck, imgCross, imgTrash} from "./commonElements/Icons"
import {tooltipBasic} from "./commonElements/TooltipBasic"
import {connect} from "react-redux";
import {compose} from "redux";
import {editItem, deleteItem} from "../../store/actions/menuActions"
import AlertAfterAction from "./commonElements/AlertAfterAction"

const MenuCardMobile = (props) => {
        
        const [showAlert, setShowAlert] = useState(false);
        const [deleting, setDeleting] = useState(false);

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
                        <Card.Header className="menuCardHeader" as={"header"} style={{paddingTop:"1%"}}>
                        <Row className="align-items-center justify-content-end">
                        {
                                state === "2" ? 
                                    <Button variant="warning" className="sendBtn float-left" style={{height:"40px", paddingTop:"0%"}} data-index = {props.index} onClick={(e) => {
                                        var clone = JSON.parse(JSON.stringify(props.menu));
                                        clone["state"] = "1";
                                        props.editItem(clone, e.target.dataset.index);
                                    }}><span data-index = {props.index} className="sendBtn1" style={{textAlign:"middle"}}>Send for approval</span></Button>
                                : null
                                }
                                <Button variant="danger" className="d-flex justify-content-center btnDelete" style={{width:"40px", height:"40px", marginLeft:"2%", marginTop:"0%"}} data-index = {props.index} onClick={
                                    (e)=> {setShowAlert(true);
                                    }
                                }>
                                    {imgTrash()}
                                </Button>


                        </Row>
                        {state === "1" ? 
                                    tooltipBasic("Waiting for approval", imgWarning(), "warning float-left")
                        
                                : state === "0" ?
                                    tooltipBasic("Approved!", imgCheck(), "approve float-left")
                                
                                : state === "-1" ?
                                    tooltipBasic("Declined!", imgCross(), "delete float-left")
                                :null}

                        <h2 className="nameMenu float-left" style={{padding:"0%", margin:"0%", marginTop:"1%", marginLeft:"1%", textDecoration:"underline"}} data-index = {props.index} 
                                onClick={(e)=> props.setActualMenu(e.target.dataset.index)}>
                                    Menu - week: {menuName}
                                </h2>

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
)(MenuCardMobile)

