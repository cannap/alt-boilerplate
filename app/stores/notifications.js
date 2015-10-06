import _ from 'lodash';

class NotificationsStore {

  constructor() {
    this.bindActions(this.alt.getActions('notifications'));
    this.notifications = [];
  }

  onAddNotification({title, message}) {
    const n = {
      title: title,
      message: message,
      uid: _.uniqueId('notification-')
    };
    return this.setState({notifications: this.notifications.concat([n])});
  }

  onRemoveNotification(notification) {
    this.setState({notification: _.remove(this.notifications, (n) => {
      return n.uid === notification.uid;
    })});
  }

}

export default NotificationsStore;
