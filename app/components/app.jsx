import React, {Component, PropTypes} from 'react/addons';
import Notification from 'components/shared/notification';
import Header from 'components/header';
import {RouteHandler} from 'react-router';

if (process.env.BROWSER) {
  require('styles/app.scss');
}

class App extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired,
    children: PropTypes.element
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      i18n: props.flux
        .getStore('locale')
        .getState()
    };
  }

  componentDidMount() {
    this.props.flux
      .getStore('locale')
      .listen(this._handleLocaleChange);

    this.props.flux
      .getStore('page-title')
      .listen(this._handlePageTitleChange);
  }

  componentWillUnmount() {
    this.props.flux
      .getStore('locale')
      .unlisten(this._handleLocaleChange);

    this.props.flux
      .getStore('page-title')
      .unlisten(this._handlePageTitleChange);
  }

  _handleLocaleChange = (i18n) => {
    return this.setState({i18n});
  }

  _handlePageTitleChange({title}) {
    document.title = title;
  }

  // If we have children components sent by `react-router`
  // we need to clone them and add them the correct
  // locale and messages sent from the Locale Store
  renderChild = (child) => {
    return React.addons
      .cloneWithProps(child, {...this.state.i18n});
  }

  render() {
    return (
      <div>
        <Notification flux={this.props.flux} {...this.state.i18n} />
        <Header
          {...this.state.i18n}
          flux={this.props.flux} />
        <RouteHandler {...this.state.i18n} flux={this.props.flux}/>
      </div>
    );
  }

}

export default App;
