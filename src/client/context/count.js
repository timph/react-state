import React from 'react'

const CountContext = React.createContext()
const initialState = { count: 0 }

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    console.error('useCount must be used in CountProvider')
  }
  const [state, dispatch] = context
  const increment = () => dispatch({ type: 'ADD' })
  const decrement = () => dispatch({ type: 'MINUS' })

  return { state, dispatch, increment, decrement }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': return { count: state.count + 1 }
    case 'MINUS': return { count: state.count - 1 }
    case 'RESET': return { count: action.payload }
    default: throw new Error(`Unsupported action type: ${action.type}`)
  }
}

function CountProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = React.useMemo(() => [state, dispatch], [state])
  return <CountContext.Provider value={value} {...props} />
}

export { CountProvider, useCount }
