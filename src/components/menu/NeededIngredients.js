import React,{Component} from "react";
import {Card} from 'react-bootstrap'
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

class NeededIngredients extends Component{
    
    constructor(props){
      super(props);
    }

    allIngredientsInCorrectForm(){
        var ingredients = {}
        this.props.allIngredients && Object.keys(this.props.allIngredients).map((ing, index) => 
            {var name = this.props.allIngredients[ing].name
             var amount = this.props.allIngredients[ing].amount
             var unit = this.props.allIngredients[ing].measurementUnit
            if(ingredients[name]){
                var oldAmount = ingredients[name][0]
                if(ingredients[name][1] === unit){
                    if(unit === "kg"){
                        amount = amount*1000
                        oldAmount = oldAmount * 1000
                        unit = "g"
                    }
                    if(unit === "l"){
                        amount = amount*1000
                        oldAmount = oldAmount * 1000
                        unit = "ml"
                    } 
                    ingredients[name] = [amount*1 + oldAmount*1, unit]
                } else if(ingredients[name][1] === "g" && unit === "kg"){
                    ingredients[name] = [amount*1000 + oldAmount*1, "g"]
                } else if(ingredients[name][1] === "ml" && unit === "l"){
                    ingredients[name] = [amount*1000 + oldAmount*1, "ml"]
                } else{
                    ingredients[name + index] = [amount, unit] 
                }
            } else{
                if(unit === "kg"){
                    amount = amount*1000
                    unit = "g"
                }
                if(unit === "l"){
                    amount = amount*1000
                    unit = "ml"
                }
                ingredients[name] = [amount, unit] 
            }
            }
        )            
        return ingredients
    }

    allNeededIngredients(){
        var ingredientsInStore = this.allIngredientsInCorrectForm();
        var ingredientsInRecipes = {}
        if(this.props.ingredientsFromRecipe && this.props.ingredientsFromRecipe.length){
            this.props.ingredientsFromRecipe && this.props.ingredientsFromRecipe.map((ingr) => {
                var unit = ingr.measurementUnit
                var amount = ingr.amount*1
                if(ingr.measurementUnit == "kg"){
                    unit = "g"
                    amount = amount * 1000
                }
                if(ingr.measurementUnit == "l"){
                    unit = "ml"
                    amount = amount * 1000
                }
                if(ingredientsInRecipes[ingr.name]){
                    ingredientsInRecipes[ingr.name] = [ingredientsInRecipes[ingr.name][0] + amount, unit]
                } else {
                    ingredientsInRecipes[ingr.name] = [amount, unit]
                }
            })
        }
        var buying = {}
        Object.keys(ingredientsInRecipes).map((ingr, index) => 
            {
                if(ingredientsInStore[ingr]){
                    var x = ingredientsInStore[ingr][0]*1 - ingredientsInRecipes[ingr][0]*1
                    if(x < 0){
                        buying[ingr] = [x*-1, ingredientsInStore[ingr][1]]
                    }
                }else {
                    buying[ingr] = ingredientsInRecipes[ingr]
                }
            }
        )
        return buying
    }
    
    render(){
        var buying = this.allNeededIngredients()
        return(
          <Card variant="light" style={this.props.isSmall ? {marginTop:"5%", marginBottom:"5%"}:{marginBottom:"5%", width:"50%"}} as={"aside"}>
              <Card.Header style={{fontSize:"200%", fontWeight:"bold", backgroundColor:"#069697", color:"white"}} as={"header"}> 
                Needed to buy:
              </Card.Header>
              <Card.Body as={"ul"}>
                {
                    Object.keys(buying).map((ingr, index) => 
                        <li key={index}>{ingr} - {buying[ingr][0]} {buying[ingr][1]} </li>
                    )
                }
              </Card.Body>
            </Card>
  
          )


    }
}

const mapStateToProps = (state, props) => {
  return {
      storage: state.firestore.data.storage, 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{collection:"storage"}])
)(NeededIngredients)
