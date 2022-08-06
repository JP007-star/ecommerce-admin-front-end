import { authConstant } from "../actions/constants"

const initState ={
    token:null,
    user:{
       firstName:'',
       lastName:'',
       email:'',
       picture:'' 
    },
    authenticate: false,
    authenticating: false
}

export default (state=initState,action)=>{
    console.log(action);
      switch(action.type){

        case authConstant.LOGIN_REQUEST:
            state={
              ...state,
              authenticating:true
            }
            break;

        case authConstant.LOGIN_SUCCESS:
          state={
            ...state,
            user:action.payload.user,
            token:action.payload.token,
            authenticate:true,
            authenticating:false
          }
          break;
        case authConstant.LOGOUT_REQUEST:
          state={
            ...initState
          }
          break;

      }

      return state;
}