import React,{Component} from "react";
import {Card,ListGroup,Container,Col,Row} from 'react-bootstrap'

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";



class MainMenu extends Component{

      getCurrentMenu = () =>{
        var prevMonday = new Date();
        prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
        
        console.log("ZACIATOK VYPISOV                                                 #####")
        var current = new Date();

        /** 
        var d = new Date(2021, 0, 10,1,11,9,7);
        current = d
        */

        current.setHours(0);
        current.setMinutes(0);
        current.setSeconds(0);
        current.setMilliseconds(0);


        
        /**LrUhT6wjQo5XetWvRCsm */
        var menu = null
        if(this.props.menu){
          Object.keys(this.props.menu).map((menu1, index) => {
          var begin = new Date(this.props.menu[menu1].date.seconds*1000)
          var end = new Date(this.props.menu[menu1].date.seconds*1000 + (1000*60*60*24*6))

            begin.setHours(0);
            begin.setMinutes(0);
            begin.setSeconds(0);
            begin.setMilliseconds(0);

            end.setHours(0);
            end.setMinutes(0);
            end.setSeconds(0);
            end.setMilliseconds(0);
          
          if(begin <= current && current <= end){
            
            menu = this.props.menu[menu1];
          }
          
          }
          )   
        }
        
       
       /**return this.props.menu["LrUhT6wjQo5XetWvRCsm"] */
        return menu
        
      }

      getRecipes = () =>{
        

        var recipes = null
        if(this.props.recipes){
          recipes = this.props.recipes  
        }

          return recipes
        
      }

       nextWeekdayDate = (date, day_in_week) =>{
        var ret = new Date(date||new Date());
        ret.setDate(ret.getDate() + (day_in_week - 1 - ret.getDay() + 7) % 7 + 1);
        return ret;
      }
    
    render(){

      var currentMenu = this.getCurrentMenu()
      var recipes = this.getRecipes()

      var prevMonday = new Date();
      prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
      var nextFriday = new Date();
      nextFriday = this.nextWeekdayDate(nextFriday,5)
    
      



      

            
        return(


            <Card className="menuMainCard">
            <Card.Header> Actual menu - week: { prevMonday.toLocaleDateString()} - { nextFriday.toLocaleDateString()}</Card.Header>
            

            {currentMenu ? 
            <Card.Body className="menuCardBody" >

            <Card className="dayCard">
            <Card.Header className = "dayCardHeader">Monday</Card.Header>
            
            <ListGroup variant="flush" style = {{borderRadius: "0"}}>
            {
              currentMenu && recipes && Object.keys(currentMenu.monday).map((monday1, index) => {
                
                return <ListGroup.Item key ={index}>
                  
                  

                  <Container>
                  <Row>
                    <Col className = "boldText">{recipes[currentMenu.monday[monday1].recipe].name}</Col>
                    <Col className = "boldText">{currentMenu.monday[monday1].portions}x</Col>
                  </Row>
                  </Container>


                  </ListGroup.Item>
                })
            }

            </ListGroup>
            
            </Card>
          
            <Card className="dayCard">
            <Card.Header className = "dayCardHeader">Tuesday</Card.Header>
            <ListGroup variant="flush" style = {{borderRadius: "0"}}>
            {
              currentMenu && recipes && Object.keys(currentMenu.tuesday).map((tuesday1, index) => {
                
                return <ListGroup.Item key ={index} >

              <Container>
                  <Row>
                    <Col className = "boldText">{recipes[currentMenu.tuesday[tuesday1].recipe].name}</Col>
                    <Col className = "boldText">{currentMenu.tuesday[tuesday1].portions}x</Col>
                  </Row>
                  </Container>
                
                </ListGroup.Item>
                })
            }
            </ListGroup>
            </Card>

            <Card className="dayCard">
            <Card.Header className = "dayCardHeader">Wednesday</Card.Header>
            <ListGroup variant="flush" style = {{borderRadius: "0"}}>
            {
              currentMenu && recipes && Object.keys(currentMenu.wednesday).map((wednesday1, index) => {
                
                return <ListGroup.Item key ={index}>

              <Container>
                  <Row>
                    <Col className = "boldText">{recipes[currentMenu.wednesday[wednesday1].recipe].name}</Col>
                    <Col className = "boldText">{currentMenu.wednesday[wednesday1].portions}x</Col>
                  </Row>
                  </Container>
                
                </ListGroup.Item>
                })
            }
            </ListGroup>
            </Card>

            <Card className="dayCard">
            <Card.Header className = "dayCardHeader">Thursday</Card.Header>
            <ListGroup variant="flush" style = {{borderRadius: "0"}}>
            {
              currentMenu && recipes && Object.keys(currentMenu.thursday).map((thursday1, index) => {
                
                return <ListGroup.Item key ={index}>

                <Container>
                  <Row>
                    <Col className = "boldText">{recipes[currentMenu.thursday[thursday1].recipe].name}</Col>
                    <Col className = "boldText">{currentMenu.thursday[thursday1].portions}x</Col>
                  </Row>
                  </Container>
                
                
                </ListGroup.Item>
                })
            }
            </ListGroup>
            </Card>

            <Card className="dayCard">
            <Card.Header className = "dayCardHeader">Friday</Card.Header>
            <ListGroup variant="flush" style = {{borderRadius: "0"}}>
            {
              currentMenu && recipes && Object.keys(currentMenu.friday).map((friday1, index) => {
                
                return <ListGroup.Item key ={index}>
                  <Container>
                  <Row>
                    <Col className = "boldText">{recipes[currentMenu.friday[friday1].recipe].name}</Col>
                    <Col className = "boldText">{currentMenu.friday[friday1].portions}x</Col>
                  </Row>
                  </Container>
                
                
                </ListGroup.Item>
                })
            }
            </ListGroup>
            </Card>

            </Card.Body>
            :
            <Card.Body className = "noExist">
              <h2 className = "noExistText"> There is no menu for this week</h2>
            </Card.Body>

  }

            
            
          </Card>
          
        )
    }
    
    

}

const mapStateToProps = (state, props) => {
    return {
      menu: state.firestore.data.menu, 
      recipes: state.firestore.data.recipes,
      
    }
  }
  

  export default compose(
    connect(mapStateToProps),
    firestoreConnect([{collection:"menu"}, {collection:"recipes"}])
)(MainMenu)

