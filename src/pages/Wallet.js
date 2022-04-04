import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addCurrencyKeysAction,
  // addExpenseAction,
  addExpenseAndAPICurrency,
} from '../actions';

class Wallet extends React.Component {
  INITIAL_STATE_DETAILS = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      details: this.INITIAL_STATE_DETAILS,
      // value: 0,
      // description: '',
      // currency: 'USD',
      // method: 'Dinheiro',
      // tag: 'Alimentação',
      // exchangeRates: {},
      total: 0,
    };
  }

  async componentDidMount() {
    // const { addExpenseAndAPIDataTest } = this.props;

    // const test = await addExpenseAndAPIDataTest();
    // console.log(test);
    const { addCurrencyKeys } = this.props;
    const currencyKeys = await this.getCurrencyKeysFromAPI();
    addCurrencyKeys(currencyKeys);
  }

  handleExpenseTotal = () => {
    const { wallet } = this.props;
    const total = wallet.expenses.reduce(
      (acc, currentValue) => acc + (
        Number(currentValue.value)
        * Number(currentValue.exchangeRates[currentValue.currency].ask)
      ),
      0,
    );
    this.setState({ total: total.toFixed(2) });
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    // const expensesDetails = { ...this.state.expensesDetails };
    // expensesDetails[name] = value;
    // this.setState({ expensesDetails });
    this.setState((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value,
      },
    }));
  };

  handleClick = async () => {
    const { wallet, addExpense } = this.props;
    const { details } = this.state;
    // await addExpense({ id: wallet.expenses.length + 1, ...details });
    await addExpense({ id: wallet.expenses.length, ...details });
    this.handleExpenseTotal();
    this.setState({
      details: this.INITIAL_STATE_DETAILS,
    });
  };

  getCurrencyKeysFromAPI = async () => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(endpoint);
    const data = await request.json();
    const currencyKeys = Object.keys(data).filter((item) => item !== 'USDT');
    return currencyKeys;
  };

  render() {
    const { user, wallet } = this.props;
    const {
      details: { value, description, currency, method, tag }, total,
    } = this.state;
    return (
      <>
        <header>
          <span data-testid="email-field">
            Email:
            {user.email}
          </span>
          Valor total da despesa:
          <span data-testid="total-field">
            {total}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <div>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              onChange={ this.handleInputChange }
              data-testid="value-input"
              value={ value }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              onChange={ this.handleInputChange }
              value={ description }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              onChange={ this.handleInputChange }
              data-testid="currency-input"
              id="currency"
              value={ currency }
            >
              {wallet.currencies.map((item, index) => (
                <option value={ item } key={ index }>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Metodo de pagamento:
            <select
              name="method"
              data-testid="method-input"
              onChange={ this.handleInputChange }
              value={ method }
              id="method"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tipo Despesa:
            <select
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleInputChange }
              value={ tag }
              id="tag"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </div>
        <div>
          <button type="button" onClick={ this.handleClick }>
            Adicionar despesa
          </button>
        </div>

        <div>
          <table>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            <tr>
              <td />
            </tr>
          </table>
        </div>
      </>
    );
  }
}
Wallet.propTypes = {
  user: PropTypes.objectOf,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrencyKeys: (currencyKeys) => dispatch(addCurrencyKeysAction(currencyKeys)),
  // addExpense: (expenseDetails) => dispatch(addExpenseAction(expenseDetails)),
  addExpense: (expenseDetails) => dispatch(addExpenseAndAPICurrency(expenseDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
