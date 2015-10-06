class RouterStore {

  constructor() {
    this.bindActions(this.alt.getActions('router'));
    this.bindActions(this.alt.getActions('session'));
    this.router = null;
  }

  onSet(router) {
    return this.setState({router: router});
  }

  onLoginSuccess() {
    this.waitFor(this.alt.getStore('session'));
    this.router.transitionTo(sessionStorage.getItem('transition') || '/');
  }

  onLogout() {
    this.waitFor(this.alt.getStore('session'));
    this.router.transitionTo('login');
  }
}

export default RouterStore;
