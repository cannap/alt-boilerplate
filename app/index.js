// Browser ES6 Polyfill
require('babel/polyfill');

// const React = require('react');
// window.React = React;

process.env.NODE_PATH = 'app';

// Install `babel` hook for ES6
// require('babel/register');

// Load Intl polyfill
require('utils/intl-polyfill')(require('./config/config').locales);

// Start application
require('./main');

// Styles
require('foundation-sites/scss/normalize');
require('./styles/app');
require('modernizr/modernizr');

// /*global $*/
// $(document).foundation();
