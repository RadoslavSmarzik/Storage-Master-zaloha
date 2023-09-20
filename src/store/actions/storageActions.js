export const addItem = (item) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection("storage").add({
            amount: item.amount,
            expirationDate: item.expirationDate,
            measurementUnit: item.measurementUnit,
            name: item.name
        }).then(
            (docRef)=> {console.log(docRef)} 
        ) 
    }
}

export const editItem = (item) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection("storage").doc(item.id).update({
            amount: item.amount,
            expirationDate: item.expirationDate,
            measurementUnit : item.measurementUnit,
            name: item.name
        }).then(
            (docRef)=> {} 
        )    
    }
}

export const deleteItem = (item) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection("storage").doc(item.id).delete() 
         
    }
}