import * as type from '../action/types'

const initialState = {
    data: []
}

export const imaginaryData = (state= initialState, action) => {
    switch(action.type)
    {
        case type.Imaginary:
            return {...state, data : action.payload}
        default:
            return state;
    }
}

