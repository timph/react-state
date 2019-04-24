import React from 'react';
import { CountProvider, useCount } from './context/count'

function CountButton() {
  const { state, dispatch, increment, decrement } = useCount();
  return <div>
    <button onClick={increment}> Add to {state.count}</button>

    <button onClick={decrement}> Minus from {state.count}</button>

    <button
      onClick={() => dispatch({type: 'RESET', payload: 10})}>
      Reset
    </button>
  </div>;
}

function CounterDisplay() {
  const { state } = useCount();
  return <div>Current count is {state.count}</div>;
}

export default function Counter() {
  return <CountProvider>
    <CounterDisplay />
    <CountButton />
  </CountProvider>;
}
