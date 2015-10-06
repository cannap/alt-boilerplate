import objectAssign from 'react/lib/Object.assign';
import baseConfig from './all.js';

// let config = require('webpack-config-loader!../../config/config.js');
let config = require('../../config/config');

export default objectAssign(baseConfig, config);
