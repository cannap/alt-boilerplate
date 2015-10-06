import React, {Component, PropTypes} from 'react';

export default function requireAuth(ChildComponent) {
  class Authenticated extends Component {

    static propTypes = {
      flux: PropTypes.object.isRequired
    }

    static willTransitionTo(transition) {
      const isAuthenticated = (sessionStorage.getItem('access_token') || localStorage.getItem('access_token')) !== null;
      if (!isAuthenticated) {
        sessionStorage.setItem('transition', transition.path);
        return transition.redirect('login', {}, {});
      }
    }

    render() {
      return <ChildComponent {...this.props} {...this.state} />;
    }
  }

  return Authenticated;
}
