const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  if (action.type === 'USER_LOGIN') return action.value;
  return state;
};

export default user;
