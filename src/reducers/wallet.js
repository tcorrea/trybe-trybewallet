const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  if (action.type === 'ADD_CURRENCY_KEYS') {
    return { ...state, currencies: action.value };
  }
  return state;
};

export default wallet;
