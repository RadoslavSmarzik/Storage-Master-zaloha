import {combineReducers} from "redux";
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import recipesReducer from "./recipesReducer"
import authReducer from './authReducer'
import menuReducer from "./menuReducer"

const rootReducer = combineReducers({
    recipes: recipesReducer,
    auth: authReducer,
    menu: menuReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer

})

export default rootReducer;