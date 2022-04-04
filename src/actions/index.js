import {
  USER_LOGIN,
  ADD_CURRENCY_KEYS,
  ADD_EXPENSE,
  RESPONSE_QUOTE_CURRENCY_FAILUTE,
  REQUEST_QUOTE_CURRENCY,
  RESPONSE_QUOTE_CURRENCY_SUCCESS,
} from './actionTypes';
import getQuoteCurrencyFromAPI from '../services/currencyAPI';

export const loginAction = (value) => ({ type: USER_LOGIN, value });
export const addCurrencyKeysAction = (value) => ({
  type: ADD_CURRENCY_KEYS,
  value,
});
export const addExpenseAction = (value) => ({
  type: ADD_EXPENSE,
  value,
});

export const requestQuoteCurrency = () => ({
  type: REQUEST_QUOTE_CURRENCY,
});

export const responseQuoteCurrency = (data, expense) => ({
  type: RESPONSE_QUOTE_CURRENCY_SUCCESS,
  value: { ...expense, exchangeRates: data },
});

export const responseQuoteCurrencyFailure = (error) => ({
  type: RESPONSE_QUOTE_CURRENCY_FAILUTE,
  error,
});

export function addExpenseAndAPICurrency(expense) {
  return async (dispatch) => {
    dispatch(requestQuoteCurrency);
    try {
      const data = await getQuoteCurrencyFromAPI();
      dispatch(responseQuoteCurrency(data, expense));
    } catch (error) {
      dispatch(responseQuoteCurrencyFailure(error));
    }
  };
}

// export function fetchQuoteCurrency(expense) {
//   return async (dispatch) => {
//     dispatch(requestQuoteCurrency);
//     try {
//       const data = await getQuoteCurrencyFromAPI();
//       dispatch(responseQuoteCurrency(data, expense));
//     } catch (error) {
//       dispatch(responseQuoteCurrencyFailure(error));
//     }
//   };
// }
