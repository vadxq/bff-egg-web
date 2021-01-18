import * as fs from 'fs';
import * as path from 'path';

// spa 应用目录
const CLIENT_DIR = path.resolve(__dirname, '../../client');
const SPA_DIR = path.resolve(CLIENT_DIR, './apps');

console.log('SPA_DIR', SPA_DIR);

// 获取所有子应用，且子应用目录不能重名
const getAppNames = () => {
  const appDir = SPA_DIR;
  if (fs.existsSync(appDir)) {
    return fs
      .readdirSync(appDir)
      .filter(dir => {
      // 如果npm脚本命令传了ONLY参数，则表示只构真实该入口app
        if(process.env.ONLY && dir !== process.env.ONLY){
          return false;
        }
        return fs.lstatSync(path.join(appDir, dir)).isDirectory()
      })
      .map(name => `${name}`);
  }
  return [];
}
const appNames = [
  ...getAppNames(),
];

if (appNames.length !== [...new Set(appNames)].length) {
  console.error('/client/apps 下的子应用目录不能重名');
  process.exit();
}

// meta / name 字段
const genName = name => ({
  meta: name,
  name: name,
});

// dir 字段
const genDir = o => {
  const dir = path.resolve(SPA_DIR, o.name);
  return {
    dir,
    ...o,
  };
};

// entryFile 字段
const genEntryFile = o => {
  // 支持js/jsx/ts/tsx
  const jsPath = path.join(o.dir, 'index.js');
  const jsxPath = path.join(o.dir, 'index.jsx');
  const tsPath = path.join(o.dir, 'index.ts');
  const tsxPath = path.join(o.dir, 'index.tsx');
  const entryFile =
    ((fs.existsSync(tsPath) && tsPath) || (fs.existsSync(tsxPath) && tsxPath) || fs.existsSync(jsPath) && jsPath) || (fs.existsSync(tsPath) && tsPath) || (fs.existsSync(jsxPath) && jsxPath);

  return {
    entryFile,
    ...o,
  };
};

// htmlWebpackPlugin 字段
const genHtmlWebpackPluginConfig = o => ({
  htmlWebpackPlugin: {
    // manifest的引入须与plugins中的runtimeChunk一致;
    chunks: ['polyfills', `${o.name}/manifest`, `vendors`, `${o.name}/vendors`, o.name],
    chunksSortMode: 'manual', // 确保脚本引入的顺序跟chunks里的数据顺序
    filename: `${o.name}/index.html`,
    template: `${o.dir}/index.html`,
    minify: true
  },
  ...o,
});


const appConfigs = appNames
  .map(genName)
  .map(genDir)
  .map(genEntryFile)
  .map(genHtmlWebpackPluginConfig);

console.log('appConfigs', appConfigs);

export default appConfigs;
