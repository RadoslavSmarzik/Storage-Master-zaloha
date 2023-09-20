import React, { Component } from "react";
import { InputGroup, Card, FormControl, Button, Form } from 'react-bootstrap';

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { addItem } from "../../store/actions/recipeActions"
import { useMediaQuery } from 'react-responsive'

class FilteredRecipes extends Component {

    constructor(props) {
        super(props);

        var recipes1ID = []
        this.props.recipes && Object.keys(this.props.recipes).map((recipe, index) =>
            recipes1ID.push(recipe)
        )
        var recipes1 = []
        recipes1ID.map((recipe, index) =>
            recipes1.push(this.props.recipes[recipe].name)
        )
        this.state = {
            recipes: recipes1,
            recipesID: recipes1ID,
            selected: "",
            search: null,
            selectedRadioId: null,
            filterRecipes: [],
            selectedID: ""
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.clear()
        }   
    }

    clear = () =>{
        var newSelected = "";
        this.setState({ selected: newSelected });
        var newSelectedRadioId = null;
        this.setState({ selectedRadioId: newSelectedRadioId });

    }

    onChangeRadio = (e) => {
        var newSelected = e.target.dataset.recipe;

        this.setState({ selected: newSelected });
        var newSelectedRadioId = e.target.id;
        this.setState({ selectedRadioId: newSelectedRadioId });
        this.props.recipes && Object.keys(this.props.recipes).map((recipe, index) => {
            if (this.props.recipes[recipe].name == newSelected) {
                this.props.set(recipe)
                this.setState({ selectedID: recipe })
            }
        })
        // this.props.set(newSelected)
    }

    onChangeSearch = (e) => {
        var newSearch = e.target.value;
        this.setState({ search: newSearch });

        var newSelected = "";

        this.setState({ selected: newSelected });
        var newSelectedRadioId = null;
        this.setState({ selectedRadioId: newSelectedRadioId });

    }

    render() {
        var filterRecipes = []

        if (this.props.menuState.filterIngredients.length == 0) {
            filterRecipes = this.state.recipes
        } else {
            var arrIngr = this.props.menuState.filterIngredients;
            for (let i = 0; i < this.state.recipesID.length; i++) {
                var name = this.props.recipes[this.state.recipesID[i]].name
                var recipeIngredients = []

                for (let j = 0; j < this.props.recipes[this.state.recipesID[i]].ingredients.length; j++) {
                    if (this.props.recipes[this.state.recipesID[i]].ingredients[j]) {
                        recipeIngredients.push(this.props.recipes[this.state.recipesID[i]].ingredients[j].name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())
                    }
                }
                var correct = true
                for (let j = 0; j < arrIngr.length; j++) {
                    if (!recipeIngredients.includes(arrIngr[j].normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())) {
                        correct = false
                    }
                }
                if (correct) {
                    filterRecipes.push(name)
                }
            }
        }
        return (



            <Card as="section" style={!this.props.isSmall ? { height: "60vh", borderColor: "#069697" } :
                { height: "37vh", borderColor: "#069697", marginTop: "1%", marginLeft: "1%", marginRight: "1%" }}


            >
                <Card.Header as="header" style={{ color: "white", backgroundColor: "#069697" }}>

                    <h4 className="float-left" style={{ width: "50%" }}>Found recipes:</h4>
                    <Form.Control
                        className="float-right" style={{ width: "50%" }}
                        type="text"
                        placeholder="Search recipe"
                        id="filterRecipe"
                        onChange={this.onChangeSearch}
                    />
                </Card.Header>
                <Card.Body style={{ overflow: "auto"}}
                >

                    {
                        filterRecipes.filter((data) => {
                            if (this.state.search == null)
                                return data
                            else if (data.toLowerCase().includes(this.state.search.toLowerCase())) {
                                return data
                            }
                        }).map((recipe, index) => {
                            var label = recipe
                                return (
                                    <div key={index}>
                                    <Form.Check
                                    key={index}
                                    type="radio"
                                    label={label}
                                    id={"r" + index}
                                    checked={this.state.selectedRadioId === "r" + index}
                                    name="recipe"
                                    data-recipe={recipe}
                                    onChange={this.onChangeRadio}
                                    style={{ fontSize: "20px" }}
                                /> 
                                {this.state.selectedRadioId === ("r" + index) ?
                                this.props.recipes[this.state.selectedID] && this.props.recipes[this.state.selectedID].ingredients 
                                && this.props.recipes[this.state.selectedID] && this.props.recipes[this.state.selectedID].ingredients.map((ing, index) => 
                                    <li style={{marginLeft:"5%"}} key={index}>{ing.name + " - " + ing.amount + ing.measurementUnit}</li>
                                ) : null}                                                            
                                </div>
                                )
                            } 

                        )}

                </Card.Body>
            </Card>


        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        recipes: state.firestore.data.recipes,
        menuState: state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: () => dispatch(addItem())
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "recipes" }])
)(FilteredRecipes)