let gulp = require('gulp');
let gutil = require('gulp-util');
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let makeWebpackConfig = require('./make-webpack.config');
let path = require('path');
let del = require('del');
let minimist = require('minimist');

// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server']);

// Production build
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', function(callback) {
  // Webpack prodution build configuration
  let prodBuildConfig = makeWebpackConfig({
    outputPath: path.join(__dirname, 'dist')
  });

  // Remove all files from output path
  del([path.join(prodBuildConfig.output.path, '**', '*')]);

  // Copy all files from web to output path
  gulp.src('public/*').pipe(gulp.dest(prodBuildConfig.output.path));

  // run webpack
  webpack(prodBuildConfig, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', function() {
  let knownOptions = {
    string: ['hot', 'port', 'host'],
    default: { hot: 'react-hot', host: '0.0.0.0', port: '8080' }
  };

  let options = minimist(process.argv.slice(2), knownOptions);

  // Webpack development server configuration
  let devServerConfig = makeWebpackConfig({
    devServer: true,
    hotComponents: options.hot,
    devPort: options.port,
    devHost: options.host,
    outputPath: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  });

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(devServerConfig), {
    publicPath: '/' + devServerConfig.output.publicPath,
    hot: true,
    stats: {
      colors: true
    }
  }).listen(options.port, options.host, function(err) {
    if (err) {
      console.log(err);
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    // gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    gutil.log('[webpack-dev-server]', 'http://' + options.host + ':' + options.port + '/index.html');
  });
});
