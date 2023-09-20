import React from 'react'
import {Button, Container} from "react-bootstrap"
import AllMenuCards from "./AllMenuCards"
import AllMenuMinimal from "./AllMenuMinimal"
import MenuDetailSelection from "./MenuDetailSelection"
import { connect } from "react-redux"
import {compose} from "redux";
import './Menu.css';
import { firestoreConnect } from "react-redux-firebase";
import { useMediaQuery } from 'react-responsive'
import {setExpiringIngredients, setOtherIngredients} from "../../store/actions/menuActions"
import {Helmet} from "react-helmet"
import {imgScrollUp} from "./commonElements/Icons"

const Menu = (props) => {

    const isSmall = useMediaQuery({ query: '(max-width: 1000px)' });

    const getExpiringIngredients = () => {
        var expiration1 = {}
        var otherIngredients = {}
        props.storage && Object.keys(props.storage).map((ing, index) => {
        var itemDate = new Date(props.storage[ing].expirationDate.seconds * 1000)
        var currentDate = new Date(Date.now())
        var dateDiff = Math.floor((itemDate - currentDate) / 86400000);
        var ingredient = props.storage[ing]
        if(ingredient.measurementUnit == "kg"){
            ingredient = {
                name: ingredient.name, 
                amount: ingredient.amount*1000,
                measurementUnit: "g"
            }
        } else if(ingredient.measurementUnit == "l"){
            ingredient = {
                name: ingredient.name, 
                amount: ingredient.amount*1000,
                measurementUnit: "ml"
            }
        }
        if (dateDiff <= 7) {
            if(expiration1[ingredient.name] && expiration1[ingredient.name][1] == ingredient.measurementUnit){
                var amount = expiration1[props.storage[ing].name][0]*1
                expiration1[ingredient.name] = [amount + ingredient.amount*1, ingredient.measurementUnit]
            } else {
                expiration1[ingredient.name] = [ingredient.amount*1, ingredient.measurementUnit]
            }
        } else {
            if(otherIngredients[ingredient.name] && otherIngredients[ingredient.name][1] == ingredient.measurementUnit){
                var amount = otherIngredients[props.storage[ing].name][0]*1
                otherIngredients[ingredient.name] = [amount + ingredient.amount*1, ingredient.measurementUnit]
            } else {
                otherIngredients[ingredient.name] = [ingredient.amount*1, ingredient.measurementUnit]
            } 
        }     
        }
        )
        props.setExpiringIngredients(expiration1)
        props.setOtherIngredients(otherIngredients)
    }


    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

        if(!props.menu1.actualMenu){
            return(   
                props.menu1.minimal ? 
                <AllMenuMinimal isSmall={isSmall}>
                    <Helmet>
                    <title>Menu</title>
                </Helmet>
                </AllMenuMinimal>
                : 
                <Container as={"section"}>
                    <Helmet>
                    <title>Menu</title>
                </Helmet>
                    <h1>All menu</h1>
                    <Button variant="success" className="buttonAddMenu" style={{margin:"0%"}} onClick={() => {props.setMinimal(true); getExpiringIngredients()}}> + New menu</Button>
                    <AllMenuCards numCol="6" isSmall={isSmall}/>
                    <div className="btnScrollUp rounded-circle" onClick={scrollTop}>

                    {imgScrollUp()}                                         

                    </div>
                </Container>
            )
        } else {
            return <MenuDetailSelection index={props.menu1.actualMenu} getExpiringIngredients={getExpiringIngredients} >
                <Helmet>
                    <title>Menu</title>
                </Helmet>
            </MenuDetailSelection>
        }
}

const setMinimal = (minimal) => {
    return {
        type: "SET_MINIMAL", 
        payload: minimal
    }
}

const mapStateToProps = (state, props) => {
    return {
        menu1: state.menu,
        storage: state.firestore.ordered.storage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMinimal: (minimal) => dispatch(setMinimal(minimal)),
        setExpiringIngredients: (ingr) =>  dispatch(setExpiringIngredients(ingr)),
        setOtherIngredients: (ingr) =>  dispatch(setOtherIngredients(ingr))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"menu", orderBy:["state","desc"]}, {collection:"storage",orderBy:["expirationDate","asc"]}])
)(Menu)
