import { SET_MODAL } from "./constants";

export const initState = false

export const reducer = (state, action) => {
    switch (action.type) {
        case SET_MODAL:
            return action.payload
        default:
            return new Error("Invalid action")
    }
}