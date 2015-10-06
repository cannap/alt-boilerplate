const env = process.env.NODE_ENV || 'development';
const config = {
  development: require('./development'),
  production: require('./production')
};

module.exports = config[env];
