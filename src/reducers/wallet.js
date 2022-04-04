import {
  ADD_CURRENCY_KEYS,
  ADD_EXPENSE,
  RESPONSE_QUOTE_CURRENCY_SUCCESS } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  if (action.type === ADD_CURRENCY_KEYS) {
    return { ...state, currencies: action.value };
  }
  if (action.type === ADD_EXPENSE) {
    return { ...state, expenses: [...state.expenses, action.value] };
  }
  if (action.type === RESPONSE_QUOTE_CURRENCY_SUCCESS) {
    return { ...state, expenses: [...state.expenses, action.value] };
  }
  return state;
};

export default wallet;
