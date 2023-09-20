import React,{Component} from "react";
import {Card,Button} from 'react-bootstrap'
import './mainPageStyles.css'



class Welcome extends Component{

    render(){
        var currentDate = new Date(Date.now()).toLocaleDateString();

        return(
            

            <Card className="text-center welcomeCard">
            <Card.Body>
            <h3 className = "welcome">Welcome in Storage Master</h3>
            <h5 className = "welcomeDate">{currentDate}</h5>
            
            

            

            </Card.Body>
            </Card>
        )
    }
    
    

}

export default Welcome