import { Controller } from 'egg';
import * as fs from 'fs';
import * as path from 'path';
import appConfigs from '../../build/libs/pages'
import { getAppNames } from '../../build/libs/util';


export default class HomeController extends Controller {
  public async index() {
    // ctx.body = await ctx.service.test.sayHi('egg');
    await this.render({});
  }

  public async render(pData?, htmlPath?) {
    const appNames = getAppNames(appConfigs);
    console.log('---pData=', pData);
    console.log('appNames', appNames)
  
    let tplFile;
    let appName = this.ctx.request.path.split('/')[1];
    console.log('appName appName', appName)
    if(!appNames.includes(appName)){
      appName = this.config.defaultAppName;
    }

    if (htmlPath === undefined) {
      tplFile = `${appName}/index.html`;
      console.log(this.config.view.root[0]);
      const tplFilePath = path.join(this.config.view.root[0] || '', tplFile);
      console.debug('tplFilePath=', this.config.view.root);
      console.debug('tplFilePath=', tplFilePath);
      if (!fs.existsSync(tplFilePath)) {
        console.log('!fs.existsSync(tplFilePath)');
        // this.ctx.redirect("/");
        return;
      }
    } else {
      tplFile = htmlPath;
    }
    console.log(`render ${tplFile}`);
    await this.ctx.render(tplFile, {});
  }
}
