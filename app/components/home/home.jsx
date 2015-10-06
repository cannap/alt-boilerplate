import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';

class Home extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  router = this.props.flux.getStore('router').getState().router;

  _t = IntlMixin.getIntlMessage


  componentWillMount() {
    this.props.flux.getActions('page-title').set(this._t('home.page-title'));
  }

  render() {
    return (
      <div className='content'>
        Home
      </div>
    );
  }

}

export default Home;
