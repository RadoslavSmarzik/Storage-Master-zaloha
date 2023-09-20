import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useMediaQuery } from 'react-responsive'


const Footer = () =>  {
    
    const isSmall = useMediaQuery({ query: '(max-width: 800px)' })
    
        return(
        
        <footer className = "footer" >

{!isSmall?
<Container >

<Row>
    <Col >
    <a href="home"  >Storage Master
    
    </a>
</Col>
    <Col>Dobre Kusy, Comenius University in Bratislava</Col>
 <Col>
 
 <a href = "mailto: dobrekusy@gmail.com"> dobrekusy@gmail.com</a></Col>
  </Row>
  <Row>
      <Col></Col>
      <Col><small>&copy; Copyright 2020, Dobre Kusy</small></Col>
      <Col></Col>
  </Row>
  </Container>
  
:
<div>
<p><a href="home"  >Storage Master</a></p>
<p>Dobre Kusy, Comenius University in Bratislava</p>
<p><a href = "mailto: dobrekusy@gmail.com"> dobrekusy@gmail.com</a></p>
<p><small>&copy; Copyright 2020, Dobre Kusy</small></p>



</div>
        
            
}

  
</footer>
        )
    

}


export default Footer