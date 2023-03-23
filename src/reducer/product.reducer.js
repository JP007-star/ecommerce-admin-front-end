import { productConstants } from "../actions/constants"


const initailData={
    error:null,
    loading:false,
    products:[],
}
export default (state=initailData,action)=>{
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state={
                ...state,
                loading:true
            }
            break
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state={
                ...state,
                products:action.payload.products,
                loading:false
            }
            break
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state={
                ...state,
          loading:false,
          error:action.payload.error
            }
            break
    }
    return state
}