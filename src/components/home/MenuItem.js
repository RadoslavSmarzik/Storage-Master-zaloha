import React, {Component} from 'react'
import {Container, Row, Button, Col, Table, Accordion, Card, Image} from "react-bootstrap"
import PlusMinusButton from '../menu/commonElements/PlusMinusButton'
import {imgDown, imgSet, imgDownload, imgScrollUp, imgCalendar} from "../menu/commonElements/Icons"
import calendar from "../menu/obr/calendar.png"
import {tooltipBasic} from "../menu/commonElements/TooltipBasic"
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
//import {fetchMenu} from "../../store/actions/menuActions"



class MenuDetail extends Component {

    constructor(props){
        super(props);
    }

    simulateClick(e) {
        e.click()
    }

    scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    render(){

        var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        const second5day = 432000;
        var actualMenu = null
        var date = null
        var date1 = null
        var nameDate = null
        var recipes = []
        if (this.props.menu){
            actualMenu = this.props.menu[this.props.index]
            date = new Date(actualMenu.date.seconds*1000)
            console.log(actualMenu.date)
            date1 = new Date((actualMenu.date.seconds + second5day) * 1000)
            nameDate = date.toLocaleDateString() + " - " + date1.toLocaleDateString()
            recipes.push(actualMenu.monday)
            recipes.push(actualMenu.tuesday)
            recipes.push(actualMenu.wednesday)
            recipes.push(actualMenu.thursday)
            recipes.push(actualMenu.friday)
        }

        return(
                <Container>
                <Row>
                    <Col sm={10}><h1>
                        { actualMenu ?
                            nameDate
                        : null
                        }
                        </h1></Col>
                    
                </Row>
                {days.map((day, index) => 
                    <Table key={index} striped hover className="detailMenu">
                            <thead>
                            <tr><th>{day}</th></tr>
                            </thead>
                            <tbody>
                                {recipes.length && recipes[index].map((recipe1, index1) =>
                                    <tr key={index1}><td><Accordion>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                                            {this.props.recipes && this.props.recipes[recipe1.recipe] && this.props.recipes[recipe1.recipe].name}
                                            {' '}
                                            {imgDown()}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <ul>
                                                {
                                                    this.props.recipes && this.props.recipes[recipe1.recipe] && this.props.recipes[recipe1.recipe].ingredients && this.props.recipes[recipe1.recipe].ingredients.map((ingredient, index2) =>
                                                    <li key={index2}>{ingredient.name} - {ingredient.amount}{ingredient.measurementUnit}</li>
                                                )}
                                            </ul> 
                                        </Accordion.Collapse>
                                        </Accordion></td>
                                        <td className="align-middle">{recipe1.portions}x</td></tr>
                            )}
                            </tbody>
                    </Table>            
                )}
                <div className="btnScrollUp rounded-circle" ref={this.simulateClick} onClick={this.scrollTop}>

                    {imgScrollUp()}                                         

                </div>

            </Container>                

            
        )
    }  
}


const mapStateToProps = (state, props) => {
    return {
        menu: state.firestore.data.menu, 
        recipes: state.firestore.data.recipes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //fetchMenu: (id) => dispatch(fetchMenu(id)),
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"menu"}, {collection:"recipes"}])
)(MenuDetail)
