import React,{Component} from "react";
import {Card,ListGroup} from 'react-bootstrap'

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";



class Expiration extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          expiration: []
        };


        
          
      }

      componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
          var expiration1 = []
          this.props.storage && Object.keys(this.props.storage).map((ing, index) => {
            var itemDate = new Date(this.props.storage[ing].expirationDate.seconds * 1000)
            var currentDate = new Date(Date.now())
            var dateDiff = Math.floor((itemDate - currentDate) / 86400000);
            if (dateDiff <= 7) {
              expiration1.push(this.props.storage[ing].name)
            }
          }
          )

         this.setState({ expiration: expiration1 })
        }
      }
    

     
    render(){

        

        return(

            
            
            <Card bg = "danger" text ="light" style = {{borderRadius:"0"}}>
            <a href="storage"  >
            <Card.Header className = "expirationCardHeader">Expiration Ingredients</Card.Header>
            </a>
            <Card.Body className = "expirationCardBody">
            <ListGroup variant="flush" className = "listGroupExpiration" style = {{borderRadius:"0"}}>

            {
            Object.entries(this.state.expiration).map(([k, v]) => (

                <ListGroup.Item key={k} className = "expirationItem" variant="danger" >{v}</ListGroup.Item>
                

            ))
            
            }

           
            </ListGroup>

            </Card.Body>

        
                
            </Card>
           
        )
    }
    
    

}



const mapStateToProps = (state, props) => {
    return {
      storage: state.firestore.data.storage,
      menuState: state.menu
    }
  }
  

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "storage" }])
  )(Expiration)