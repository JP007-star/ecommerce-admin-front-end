import { categoryConstants } from "../actions/constants"

const initState={
    categories:[],
    loading: false,
    error:null
}

export default (state = initState,action)=>{
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories
            }
            break
            case categoryConstants.ADD_CATEGORIES_REQUEST:
                state={
                    ...state,
                    loading:true
                }
            case categoryConstants.ADD_CATEGORIES_SUCCESS:
                state={
                    ...state,
                    loading:false
                }
                break
            case categoryConstants.ADD_CATEGORIES_FAILURE: 
                state={
                 ...initState
                }
                break
    }
    return state
}