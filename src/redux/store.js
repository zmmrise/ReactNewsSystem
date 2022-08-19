import { legacy_createStore as createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import CollapsedReducer from './reducers/CollapsedReducer'
import LoadingReducer from './reducers/LoadingReducer'
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['LoadingReducer']
}
const combineReducer = combineReducers({
    CollapsedReducer, LoadingReducer
})
const persistedReducer = persistReducer(persistConfig, combineReducer)

const store = createStore(persistedReducer)

const persiststore = persistStore(store)

export {store, persiststore}