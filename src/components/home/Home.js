import React from "react";
import {Container, Row, Col, Button,Table,Spinner} from "react-bootstrap";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import {connect} from "react-redux";
import logo from './logo.png';
import firebase from "firebase"
import { useState } from "react";
import HomeItem from "./HomeItem"
import Menu from "./MenuItem";
import './styles.css'
import {Helmet} from "react-helmet"

var mili = Date.now() +(86400*7*1000)
var currentDate = new Date(mili) 
var dat = (Date.now())/1000
var endofMenuDate = (Date.now() - (86400*7*1000))/1000 
var datum = new Date(Date.now()).toLocaleDateString();
var ind = -5

const Home = (props) => {
    var {storage,men} = props
    
    
   /* {
        men===undefined ?
        console.log("nenajdeny"): console.log(men[0].id)
    }*/

   
        
    const datumCheck = () =>{
        for(let i=0; i<men.length;i++){
           
            if(men[i].date.seconds > endofMenuDate && men[i].date.seconds < dat ){
                ind = i;
                break;
            }
        }
       

    }

    const renderItem = (item, id) => {
        if(Object.keys(item).length > 1){
            return(
                <HomeItem key = {item.id} item = {item}/>
            )
                }else{
        console.log("nechapem kde som sa zobral", item)
    }

   
    
}


        return(       
        <Container fluid>
            <Helmet>
                <title>Home</title>
            </Helmet>
            {
                men===undefined ?
                
                <Container className="text-center justify-content-center">
                    <Spinner animation="border" role="status"/>
                </Container>
                :
               
               <Container>
               <h1 className="Nadpis1"> Welcome in Storage Master <br/> {datum} </h1>
                <Row >            
                    <Col sm={5} > 
                     
                    
                                          <h1 style={{"color":"#069697"}} className="Nadpis">Expiration Ingredients</h1>
                        
                        <Table striped bordered hover className="tabulka">
                        <thead>
                            <tr>
                                
                                <th className="prvok">Name </th>
                                <th className="prvok">Amount</th>
                                <th className="prvok">Unit</th>
                                <th className="prvok">Expiration Date </th>
                                
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

                     <Col sm={10} >
                           {datumCheck()}
                           {ind ==-5 ?
                         <div>    <h1> You dont have any menu on this week</h1> </div>
                                :
                                 <Menu index={men[ind].id} /> }
                     </Col>       
               </Row>  
                                
           </Container>
                                
                                
                           
                                  
            }
        </Container>
    )      
}


const mapStateToProps = (state) => {
    return {
        storage: state.firestore.ordered.storage,
        men: state.firestore.ordered.menu,
        menu1: state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}

//{collection:"menu",orderBy:["date.seconds","asc"],where:['date.seconds','<=',dat]}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"storage",orderBy:["expirationDate","asc"],where:['expirationDate','<=',currentDate]},{collection:"menu",orderBy:["date.seconds","asc"],where:['date.seconds','>=',endofMenuDate]}])
)(Home)