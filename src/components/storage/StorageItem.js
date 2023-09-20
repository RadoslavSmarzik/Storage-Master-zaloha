import React, { useEffect, useState }from "react";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {connect} from "react-redux";
import {compose} from "redux";
import {editItem, deleteItem} from "../../store/actions/storageActions"
import { useMediaQuery } from 'react-responsive'

const StorageItem = ({item, editItem, deleteItem}) => {

    var itemDate = new Date(item.expirationDate.seconds*1000)
    var currentDate = new Date(Date.now())
    var dateDiff =  Math.floor(( itemDate - currentDate ) / 86400000);
    var expiration = itemDate.toLocaleDateString()
    var tempDate = itemDate
    //tempDate.setDate(itemDate.getDate()+1)
    var defaultDate = tempDate.toISOString().substr(0,10)

    const isMobile = useMediaQuery({ query: '(max-width: 765px)' })

    useEffect(()=>{
        setValues({...item, expiration : expiration, dateForPicker: defaultDate})
    },[item])

    const [edit, setEdit] = useState({editing: false})
    const [values, setValues] = useState({})

    const handleInputChange = (e, name) => {
        setValues({...values,
          [name]: e.target.value
        });
      }
    
    const handleEditClick = (e) => {  
        if(edit.editing){
            editItem(values)
        }
        setEdit({editing : !edit.editing})
    }

    const handleDeleteClick = (e) => {  
        deleteItem(values)
    }

    const handleDatePick = (e) => {
        var date = new Date(e)
        setValues({...values, expirationDate : date, expiration: date.toLocaleDateString(), dateForPicker : e})
    }

    const showItem = () => {
        return(
            <tr>
                {
                    isMobile ?
                        null
                    :
                        <td className="tableTextCenter" >
                        {
                            dateDiff <= 7 ? 
                            <OverlayTrigger
                            key={"expireAlert"}
                            placement={"top"}
                            overlay={
                                <Tooltip id={`expireAlert`}>
                                Expires Soon.
                                </Tooltip>
                            }>
                                <svg width="1.4em" height="1.4em" viewBox="0 0 16 16" style={{"backgroundColor": "#fff76a"}} className="bi bi-exclamation-circle rounded-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                </svg>
                            </OverlayTrigger>
                            :
                                ""
                        }
                        </td>
                }       
                <td  style={(isMobile && (dateDiff <= 7)) ? {"color":"red"}:{}}>{values.name}</td>
                <td>{values.amount}</td>
                <td>{values.measurementUnit}</td>
                <td>{values.expiration}</td>

                <td className={"tableTextCenter"}><Button block size={"xxs"} variant={"light"} onClick={() => handleEditClick()}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg></Button>
                </td>
            </tr>
        )
    }

    const showEditItem = () => {
        return(
            <tr>
                {
                    isMobile ?
                        null
                    :
                        <td className="tableTextCenter">
                        {
                            dateDiff <= 7 ? 
                            <OverlayTrigger
                            key={"expireAlert"}
                            placement={"top"}
                            overlay={
                                <Tooltip id={`expireAlert`}>
                                Expires Soon.
                                </Tooltip>
                            }>
                                <svg width="1.4em" height="1.4em" viewBox="0 0 16 16" style={{"backgroundColor": "#fff76a"}} className="bi bi-exclamation-circle rounded-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                </svg>
                            </OverlayTrigger>
                            :
                                ""
                        }
                        </td>
            }       
                <td><input className="storageEditInput" value={values.name} onChange={(e) => handleInputChange(e,"name")}></input></td>
                <td><input type="number" className="storageEditInput" value={values.amount} onChange={(e) => handleInputChange(e,"amount")}></input></td>
                <td><select className="storageEditInput" value={values.measurementUnit} onChange={(e) => handleInputChange(e,"measurementUnit")} >
                                <option value="pcs">pcs</option>
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="l">l</option>
                                <option value="ml">ml</option>
                            </select></td>
                <td> <input type="date" style={isMobile ? {"width":"40px"}:{}} className="storageEditInput" value={values.dateForPicker} onChange={(e) => handleDatePick(e.target.value)}></input></td>

                <td className={"tableTextCenter"} ><Button block variant={"success"} size={isMobile ? "xxs":""} onClick={() => handleEditClick()}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    </Button>
                </td>

                <td className={"tableTextCenter"}><Button block variant={"danger"} size={isMobile ? "xxs":""} onClick={() => handleDeleteClick()}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    </Button>
                </td>
            </tr>
        )
    }

    
    return(   
        values && edit.editing ?
            showEditItem()
        :
            showItem()
    )      
}

const mapStateToProps = (state, props) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       editItem: (item) => dispatch(editItem(item)),
       deleteItem: (item) => dispatch(deleteItem(item))
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    //firestoreConnect([{}])
)(StorageItem)