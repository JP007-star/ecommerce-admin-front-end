import { productsContants } from "../actions/constants";

const initailData={
    products:[]
}
export default (state=initailData,action)=>{
    switch(action.type){
        case productsContants.GET_ALL_PRODUCTS_SUCCESS:
            state={
                ...state,
                products:action.payload.products
            }
            break
    }
    return state
}