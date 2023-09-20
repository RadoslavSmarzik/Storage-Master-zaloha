import React, {Component} from 'react'
import {Container, Row, Button, Col, Table, Accordion, Image} from "react-bootstrap"
import {imgDown, imgSet, imgScrollUp, imgBasket, imgCheck2} from "./commonElements/Icons"
import calendar from "./obr/calendar.png"
import {tooltipBasic} from "./commonElements/TooltipBasic"
import {connect} from "react-redux";
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";
import CreatingMenu from "./CreatingMenu"
import "react-datepicker/dist/react-datepicker.css"
import Calendar from "./commonElements/Calendar"
import NeededIngredients from './NeededIngredients'
import {editItem} from "../../store/actions/menuActions"

class MenuDetail extends Component {

    constructor(props){
        super(props);
        this.state = {editing:false, settingDate:false, newDate: "", neededIngredients:false}
        var oldState = this.props.menu[this.props.menu1.actualMenu]
        var monday = []
        oldState.monday.map((recipe) => {monday.push(recipe)})
        var tuesday = []
        oldState.tuesday.map((recipe) => {tuesday.push(recipe)})
        var wednesday = []
        oldState.wednesday.map((recipe) => {wednesday.push(recipe)})
        var thursday = []
        oldState.thursday.map((recipe) => {thursday.push(recipe)})
        var friday = []
        oldState.friday.map((recipe) => {friday.push(recipe)})
        var menuState = {
            author: "tester",
            creatingDate: oldState.creatingDate,
            date: oldState.date,
            state: "2",
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday
        }
        this.props.setNewMenu(menuState)
        this.props.getExpiringIngredients()
    }

    changeDate(days){
        days = days.splice(1,1)
        var day = new Date(days)
        day = {nanoseconds: 0,
            seconds: day/1000}
        this.setState({newDate:day})
        console.log(this.state.newDate)
    }

    simulateClick(e) {
        if(e){
            e.click()
        }
    }

    handleDatePick = (e) => {
        var date = new Date(e)
    }

    scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    getNeededIngredients(){
        var recipes = []
        if (this.props.menu){
            var actualMenu = this.props.menu[this.props.index]
            recipes.push(actualMenu.monday)
            recipes.push(actualMenu.tuesday)
            recipes.push(actualMenu.wednesday)
            recipes.push(actualMenu.thursday)
            recipes.push(actualMenu.friday)
        }
        var ingredients = []
        if(this.props.recipes){
            for(let i = 0; i < recipes.length; i++){
                for(let j = 0; j < recipes[i].length; j++){
                    var recipe = this.props.recipes[recipes[i][j].recipe]
                    recipe && recipe.ingredients && recipe.ingredients.map((ing) => {
                        var newIng = {...ing}
                        newIng.amount = newIng.amount*1 * recipes[i][j].portions*1
                        ingredients.push(newIng)
                    })
                }  
            }
        }
        return ingredients
    }

    getPortions(){
        var recipes = []
        if (this.props.menu){
            var actualMenu = this.props.menu[this.props.index]
            recipes.push(actualMenu.monday)
            recipes.push(actualMenu.tuesday)
            recipes.push(actualMenu.wednesday)
            recipes.push(actualMenu.thursday)
            recipes.push(actualMenu.friday)
        }
        var ingredients = []
        if(this.props.recipes){
            for(let i = 0; i < recipes.length; i++){
                for(let j = 0; j < recipes[i].length; j++){
                    var recipe = this.props.recipes[recipes[i][j].portions] 
                }     
            }
        }
        return ingredients
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
            date1 = new Date((actualMenu.date.seconds + second5day) * 1000)
            nameDate = date.toLocaleDateString() + " - " + date1.toLocaleDateString()
            recipes.push(actualMenu.monday)
            recipes.push(actualMenu.tuesday)
            recipes.push(actualMenu.wednesday)
            recipes.push(actualMenu.thursday)
            recipes.push(actualMenu.friday)
        }
        var neededIngredients = this.getNeededIngredients() 

