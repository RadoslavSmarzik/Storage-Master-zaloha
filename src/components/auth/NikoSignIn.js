import React, { Component } from 'react'
import { Container, Form,Button,Row,Col} from 'react-bootstrap';
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import logo from './logo.png';


class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
   
  }
  render() {
    const { authError } = this.props;
   
    return (
        <Container className={"mt-3"}>
            <Row></Row>
            <Row className="justify-content-center">
                
                <Col xs={"auto"}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.handleChange(e,"email")}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                    </Form.Group>
                
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => this.handleChange(e,"password")}/>
                    </Form.Group>
                    <Button variant="success" type="submit">
                    Login
                    </Button>
                </Form>
                { authError ? <p>{authError}</p>: window.location.href ="Home"} 
                </Col>
            </Row>
        </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError
  }
}
    //window.location.href ="Home"
  

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
