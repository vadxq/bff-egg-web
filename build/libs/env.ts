/**
 * 前端env环境变量， 使用config库读取当前环境亦是NODE_ENV对应的{xx}.json配置文件内容
 *
 */
process.env.NODE_CONFIG_ENV = process.env.NODE_ENV || 'local';
process.env.NODE_CONFIG_DIR = './build/env';

const config = require("config");

const processEnvPlugin = {
  "NODE_ENV": JSON.stringify(process.env.NODE_CONFIG_ENV)
};

Object.keys(config).map((k)=>{
  processEnvPlugin[k] = JSON.stringify(config[k]);
});

export default processEnvPlugin
