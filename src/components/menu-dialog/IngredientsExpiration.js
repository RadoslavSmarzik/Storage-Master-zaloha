import React,{Component} from "react";
import {Button,Card,Col,Form} from 'react-bootstrap'


class IngredientsExpiration extends Component{

    constructor(){
        super();
        this.state = {ingredients: ["aaaaa","bbbbb","ccccc"]};
    }

    render(){
        return(
        <Card style={{ border:'1px solid #B01515' }}>
            <Card.Header as="h5" style={{ backgroundColor: '#B01515', color:'white'}}>Ingredients close to their expiration date:</Card.Header>
            <Card.Body style= {{overflow: "auto", height:"200px"}}>
            
            <Form.Group controlId="ingredient">
              {this.state.ingredients.map((ingredient, index) => 
              
              <Col key={index}>
                  
                    <Form.Check type="checkbox" label={ingredient} id ={ingredient} name = "ch" />
                
                  
                 
                  
              </Col>
          ) }
          </Form.Group>
            </Card.Body>
          </Card>

        )
    }
    
    

}

export default IngredientsExpiration