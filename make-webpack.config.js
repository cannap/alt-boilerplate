let webpack = require('webpack');
let path = require('path');
let SplitByPathPlugin = require('webpack-split-by-path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(options) {
  let devPort = options.devPort ? options.devPort : 8080;
  let devHost = options.devHost ? options.devHost : 'localhost';

  let entry = {
    app: [ './app/index.js' ]
  };

  let output = {
    path: options.outputPath ? options.outputPath : path.join(__dirname, 'dist'),
    publicPath: options.publicPath ? options.publicPath : '',
    filename: options.devServer ? '[name].js' : '[name]-[chunkhash].js',
    chunkFilename: options.devServer ? '[name].js' : '[name]-[chunkhash].js'
  };

  let plugins = [
    new SplitByPathPlugin([
      {
        name: 'vendor',
        path: path.join(__dirname, 'node_modules/')
      }
    ]),
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': options.devServer ? JSON.stringify('development') : JSON.stringify('production')
      }
    })
  ];

  let loaders = [
    {
      test: /\.jsx?$/,
      include: path.resolve(__dirname, 'app'),
      exclude: [/node_modules/, /bower_components/],
      loaders: (options.hotComponents === 'react-hot') ? ['react-hot', 'babel'] : ['babel']
    },
    {test: /\.json$/, exclude: /node_modules/, loader: 'json'},
    { test: /\.css$/, loader: 'style!css-loader!autoprefixer-loader' },
    { test: /\.scss$/, loader: 'style!css-loader!autoprefixer-loader!sass?' },
    { test: /[\\\/]bower_components[\\\/]modernizr[\\\/]modernizr\.js$/,
      loader: 'imports?this=>window,html5=>window.html5!exports?window.Modernizr' },
    { test: /\.woff$/, loader: 'file-loader' },
    { test: /\.ttf$/, loader: 'file-loader' },
    { test: /\.eot$/, loader: 'file-loader' },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }
  ];

  if (options.devServer) {
    plugins.unshift(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      })
    );
    plugins.unshift(new webpack.HotModuleReplacementPlugin());
  }
  else {
    plugins.push(
      new HtmlWebpackPlugin({
        title: 'Alt Boilerplate',
        template: path.join(__dirname, 'public', 'index.html'),
        inject: 'body'
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );
  }

  if (options.hotComponents === 'react-hot') {
    entry.app.unshift('webpack/hot/only-dev-server');
    entry.app.unshift('webpack-dev-server/client?http://' + devHost + ':' + devPort);
  }
  else if (options.hotComponents) {
    entry.app.unshift('webpack/hot/dev-server');
    entry.app.unshift('webpack-dev-server/client?http://' + devHost + ':' + devPort);
  }

  return {
    context: __dirname,
    entry: entry,
    output: output,
    devtool: options.devServer ? 'eval' : '',
    debug: options.devServer ? true : false,
    loader: {
      configEnvironment: options.devServer ? 'development' : 'production'
    },
    plugins: plugins,
    module: {
      preLoaders: [
        {
          test: /\.css$/,
          exclude: [/node_modules/, /bower_components/],
          loader: 'csslint'
        },
        {
          test: /\.jsx?$/,
          exclude: [/node_modules/, /bower_components/, /app\/libs/],
          loader: 'eslint-loader'
        }
      ],
      loaders: loaders,
      noParse: [/react-input-autosize.min.js/, /\.example$/]
    },
    resolve: {
      extensions: ['', '.js', '.json', '.scss', '.jsx', '.es6', '.babel'],
      modulesDirectories: ['bower_components', 'node_modules', 'app']
    }
  };
};
