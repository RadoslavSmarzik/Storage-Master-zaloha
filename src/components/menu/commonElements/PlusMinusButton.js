import React,{ useState} from "react";
import {Button, ButtonGroup, Form} from "react-bootstrap";

const PlusMinusButton = (props) => {
    const [portions,setPortions] = useState(props.oldMenu[props.day][props.index].portions);
    
    const recalculateExpiringIngredientsAccordingPortions = (oldPortion, newPortion) => {
        var numberOfPortions = oldPortion*1 - newPortion*1
        var actualRecipe = props.oldMenu && props.oldMenu[props.day] && props.oldMenu[props.day][props.index] && props.oldMenu[props.day][props.index].recipe
        var expiringIngredients1 = JSON.parse(JSON.stringify(props.expiringIngredients))
        var otherIngredients1 = JSON.parse(JSON.stringify(props.otherIngredients))
        var ingredientsInRecipe = props.allRecipes && props.allRecipes[actualRecipe] && props.allRecipes[actualRecipe].ingredients
        console.log("INGR IN RECIPE")
        console.log(ingredientsInRecipe)
        ingredientsInRecipe && ingredientsInRecipe.map((ingr) => {
            if(props.expiringIngredients && props.expiringIngredients[ingr.name]){
                if(props.expiringIngredients[ingr.name][1] == ingr.measurementUnit){
                    expiringIngredients1[ingr.name][0] += (numberOfPortions*1 * ingr.amount)
                }
            }
            if(props.otherIngredients && props.otherIngredients[ingr.name]){
                if(props.otherIngredients[ingr.name][1] == ingr.measurementUnit){
                    otherIngredients1[ingr.name][0] += (numberOfPortions*1 * ingr.amount)
                }
            }
        })
        props.setExpiringIngredients(expiringIngredients1)
        props.setOtherIngredients(otherIngredients1)
        console.log(expiringIngredients1)
        console.log(otherIngredients1)
    }

    const handleOnChange = (e) => {
            setPortions(e.target.value)
            var oldPortion = props.oldMenu && props.oldMenu[props.day] && props.oldMenu[props.day][props.index] && props.oldMenu[props.day][props.index].portions
            changePortionsInState(oldPortion, e.target.value)
    };

    const changePortionsInState = (oldNumber, number) => {
        recalculateExpiringIngredientsAccordingPortions(oldNumber,number)
        let tempVar = JSON.parse(JSON.stringify(props.oldMenu))
        tempVar[props.day][props.index].portions = number
        props.setNewMenu(tempVar)
        localStorage.setItem("menu", JSON.stringify(tempVar))
    }

    if(props.isSmall){
        return <Form.Control className={props.isSmall ? "plusMinusBtn2Small" : "plusMinusBtn2"} type="number"  min="0" pattern="[0-9]*" value = {props.oldMenu[props.day][props.index].portions} onChange ={handleOnChange}/>

    } else {
        return (
            <ButtonGroup aria-label="Basic example" data-index = {props.index} id={props.index}>
                <Button className={props.isSmall ? "plusMinusBtn1Small" : "plusMinusBtn1"} variant="secondary" onClick={() => {
                                    if(Number(props.oldMenu[props.day][props.index].portions)>0){
                                        setPortions(props.oldMenu[props.day][props.index].portions*1 - 1); changePortionsInState(props.oldMenu[props.day][props.index].portions*1, props.oldMenu[props.day][props.index].portions*1 - 1)                              
                                    }
                                }} >-</Button>
                <Form.Control className={props.isSmall ? "plusMinusBtn2Small" : "plusMinusBtn2"} type="number"  min="1" pattern="[0-9]*" value = {props.oldMenu[props.day][props.index].portions} onChange ={handleOnChange}/>
                <Button className={props.isSmall ? "plusMinusBtn1Small" : "plusMinusBtn1"} variant="secondary" onClick={() => {setPortions(props.oldMenu[props.day][props.index].portions*1 + 1); changePortionsInState(props.oldMenu[props.day][props.index].portions*1, props.oldMenu[props.day][props.index].portions*1 + 1)} }>+</Button>
            </ButtonGroup>
        )
    }


}

export default PlusMinusButton








