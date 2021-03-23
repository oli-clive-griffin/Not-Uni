const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    index: {
      import: './client/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './client/styles/index.scss',
      dependOn: 'shared',
    },
    shared: 'lodash',
  },
  output: {
    path: path.join(__dirname, '..', 'server', 'public'),
    filename: 'bundle.js',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        authDomain: JSON.stringify(process.env.authDomain),
        databaseURL: JSON.stringify(process.env.databaseURL),
        projectId: JSON.stringify(process.env.projectId),
        storageBucket: JSON.stringify(process.env.storageBucket),
        messagingSenderId: JSON.stringify(process.env.messagingSenderId),
        appId: JSON.stringify(process.env.appId)
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
}
