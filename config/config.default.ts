import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610705977257_2763';

  config.defaultAppName = (appInfo.pkg.bffConfig && appInfo.pkg.bffConfig.defaultAppName) || 'index';

  // add your egg config in here
  config.middleware = [];

  config.view = {
    root: path.join(appInfo.baseDir, 'app/public'),
    defaultViewEngine: 'nunjucks',
    // mapping: {
    //   '.html': 'static',
    // },
  }

  // add your special config in here
  const bizConfig = {
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
