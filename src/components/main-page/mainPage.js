import React,{Component} from "react";
import './mainPageStyles.css'
import Expiration from "./expiration"
import MainMenu from "./mainMenu"
import Welcome from "./welcome"
import { Container,Row,Col } from "react-bootstrap";



class MainPage extends Component{

    render(){

        return(
        <div>
          <div className = "welcomePosition">
          <Welcome></Welcome>
          </div>
            
            <Container className = "marginBottom">
            <Row>
              <Col sm = {8}>
              <MainMenu></MainMenu>
              </Col>
            <Col sm = {4}>
            <Expiration></Expiration>
            </Col>

            </Row>
            
          
          
          </Container>
          
        </div>
        )
    }
    
    

}

export default MainPage


