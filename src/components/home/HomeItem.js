import React, { useEffect, useState }from "react";
import {Container, Row, Col, Button, Form, Card, Table, OverlayTrigger, Tooltip} from "react-bootstrap";
import {connect} from "react-redux";
import {compose} from "redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'
import {editItem, deleteItem} from "../../store/actions/storageActions"


const StorageItem = ({item, editItem, deleteItem}) => {

    var itemDate = new Date(item.expirationDate.seconds*1000)
    var currentDate = new Date(Date.now())
    var dateDiff =  Math.floor(( itemDate - currentDate ) / 86400000);
    var expiration = itemDate.toLocaleDateString()
    var tempDate = itemDate
    //tempDate.setDate(itemDate.getDate()+1)
    var defaultDate = tempDate.toISOString().substr(0,10)

    useEffect(()=>{
        setValues({...item, expiration : expiration, dateForPicker: defaultDate})
    },[item])

    const [edit, setEdit] = useState({editing: false})
    const [values, setValues] = useState({})



    const showItem = () => {
        return(
            <tr>                
                <td className="prvok">{values.name}</td>
                <td className="prvok">{values.amount}</td>
                <td className="prvok">{values.measurementUnit}</td>
                <td className="prvok">{values.expiration}</td>            
            </tr>
        )
    }
    return( showItem() )      
}


const mapStateToProps = (state, props) => {
    return {
   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    //firestoreConnect([{}])
)(StorageItem)