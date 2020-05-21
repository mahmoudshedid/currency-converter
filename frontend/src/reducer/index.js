import { combineReducers } from 'redux'

import convertReducer from './converter.reducer'

const rootReducer = combineReducers({
    converterData: convertReducer,
})

export default rootReducer