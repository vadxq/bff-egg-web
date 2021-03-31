import * as path from 'path';
import * as webpack from 'webpack';
import { DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import processEnvPlugin from './libs/env'
import appConfigs from './libs/pages';
import { getEntry, getPublicPath } from './libs/util';

const config: webpack.Configuration = {
  mode: 'production',
  entry: getEntry(appConfigs),
  output: {
    path: path.resolve(__dirname, '../app/public'),
    publicPath: getPublicPath(),
    filename: '[name]/[chunkhash:8].bundle.js',
    chunkFilename: '[name]/[chunkhash:8].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      // LESS & CSS
      {
        test: /\.css|\.less$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: require.resolve('postcss-loader'),
          },
          {
            loader: 'less-loader',
          }
        ]
      },
    ]
  },
  plugins: [
    ...appConfigs.map(
      app => new HtmlWebpackPlugin(app.htmlWebpackPlugin)
    ),

    new DefinePlugin({
      'process.env': processEnvPlugin,
    }),

    // LESS to CSS
    new MiniCssExtractPlugin({
      filename: "[name]/[contenthash:8].bundle.css",
      chunkFilename: "[name]/[contenthash:8].chunk.css"
    }),

  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../client/apps")
    },
    extensions: ['.ts', '.tsx'],
  },
  stats: {
    entrypoints: false,
    children: false,
    errorDetails: true
  },
  optimization: {
    runtimeChunk: {
      name: entrypoint => `${entrypoint.name}/manifest`
    },
    splitChunks: {
      chunks: 'all',
    }
  }
};

export default config;
