import React from 'react';
import Router from 'react-router';

// Paths are relative to `app` directory
import Flux from 'utils/flux';

(async () => {
  // Init alt instance
  const flux = new Flux();

  // Get request locale for rendering
  const Cookies = require('cookies-js');
  const locale = Cookies.get('_lang') || 'en';
  const {messages} = require(`data/${locale}`);

  // Populate store with locale
  flux
  .getActions('locale')
  .switchLocaleSuccess({locale, messages});

  // routes.jsx imports components using the `window.Intl`
  // it should be defined before
  const routerProps = {
    routes: require('routes'),
    location: null,
    createElement: (component, props) => {
      // Take locale and messages from `locale` store
      // and pass them to every components rendered from `Router`
      const i18n = flux.getStore('locale').getState();
      return React.createElement(
        component,
        Object.assign(props, {flux, ...i18n})
      );
    }
  };

  const router = Router.create({...routerProps});

  flux
  .getActions('router')
  .set(router);

  router.run((Handler) => {
    React.render(
      routerProps.createElement(Handler, {...routerProps}),
      document.getElementById('content')
    );
  });
})();
