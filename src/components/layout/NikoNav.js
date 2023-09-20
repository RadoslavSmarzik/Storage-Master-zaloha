import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav , NavDropdown, Row,Button} from 'react-bootstrap';
import firebase from "firebase"
import '../../styles.css'
import {withRouter} from "react-router-dom"
import { useMediaQuery } from 'react-responsive'

const NikoNav = (props) => {
    var user = firebase.auth().currentUser
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' })

    return (
        props.auth.isLoaded ?
            <Navbar bg="dark" variant= "dark" expand="lg" >
                {
                    isMobile ?
                        <Navbar.Brand href="Home" className ="font-weight-bold pl-1 pr-1" style={{"fontSize": "1.2em"}}>
                            <Row><div >Stora</div><div style={{"color":" #069697"}}>g</div><div>eMaster</div></Row>  
                        </Navbar.Brand>
                    :
                        <Navbar.Brand href="Home" className ="font-weight-bold pl-1 pr-3" style={{"fontSize": "1.5em"}}>
                            <Row><div >Stora</div><div style={{"color":" #069697"}}>g</div><div>eMaster</div></Row>  
                        </Navbar.Brand>
                }

                {
                    user ? 
                        <Nav className="mr-auto" defaultActiveKey="/home">
                            <Nav.Item className="pl-3 pr-3" >
                                <Nav.Link className={props.location.pathname === "/Menu" ? "myNavItemActive":"myNavItem"}  href="Menu">Menu</Nav.Link>
                            </Nav.Item>
                            {/*
                            <Nav.Item className="pl-3 pr-3">
                                <Nav.Link className={props.location.pathname === "/Recipes" ? "myNavItemActive":"myNavItem"} href="Recipes">Recipes</Nav.Link>
                            </Nav.Item>
                            */}
                            <Nav.Item className="pl-3 pr-3">
                                <Nav.Link className={props.location.pathname === "/Storage" ? "myNavItemActive":"myNavItem"} href="Storage">Storage </Nav.Link>
                            </Nav.Item>      
                        </Nav>
                    :
                        <Nav className="mr-auto"></Nav>
                }
                
                {
                    user ?
                    <Nav className="xs-2 pull-right">
                        {
                            isMobile ?
                                <Button variant="outline-info" style={{"color":" #069697"}} size ={"xxs"} onClick={()=>firebase.auth().signOut()}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
                                    <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                                    </svg>
                                    <br/>
                                    <div style={{"fontSize":"0.8em"}}>
                                        Sign Out
                                    </div>
                                </Button>
                            :
                                <NavDropdown title={user.email} id="nav-dropdown">
                                    <NavDropdown.Item eventKey="4.1" onClick={()=>firebase.auth().signOut()}>Sign Out</NavDropdown.Item>
                                </NavDropdown> 
                        }
                            
                    </Nav>
                :
                    <Nav className="xs-2">
                        <Nav.Item>
                            <Nav.Link className="text-white font-weight-bold" style={{"fontSize": "1.2em"}} href="SignIn" >SignIn</Nav.Link>
                        </Nav.Item>
                    </Nav>
                }

            </Navbar>
        :
            null

  )
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

export default withRouter(connect(mapStateToProps)(NikoNav))
