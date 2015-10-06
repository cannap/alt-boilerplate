import Alt from 'alt';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    ['locale', 'notifications', 'page-title', 'requests', 'router'].map(this.registerCouple);
  }

  registerCouple = ::this.registerCouple
  registerCouple(name) {
    this.addActions(name, require(`actions/${name}`));
    this.addStore(name, require(`stores/${name}`));
  }

  render(handler) {
    return this.render(handler, this);
  }
}

export default Flux;
