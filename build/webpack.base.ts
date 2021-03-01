import * as path from 'path';
import * as webpack from 'webpack';

import appConfigs from './libs/pages';
import { getEntry, getPublicPath } from './libs/util';

console.log('webpack base appConfigs', getEntry(appConfigs));

const config: webpack.Configuration = {
  mode: 'production',
  entry: getEntry(appConfigs),
  output: {
    path: path.resolve(__dirname, '../app/public'),
    publicPath: getPublicPath(),
    filename: "[name]/[chunkhash:8].bundle.js",
    chunkFilename: "[name]/[chunkhash:8].chunk.js"
  }
};

export default config;
