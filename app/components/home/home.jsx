import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';

class Home extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.flux.getActions('page-title').set(this._t('home.page-title'));
  }

  router = this.props.flux.getStore('router').getState().router;

  _t = IntlMixin.getIntlMessage

  render() {
    return (
      <div className="content">
        Home
      </div>
    );
  }

}

export default Home;
