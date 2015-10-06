import React, {Component, PropTypes} from 'react';
import {IntlMixin} from 'react-intl';
import NotificationSystem from 'react-notification-system';
import _ from 'lodash';

class Notification extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  state = {
    defaultNotification: {
      title: null,
      message: null,
      level: 'info',
      position: 'tr',
      autoDismiss: 5,
      dismissible: true,
      action: null,
      actionState: false
    },
    allowHTML: false
  };

  componentWillMount() {
    this.props.flux.
      getStore('notifications').listen(this.onChange);
  }

  componentWillUnmount() {
    this.props.flux.
      getStore('notifications').unlisten(this.onChange);
  }

  onChange = ({notifications}) => {
    notifications.forEach((n) => {
      n = _.merge(this.state.defaultNotification, n);
      n.onRemove = this.removeNotification;
      this.refs.notificationSystem.addNotification(n);
    });
  }

  _t = IntlMixin.getIntlMessage

  removeNotification = (n) => {
    this.props.flux.getActions('notifications').removeNotification(n);
  }

  render() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" allowHTML={this.state.allowHTML} />
      </div>
    );
  }

}

export default Notification;
