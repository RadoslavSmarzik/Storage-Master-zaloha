import firebase from "../../config/config"

export const sendRequest = () => {
    return {
        type: "SEND_REQUEST"
    }
}

export const fail = error => {
    return {
        type: "FAIL", 
        payload: error
    }
}

export const fetchAllMenuSuccess = menu => {
    return {
        type: "FETCH_ALL_MENU", 
        payload: menu
    }
}

export const fetchMenuSuccess = menu => {
    return {
        type: "FETCH_MENU", 
        payload: menu
    }
}


export const setExpiringIngredients = ingr => {
    return {
        type: "SET_EXPIRING_INGREDIENTS", 
        payload: ingr
    }
}

export const setOtherIngredients = ingr => {
    return {
        type: "SET_OTHER_INGREDIENTS", 
        payload: ingr
    }
}



export const fetchAllMenu = () => {
    return (dispatch) => {
        dispatch(sendRequest())
        const db = firebase.firestore()
        db.collection("menu").get()
        .then(response => {
            var result = {}
            response.docs.map(doc => {
                result[doc.id] = doc.data()
            })
            dispatch(fetchAllMenuSuccess(result))
        })
        .catch(error => {
            dispatch(fail(error.message))
        })  
    }
}


export const editItem = (menu, index) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("menu").doc(index).update({
            state: menu.state,
            author: menu.author, 
            creatingDate: menu.creatingDate, 
            date: menu.date, 
            friday: menu.friday, 
            thursday: menu.thursday, 
            wednesday: menu.wednesday, 
            tuesday: menu.tuesday, 
            monday: menu.monday
        })
        
    }
}

export const addItem = (menu) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        var curr = new Date;
        var date1 = new Date(curr.setDate(curr.getDate() - curr.getDay()+8))
        firestore.collection("menu").add({
            author: "tester",
            creatingDate: {nanoseconds: 0,
                seconds: Date.now()/1000} ,
            date: {nanoseconds: 0,
                seconds: date1/1000},

            state: "2",
            monday: menu.monday,
            tuesday: menu.tuesday,
            wednesday: menu.wednesday,
            thursday: menu.thursday,
            friday: menu.friday
        })
        
        
    }
}

export const deleteItem = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection("menu").doc(id).delete() 
         
    }
}