import { SET_ELEMENT } from "./constants";

export const initState = 'HOME'

export const reducer = (state,action) => {
    switch(action.type){
        case SET_ELEMENT:
            return action.payload
        default:
            return new Error("Invalid action")
    }
}