        if(this.state.editing){   
            return <CreatingMenu update={true} isSmall={this.props.isSmall}/>
        } else{
            return(
                <Container style={{width:"75%"}, this.props.isSmall ? {margin:"2%"}:null} as={"section"}>
               {
                    !this.props.isSmall ?                 
                    <Row as={"header"}>
                    <Col sm={9}><h1>
                        { actualMenu ?
                            nameDate
                        : null
                        }
                        </h1></Col>
                    <Col sm={1} className="repairMenu float-left" onClick={(e)=> this.setState({settingDate:!this.state.settingDate, neededIngredients:false})}>
                        {tooltipBasic("Set date", <Image src={calendar} className= "calendar" rounded />)}
                    </Col>
                    <Col sm={1} className="repairMenu float-left" onClick={()=> this.setState({editing:true})}>
                        {tooltipBasic("Edit", imgSet())}
                    </Col>
                    <Col sm={1} className="repairMenu float-left" onClick={()=> this.setState({settingDate:false, neededIngredients:!this.state.neededIngredients})}>
                        {tooltipBasic("Needed to buy", imgBasket())}
                    </Col>
                </Row>
                :
                <div as={"header"}>
                
                <h1 style={{fontSize:"2.5em"}}>{ actualMenu ? nameDate : null} </h1>
                <Row>
                    <Col sm={2} className="repairMenu float-left" onClick={(e)=> this.setState({settingDate:!this.state.settingDate, neededIngredients:false})}>
                        {tooltipBasic("Set date", <Image src={calendar} className= "calendar" rounded />)}
                    </Col>
                    <Col sm={2} className="repairMenu float-left" onClick={()=> this.setState({editing:true})}>
                        {tooltipBasic("Edit", imgSet())}
                    </Col>
                    <Col sm={2} className="repairMenu float-left" onClick={()=> this.setState({settingDate:false, neededIngredients:!this.state.neededIngredients})}>
                        {tooltipBasic("Needed to buy", imgBasket())}
                    </Col>
                </Row>
                </div>
                }
                {this.state.settingDate ? 
                                <>
                                <h3 style={this.props.isSmall ? {marginTop:"5%"}:null}>Select week for menu:</h3>
                                <Calendar changeDate={this.changeDate.bind(this)} />
                                <Button variant={"success"} style={{height:"40px"}} onClick={() => {
                                    var oldMenu = {...this.props.menu[this.props.menu1.actualMenu]}
                                    oldMenu.date = this.state.newDate
                                    oldMenu.state = "2"
                                    if(isNaN(oldMenu.date) !== false){
                                        this.props.editItem(oldMenu, this.props.menu1.actualMenu)
                                        this.setState({settingDate:false})
                                        this.props.setNewMenu(oldMenu)
                                    }}}
                                    style={{marginBottom:"2%"}}>
                                {imgCheck2()}
                                </Button>
                                </>

                            :
                this.state.neededIngredients ?
                                <NeededIngredients allIngredients={this.props.storage} ingredientsFromRecipe={neededIngredients} isSmall={this.props.isSmall}/>
                :
                            null
                        }
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
                                        {
                                            this.props.isSmall ? <td className="" style={{fontWeight:"bold"}}>{recipe1.portions}x</td>

                                            :
                                            <td className="align-middle" style={{fontWeight:"bold"}}>{recipe1.portions}x</td>
                                        }
                                        </tr>

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
}


const setNewMenu = (menu) => {
    return {
        type: "PUSH_RECIPES", 
        payload: menu
    }
}

const mapStateToProps = (state, props) => {
    return {
        menu: state.firestore.data.menu, 
        recipes: state.firestore.data.recipes,
        storage: state.firestore.data.storage,
        menu1 : state.menu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNewMenu: (menu) => dispatch(setNewMenu(menu)),
        editItem: (menu, index) => dispatch(editItem(menu, index)) 
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:"menu"}, {collection:"recipes"}, {collection:"storage"}])
)(MenuDetail)
