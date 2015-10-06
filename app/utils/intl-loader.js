import debug from 'debug';

window.ReactIntl = require('react-intl');

const loaders = {
  en(callback, force = false) {
    if (!window.Intl || force) {
      require.ensure([
        'intl',
        'intl/locale-data/jsonp/en.js',
        'data/en'
      ], (require) => {
        require('intl');
        require('intl/locale-data/jsonp/en.js');
        const lang = require('data/en');
        return callback(lang);
      });
    }
    else {
      require.ensure([
        'react-intl/dist/locale-data/en.js',
        'data/en'
      ], (require) => {
        require('react-intl/dist/locale-data/en.js');
        const lang = require('data/en');
        return callback(lang);
      });
    }
  },

  it(callback, force = false) {
    if (!window.Intl || force) {
      require.ensure([
        'intl',
        'intl/locale-data/jsonp/it.js',
        'data/it'
      ], (require) => {
        require('intl');
        require('intl/locale-data/jsonp/it.js');
        const lang = require('data/it');
        return callback(lang);
      });
    }
    else {
      require.ensure([
        'react-intl/dist/locale-data/it.js',
        'data/it'
      ], (require) => {
        require('react-intl/dist/locale-data/it.js');
        const lang = require('data/it');
        return callback(lang);
      });
    }
  }

};

export default (locale, force) => {
  debug('dev')(`loading lang ${locale}`);
  return new Promise((resolve) => loaders[locale](resolve, force));
};
