import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'

import application from './application/reducer'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import transactions from './transactions/reducer'
import fees from './fees/reducer'
import swap from './swap/reducer'
import mint from './mint/reducer'
import burn from './burn/reducer'
import multicall from './multicall/reducer'
import tokenList from './lists/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions']

const persistenceNamespace = 'swapr'
const store = configureStore({
  reducer: {
    application,
    user,
    transactions,
    fees,
    swap,
    mint,
    burn,
    multicall,
    tokenList
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    save({ states: PERSISTED_KEYS, namespace: persistenceNamespace })
  ],
  preloadedState: load({ states: PERSISTED_KEYS, namespace: persistenceNamespace })
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
