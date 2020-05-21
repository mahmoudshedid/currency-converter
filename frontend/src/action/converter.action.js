export const START_CONVERT_AMOUNT = 'START_CONVERT_AMOUNT';
export const CONVERT_AMOUNT_SUCCESS = 'CONVERT_AMOUNT_SUCCESS'
export const CONVERT_AMOUNT_FAILURE = 'CONVERT_AMOUNT_FAILURE';
export const DISALLOW_NOTIFICATION = 'DISALLOW_NOTIFICATION';

export const convertAmountStart = () => ({ type: START_CONVERT_AMOUNT });
export const convertAmountSuccess = convertResult => ({ type: CONVERT_AMOUNT_SUCCESS, payload: convertResult });
export const convertAmountFailure = () => ({ type: CONVERT_AMOUNT_FAILURE });
export const disallowNotification = () => ({ type: DISALLOW_NOTIFICATION });

export function fetchConvertAmount(amount, fromTo) {
    return async dispatch => {
        dispatch(convertAmountStart())
        try {
            const response = await fetch(process.env.REACT_APP_BACK_END_API_URL + '?amount=' + amount + '&from_to=' + fromTo, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json()

            dispatch(convertAmountSuccess(data))
        } catch (error) {
            dispatch(convertAmountFailure());
        }
    }
}

export function notification() {
    return async dispatch => {
        dispatch(disallowNotification());
    }
}