import * as path from 'path';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.base';
import appConfigs from './libs/pages';

// const pkgConfig = require('../package.json');
const defaultAppName = process.env.npm_package_bffConfig_defaultAppName;
// 生成 webpackDevServer rewrites 规则
console.log(appConfigs);
const reWrites = appConfigs.map(app => ({
  from: new RegExp(`^\/${app.name}(\/)?.*`),
  to: `/${app.name}/index.html`,
}));

export default merge(baseConfig, {
  mode: 'development',
  plugins: [

  ],
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: {
      rewrites: [
        ...reWrites,
        { from: new RegExp(`^\/`), to: `/${defaultAppName}/index.html` },
      ]
    },
    contentBase: path.resolve(__dirname, '../app/public'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      '/api': 'http://127.0.0.1:8080',
    }
  }
});
