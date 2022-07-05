import { authConstant } from "./constants"

export  const login =(user)=>{
    console.log(user);
    return async (dispatch) =>{
        dispatch({
            type: authConstant.LOGIN_REQUEST,
            payload: {...user}
            })
    }
}