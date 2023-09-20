import React, {Component} from 'react'
import {Row, Col} from "react-bootstrap"
import CreatingMenu from './CreatingMenu'
import AllMenuCards from './AllMenuCards';
import { useMediaQuery } from 'react-responsive'

const AllMenuMinimal = (props) => {
    const isSmall = useMediaQuery({ query: '(max-width: 1000px)' })

    return(
        <Row style={{marginLeft:"0%", marginRight:"0%"}}>
            {isSmall ? 
                null
            :
                <Col sm={2} as={"aside"}>
                    <AllMenuCards numCol={12} sidebar={true} isSmall={isSmall} />
                </Col>
            }
            
            <Col sm={9} as={"section"}>
                <CreatingMenu isSmall={isSmall}/>
            </Col>
        </Row>
    )
      
}

export default AllMenuMinimal