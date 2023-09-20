import React, {Component} from 'react'
import {Spinner} from "react-bootstrap"
import MenuCard from "./MenuCard"
import MenuCardMobile from "./MenuCardMobile"
import { connect } from "react-redux"
import {compose} from "redux";
import { firestoreConnect } from "react-redux-firebase";

class AllMenuCards extends Component{

    constructor(props){
        super(props);
        this.state={pokus:false}
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
          this.setState({ pokus: true })
        }
      }

    render(){
        if(!this.props.menu){
            return <article style={{textAlign:"center"}}><Spinner animation="border" /></article>
        } else{
            return(
                <>
                    {this.props.menu && Object.keys(this.props.menu).map((menu1, index) => 
                        <article key={index}>
                        {
                            this.props.menu && this.props.menu[menu1]? 
                            this.props.isSmall ?
                            <MenuCardMobile 
                            index={menu1}
                            menu={this.props.menu[menu1]}
                            sidebar = {this.props.sidebar}
                        /> 
                            :
                            <MenuCard 
                            index={menu1}
                            menu={this.props.menu[menu1]}
                            sidebar = {this.props.sidebar}
                        />   
                            :
                            null
                        }
                        </article>
                    )}
                </>
            )
        }
        }
}

const mapStateToProps = (state, props) => {
    return {
        menu: state.firestore.data.menu,
        menu1: state.menu
    }
}

export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([{collection:"menu", orderBy:["state","desc"]}])
)(AllMenuCards)

