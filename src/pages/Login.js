import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import login from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.setState({
          buttonDisabled: !(this.isValidEmail() && this.isValidPassword()),
        });
      },
    );
  };

  isValidEmail = () => {
    const rgx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const { email } = this.state;
    return email.match(rgx);
  };

  isValidPassword = () => {
    const { password } = this.state;
    const MIN_CHAR_ALLOWED = 6;
    return password.length >= MIN_CHAR_ALLOWED;
  };

  render() {
    const { email, password, buttonDisabled } = this.state;
    const { login } = this.props;
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="E-mail"
          onChange={ this.handleInputChange }
          name="email"
          value={ email }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          onChange={ this.handleInputChange }
          name="password"
          value={ password }
        />
        <Link to="/carteira" onClick={ () => login({ email }) }>
          <button type="button" disabled={ buttonDisabled }>
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(login(e)),
});

export default connect(null, mapDispatchToProps)(Login);
