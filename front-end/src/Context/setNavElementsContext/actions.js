import { SET_ELEMENT } from "./constants";

export const setElement = payload => {
    return {
        type: SET_ELEMENT,
        payload
    }
}
