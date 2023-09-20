import React from 'react'
import { useMediaQuery } from 'react-responsive'
import MenuDetail from "./MenuDetail"

const MenuDetailSelection = (props) => {

    const isSmall = useMediaQuery({ query: '(max-width: 1000px)' })

    return(
        <MenuDetail index={props.index} isSmall={isSmall} getExpiringIngredients={props.getExpiringIngredients}/>
    )

}

export default MenuDetailSelection