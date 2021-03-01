const pkg = require("../../package.json");

// 获取项目名字
export const getAppNames = (appConfigs: Array<any>) => {
  console.log('build util appconfigs');
  return appConfigs.map(app => {
    return app.name;
  });
}

// 获取路径，考虑到线上环境是cdn的情况下
export const getPublicPath = () => {
  const cdnHosts = (pkg.bffConfig && pkg.bffConfig.cdnHosts) ? pkg.bffConfig.cdnHosts : ['/'];
  switch (process.env.NODE_CONFIG_ENV) {
    case 'prod':
      return `${cdnHosts[0]}/`;
    default:
      return '/';
  }
};

// 获取webpack入口文件
export const getEntry = (appConfigs: Array<any>) => {
  const entry = {};
  appConfigs.forEach(app => {
    entry[app.name] = app.entryFile;
  });
  return entry;
}
