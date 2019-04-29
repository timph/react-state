import React from 'react'

const initialState = { todos: [] }
const actions = {
  add: (val) => ({ type: 'ADD', payload: val }),
  delete: (id) => ({ type: 'DELETE', payload: id }),
  update: (id, val) => ({ type: 'UPDATE', payload: { id, val } }),
  query: (id) => ({ type: 'QUERY', payload: id }),
}
const reducer = () => {}