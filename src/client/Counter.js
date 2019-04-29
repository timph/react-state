import React from 'react';
import { CountProvider, useCount } from './context/count'

function CountButton() {
  const { state, actions } = useCount();
  const { increment, decrement, addBy, reset } = actions;
  const addByFive = () => addBy(5);

  return <div>
    <button onClick={increment}>Add to {state.count}</button>
    <button onClick={decrement}>Minus from {state.count}</button>
    <button onClick={addByFive}>Add By 5 </button>
    <button onClick={reset}>Reset</button>
  </div>;
}

export function CounterDisplay() {
  const { state } = useCount();
  return <div>Current count is {state.count}</div>;
}

export default function Counter() {
  return <CountProvider>
    <CounterDisplay />
    <CountButton />
  </CountProvider>;
}
