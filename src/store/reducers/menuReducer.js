const initState = {
    loading: false, 
    error: "",
    allMenu: {},
    actualMenu: "",
    minimal: false, 
    newMenu : {
        author: "tester",
        creatingDate: "",
        date: "",
        state: "2",
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    },
    filterIngredients:[],
    expiringIngredients:{},
    otherIngredients:{}
}

const menuReducer=(state=initState, action) => {
    switch(action.type){
        case "SEND_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "FAIL":
            return {
                ...state,
                loading: false,
                allMenu: [], 
                error: action.payload,
                actualMenu: null
            }
            
        case "FETCH_ALL_MENU":

        return {
                ...state,
                loading: false,
                allMenu: action.payload, 
                error: "",
                actualMenu: null
            }

        case "FETCH_MENU":
            return {
                ...state,
                loading: false, 
                error: "",
                actualMenu: action.payload
            }

        case "CREATE_MENU":
            return {
                ...state,
                loading: false, 
                error: "", 
                actualMenu: null
            }

        case "DELETE_MENU":
            return {
                ...state,
                loading: false, 
                error: "", 
                actualMenu: null
            }

        case "SET_ACTUAL_MENU":
            return {
                ...state,
                loading: false, 
                error: "", 
                actualMenu: action.payload
            }

        
        case "SET_FIRST":
            return {
                ...state,
                loading: false, 
                error: "", 
                actualMenu: action.payload
            }
        
        case "PUSH_RECIPES":
            return {
                ...state, 
                newMenu: action.payload
            }

        case "SET_MINIMAL":
            return {
                ...state,
                loading: false, 
                error: "", 
                minimal: action.payload
            }
        
        case "SET_FILTER":
            return {
                ...state,
                loading: false, 
                error: "", 
                filterIngredients: action.payload
            }

        case "SET_EXPIRING_INGREDIENTS":
            return {
                ...state, 
                expiringIngredients: action.payload
            }

        case "SET_OTHER_INGREDIENTS":
            return {
                ...state, 
                otherIngredients: action.payload
            }
            
        default:
            return state
    }
}

export default menuReducer;