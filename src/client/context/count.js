import React from 'react'
import { ContextProvider, useContext } from './ContextTemplate'

const initialState = { count: 0 }

const actions = {
  increment: () => ({ type: 'ADD' }),
  decrement: () => ({ type: 'MINUS' }),
  reset: () => ({ type: 'RESET' }),
  addBy: (payload) => ({ type: 'ADD-BY', payload }),
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': return { count: state.count + 1 }
    case 'MINUS': return { count: state.count - 1 }
    case 'ADD-BY': return { count: state.count + action.payload }
    case 'RESET': return initialState
    default: throw new Error(`Unsupported action type: ${action.type}`)
  }
}

const CountContext = React.createContext()
const CountProvider = props => ContextProvider(CountContext, props, { initialState, reducer })
const useCount = () => useContext(CountContext, actions)

export { CountProvider, useCount }
