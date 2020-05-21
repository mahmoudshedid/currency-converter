export const START_CONVERT_AMOUNT = 'START_CONVERT_AMOUNT';
export const CONVERT_AMOUNT_SUCCESS = 'CONVERT_AMOUNT_SUCCESS'
export const CONVERT_AMOUNT_FAILURE = 'CONVERT_AMOUNT_FAILURE';

export const convertAmountStart = () => ({ type: START_CONVERT_AMOUNT });
export const convertAmountSuccess = convertResult => ({ type: CONVERT_AMOUNT_SUCCESS, payload: convertResult });
export const convertAmountFailure = () => ({ type: CONVERT_AMOUNT_FAILURE });

export function fetchConvertAmount(amount) {
    return async dispatch => {
        dispatch(convertAmountStart())

        try {
            const response = await fetch('https://127.0.0.1:8000/api/currency-converter?amount=' + amount + '&from_to=PLN_EUR', {
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