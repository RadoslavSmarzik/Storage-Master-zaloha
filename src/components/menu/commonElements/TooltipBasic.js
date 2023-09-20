import {OverlayTrigger, Tooltip} from "react-bootstrap"


export const tooltipBasic = (message, image, classFromInput) => {
    var class1 = "d-inline-block rounded-circle " + classFromInput
    return <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{message}</Tooltip>}>
                <span className={class1} style={{marginTop:"1%"}}>
                    {image}
                </span>
            </OverlayTrigger>
}



