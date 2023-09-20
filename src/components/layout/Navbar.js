import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-bootstrap';


const Navba = () => {

  return (
   
 
  <Nav justify variant="tabs" defaultActiveKey="/home" className = "moja">
      <Navbar className = "moja">
  <Nav.Item >
    <Nav.Link href="home"  className ="storagemaster">Stora<span className = "logo">g</span>e Master</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="Menu" className ="moj">Menu</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="Recipes" className ="moj">Recipes</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link ev href="Storage" className ="moj">Storage </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link ev href="SignIn" className ="moj">SignIn </Nav.Link>
  </Nav.Item>
  </Navbar>
</Nav>

  )
}

            const mapStateToProps = (state) => {
                // console.log(state);
                return{
                    auth: state.firebase.auth
                }
            }

            export default connect(mapStateToProps)(Navba)
