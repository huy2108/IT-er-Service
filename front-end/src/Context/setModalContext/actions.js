import { SET_MODAL } from "./constants";

export const setModal = (payload) => {
    return {
        type: SET_MODAL,
        payload
    }
}
