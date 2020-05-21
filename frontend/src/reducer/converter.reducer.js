import * as actions from '../action/converter.action'

export const initialState = {
    status: true,
    hasErrors: false,
    message: '',
    loading: false,
    amount: 0,
}

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case actions.START_CONVERT_AMOUNT:
            return { ...state, loading: true }

        case actions.CONVERT_AMOUNT_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                hasErrors: false,
                message: action.payload.message,
                loading: false,
                amount: action.payload.amount
            }

        case actions.CONVERT_AMOUNT_FAILURE:
            return { ...state, status: false, hasErrors: true, loading: false }

        default:
            return state
    }
}