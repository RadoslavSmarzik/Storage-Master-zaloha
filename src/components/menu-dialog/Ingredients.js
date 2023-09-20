import React, { Component } from "react";
import { Button, Card, Col, InputGroup, FormControl, Form, Dropdown } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { addItem } from "../../store/actions/recipeActions"
import { useMediaQuery } from 'react-responsive'
import MediaQuery from 'react-responsive'


class Ingredients extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expiration: [],
      checked: [],
      filterBox: [],
      filterText: {},
      ind: 0,
      ingredients: [],
      current: null,
    };
  }

 /* componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      var ingredients1 = []
      this.props.storage && Object.keys(this.props.storage).map((ing, index) => {
        ingredients1.push(this.props.storage[ing].name)
      }
      )

      var expiration1 = []
      /*this.props.storage && Object.keys(this.props.storage).map((ing, index) => {
        var itemDate = new Date(this.props.storage[ing].expirationDate.seconds * 1000)
        var currentDate = new Date(Date.now())
        var dateDiff = Math.floor((itemDate - currentDate) / 86400000);
        if (dateDiff <= 7) {
          expiration1.push(this.props.storage[ing].name)
        }
      }
      )*/
  /*    console.log("EXPIRIIR")
      console.log(this.props.menuState)
      this.props.menuState && this.props.menuState.expiringIngredients && Object.keys(this.props.menuState.expiringIngredients).map((ing, index) => {
          if(this.props.menuState.expiringIngredients[ing][0] > 0){
            expiration1.push(ing)
          }
      }
      )

      if (this.state.checked.length == 0) {

        var chec = []
        for (let i = 0; i < expiration1.length; i++) {
          chec.push(-1)
        }
        this.setState({ checked: chec })
      }

      this.setState({ ingredients: ingredients1 })
      this.setState({ expiration: expiration1 })
    }
  }*/

  componentDidMount(){
    var ingredients1 = []
    this.props.storage && Object.keys(this.props.storage).map((ing, index) => {
      ingredients1.push(this.props.storage[ing].name)
    }
    )

    var expiration1 = []
    /*this.props.storage && Object.keys(this.props.storage).map((ing, index) => {
      var itemDate = new Date(this.props.storage[ing].expirationDate.seconds * 1000)
      var currentDate = new Date(Date.now())
      var dateDiff = Math.floor((itemDate - currentDate) / 86400000);
      if (dateDiff <= 7) {
        expiration1.push(this.props.storage[ing].name)
      }
    }
    )*/
    this.props.menuState && this.props.menuState.expiringIngredients && Object.keys(this.props.menuState.expiringIngredients).map((ing, index) => {
        if(this.props.menuState.expiringIngredients[ing][0] > 0){
          expiration1.push(ing)
        }
    }
    )

    if (this.state.checked.length == 0) {

      var chec = []
      for (let i = 0; i < expiration1.length; i++) {
        chec.push(-1)
      }
      this.setState({ checked: chec })
    }

    this.setState({ ingredients: ingredients1 })
    this.setState({ expiration: expiration1 })  
  }


  handleClick = () => {
    var newFilterText = this.state.filterText
    newFilterText["t" + this.state.ind] = ""
    this.setState({ filterText: newFilterText })
    this.setState({ ind: this.state.ind + 1 })
    this.applyFilter()


  }

  handleClick2 = (e) => {
    var index = "t" + e.target.id.replace("b", "");
    var newFilterText = this.state.filterText;
    delete newFilterText[index];
    this.setState({ filterText: newFilterText })
    this.applyFilter()

  }

  onChangeCheckbox = (e) => {
    var index = e.target.id.replace("e", "")


    if (this.state.checked[index] == -1) {
      var newChecked = this.state.checked
      newChecked[index] = 0
      this.setState({ checked: newChecked })

      var newFilterBox = this.state.filterBox
      newFilterBox.push(this.state.expiration[index])
      this.setState({ filter: newFilter })

    }
    else {

      var newChecked = this.state.checked
      newChecked[index] = -1
      this.setState({ checked: newChecked })
      var newFilter = this.state.filterBox.filter(item => item !== this.state.expiration[index])
      this.setState({ filter: newFilter });
    }

    this.applyFilter()
  }


  onInputChangeTextType = (value, event) => {

    var name = event.target.id;
    var val = value;
    var newFilterText = this.state.filterText;
    newFilterText[name] = val
    this.setState({ filterText: newFilterText })
    this.applyFilter()



  }


  onFocusTextType = (e) => {
    var newCurrent = e.target.id
    this.setState({ current: newCurrent })
  }


  onChangeTextType = (value) => {


    var name = this.state.current;
    var val = value[0];
    var newFilterText = this.state.filterText;
    newFilterText[name] = val
    this.setState({ filterText: newFilterText })
    if (this.state.ingredients.indexOf(val) > -1) {
      this.applyFilter()
    }




  }

  applyFilter = () => {

    var arrayFilter = []
    for (let i = 0; i < this.state.checked.length; i++) {
      if (this.state.checked[i] == 0) {
        arrayFilter.push(this.state.expiration[i])
      }
    }
    for (const [key, value] of Object.entries(this.state.filterText)) {

      if (value != "") {
        arrayFilter.push(value);

      }
    }




    this.props.setNewFilter(arrayFilter)

  }




  render() {
    return (
      <Card as="aside" className="bg-light" style={
        !this.props.isSmall ?
          { border: "0", overflow: "auto", height: "60vh" } :
          { height: "37vh", marginTop: "1%", marginLeft: "1%", marginRight: "1%", border: "#069697 solid 1px" }} >

        <Card.Body style={{ overflow: "auto" }} >
          <Button variant="success" onClick={this.handleClick}>+Ingredient</Button>

          {
            Object.entries(this.state.filterText).reverse().map(([k, v]) => (
              <div key={k}>

                <Typeahead
                  className="float-left"
                  style={{ marginTop: "10px", width: "70%" }}
                  options={this.state.ingredients}
                  id={"typeahead" + k}
                  positionFixed
                  inputProps={{ id: k }}


                  onFocus={this.onFocusTextType}
                  onChange={this.onChangeTextType}
                  onInputChange={this.onInputChangeTextType}
                  placeholder={"Search ingredient"}

                />
                <Button
                  className="float-right"
                  className="rounded-circle"
                  variant="danger"
                  id={"b" + k.replace("t", "")}
                  style={{ marginTop: "10px", marginLeft: "10px", fontWeight: "bold" }}
                  onClick={this.handleClick2}>x</Button>
              </div>

            ))}

          <h2 style={{ fontSize: "18px", margin: " 5px 0 5px 0", fontWeight: "bold" }}>Close to expiration date:</h2>
          <div style={{ marginTop: "10px" }}>
            {console.log(this.state.expiration)}
            {this.state.expiration.map((value, index) => 
                <Form.Check
                key={index}
                type="checkbox"
                label={value + " - " + this.props.menuState.expiringIngredients[value][0] + this.props.menuState.expiringIngredients[value][1]}
                name="formHorizontalRadios"
                id={"e" + index}
                onChange={this.onChangeCheckbox}
                style={{ color: "red", fontSize: "18px" }}
            />
            )}

          </div>

        </Card.Body>
      </Card>



    )


  }



}


const setNewFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter
  }
}

const mapStateToProps = (state, props) => {
  return {
    storage: state.firestore.data.storage,
    menuState: state.menu
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewFilter: (filter) => dispatch(setNewFilter(filter)),
    addItem: () => dispatch(addItem())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "storage" }])
)(Ingredients)
