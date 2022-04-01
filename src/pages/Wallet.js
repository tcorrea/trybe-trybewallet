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
    const { user } = this.props;
    return (
      <header>
        <span data-testid="email-field">{user.email}</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}
Wallet.propTypes = {
  user: PropTypes.objectOf,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrencyKeys: (currencyKeys) => dispatch(addCurrencyKeysAction(currencyKeys)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
