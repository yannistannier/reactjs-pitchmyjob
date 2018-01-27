import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import combinedReducer from './combinedReducer'

const middleware = applyMiddleware(promise(), thunk, logger())

export default createStore(combinedReducer, middleware)
