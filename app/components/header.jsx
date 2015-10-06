import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';
import Spinner from 'react-spinkit';

class Header extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired,
    locales: PropTypes.array.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  router = this.props.flux.getStore('router').getState().router;

  state = {
    spinner: false
  }

  componentDidMount() {
    this.props.flux
    .getStore('requests')
    .listen(this._handleRequestStoreChange);
  }

  _handleRequestStoreChange = ({inProgress}) => {
    return this.setState({spinner: inProgress});
  }

  render() {
    let navigation = <div></div>;
    let spinner = <div></div>;
    if (this.state.spinner) {
      spinner = <Spinner spinnerName='double-bounce'/>;
    }

    return (
      <header>
        <section className='header'>

          {/* React Logo in header */}
          <Link to='/' className='header__logo' />

          {/* Spinner in the top right corner */}
          {spinner}
        </section>

        {navigation}
      </header>
    );
  }
}

export default Header;
