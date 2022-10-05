import { pageConstants } from "../actions/constants";

const initailData={
    error:null,
    loading:false,
    page:[]
}
export default (state=initailData,action)=>{
    switch(action.type){
       case pageConstants.CREATE_PAGE_REQUEST:{

       }
    break;
    case pageConstants.CREATE_PAGE_SUCCESS:{

       }
    break;
    case pageConstants.CREATE_PAGE_FAILURE:{

       }
    break;
    }
    return state
}