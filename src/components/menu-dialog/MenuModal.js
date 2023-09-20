import React, { Children, useState } from "react";
import { Button, Modal } from 'react-bootstrap'
import Ingredients from "./Ingredients"
import FilteredRecipes from "./FilteredRecipes"
import { connect } from "react-redux"
import { compose } from "redux";
import './MenuDialog.css';
import { useMediaQuery } from 'react-responsive'



const MenuModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); props.setNewFilter([]) }
  const handleShow = () => setShow(true);
  var day = props.day;
  var number = props.number;
  var selectedRecipe = "";
  var newMenu = props.menu1.newMenu




  const setRecipe = (recipe) => { selectedRecipe = recipe }
  const isSmall = useMediaQuery({ query: '(max-width: 800px)' })
  const isMedium = useMediaQuery({ query: '(max-width: 1200px)' })

  return (
    <div>
      <Button variant="success" className="rounded-circle" style={isSmall ? {padding:"0%", height:"42px", width:"42px", marginBottom: "5%"}:null} onClick={handleShow}> + </Button>

      <Modal
        as="form"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}

        dialogClassName={isSmall ? "my-modal-small" : isMedium ? "my-modal-small" : "my-modal"}


      >
        <Modal.Header as={"section"} style={{ backgroundColor: "#f0f1f2", padding: "20px" }}>
          <Modal.Title>{day}</Modal.Title>
          <Button variant="danger" onClick={handleClose} style={{ fontWeight: "bold" }}>x</Button>

        </Modal.Header>


        {isSmall ?
          <Modal.Body as="section" className="bg-light" style={{ paddingTop: "0" }} >
            <Ingredients isSmall={isSmall}></Ingredients>
            <FilteredRecipes set={setRecipe} isSmall={isSmall}></FilteredRecipes>
          </Modal.Body>

          :
          <Modal.Body className="bg-light" style={{ paddingTop: "0" }}>
            <div className="float-left" style={{ margin: "0", width: "34%", marginTop: "5%", marginRight: "1%" }}>
              <Ingredients isSmall={isSmall}></Ingredients>

            </div>
            <div className="float-left" style={{ width: "64%", margin: "0", marginTop: "5%", marginRight: "1%" }}>

              <FilteredRecipes set={setRecipe} isSmall={isSmall}></FilteredRecipes>
            </div>
          </Modal.Body>
        }

        <Modal.Footer as="footer" className="bg-light" style={{ justifyContent: 'center', border: "0" }}>
            <Button variant="success" onClick={() => {
              var rec = []
              if(selectedRecipe != ""){
                if (props.day === "monday") {
                  rec = props.menu1.newMenu.monday
                  rec.push({ recipe: selectedRecipe, portions: "1" })
                  newMenu.monday = rec
                } else if (props.day === "tuesday") {
                  rec = props.menu1.newMenu.tuesday
                  rec.push({ recipe: selectedRecipe, portions: "1" })
                  newMenu.tuesday = rec
                } else if (props.day === "wednesday") {
                  rec = props.menu1.newMenu.wednesday
                  rec.push({ recipe: selectedRecipe, portions: "1" })
                  newMenu.wednesday = rec
                } else if (props.day === "thursday") {
                  rec = props.menu1.newMenu.thursday
                  rec.push({ recipe: selectedRecipe, portions: "1" })
                  newMenu.thursday = rec
                } else if (props.day === "friday") {
                  rec = props.menu1.newMenu.friday
                  rec.push({ recipe: selectedRecipe, portions: "1" })
                  newMenu.friday = rec
                }
              }
              if(!props.update){
                localStorage.setItem("menu", JSON.stringify(newMenu))
              }
              props.setNewMenu(newMenu)
              props.recalculateExpiringIngredients(-1,selectedRecipe)
              handleClose()
            }}

              style={isSmall ?{width: "25%", fontSize: "20px" }:{width: "25%", fontSize: "20px", marginLeft: "35%"}}>Select</Button>

        </Modal.Footer>



      </Modal>
    </div>
  );
}




const mapStateToProps = (state, props) => {
  return {
    menu1: state.menu
  }
}

const setNewMenu = (menu) => {
  return {
    type: "PUSH_RECIPES",
    payload: menu
  }
}

const setNewFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //addItem: () => dispatch(addItem())
    setNewMenu: (menu) => dispatch(setNewMenu(menu)),
    setNewFilter: (filter) => dispatch(setNewFilter(filter))
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  //firestoreConnect([{}])
)(MenuModal)
