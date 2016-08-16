/**
 * Created by Elf on 15.08.2016.
 */
import * as ActionTypes from './../constants/BlinsActionsType';

const initState = {
    blins: [],
}

export default function blinsReducer(state = initState, action) {
    switch(action.type) {
        case ActionTypes.FETCH_BLINS:
            return Object.assign({}, state, {
                blins: action.payload,
            });
        default:
            return state;
    }
}