import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCurrencyKeysAction } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { addCurrencyKeys } = this.props;
    const currencyKeys = await this.getCurrencyKeysFromAPI();
    addCurrencyKeys(currencyKeys);
  }

  getCurrencyKeysFromAPI = async () => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';

    const request = await fetch(endpoint);
    const data = await request.json();
    const currencyKeys = Object.keys(data).filter((item) => item !== 'USDT');
    return currencyKeys;
  };

  render() {
    const { user, wallet } = this.props;
    return (
      <>
        <header>
          <span data-testid="email-field">{user.email}</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <div>
          <label htmlFor="value">
            Valor:
            <input type="number" name="value" data-testid="value-input" />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select name="currency" data-testid="currency-input" id="currency">
              {wallet.currencies.map((item, index) => (
                <option value={ item } key={ index }>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Metodo de pagamento:
            <select name="method" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tipo Despesa:
            <select name="tag" data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
