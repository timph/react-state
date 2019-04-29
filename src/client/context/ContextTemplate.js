import React from 'react';

function bindActionCreator(action, dispatch) {
  return function() {
    return dispatch(action.apply(this, arguments))
  };
}

function bindActionCreators(actions, dispatch) {
  const boundActionCreators = {}
  for (const key in actions) {
    const action = actions[key]
    if (typeof action === 'function') {
      boundActionCreators[key] = bindActionCreator(action, dispatch)
    }
  }
  return boundActionCreators
}

function useContext(Context, contextActions) {
  const context = React.useContext(Context)
  if (!context) {
    console.error('useContext must be used in the same context Provider')
  }
  const [state, dispatch] = context;
  const actions = bindActionCreators(contextActions, dispatch);

  return { state, dispatch, actions }
}

function ContextProvider(Context, props, { initialState = {}, reducer = () => {} }) {
  if (!Context && !Context.Provider) {
    console.error('A valid Context must be used in the same context Provider')
    return null
  }
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = React.useMemo(() => [state, dispatch], [state])
  return <Context.Provider value={value} {...props} />
}

export { ContextProvider, useContext }