import {createStore, combineReducers} from 'redux.min.js'
import getUserInfo from 'getUserInfo.js'

module.exports = createStore(combineReducers({getUserInfo}))
