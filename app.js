let fs = require('fs');
let deepExtend = require('deep-extend');
let Promise = require('bluebird')
var colors = require('colors');
var seleniumWebdriver = require('selenium-webdriver');

class App {

  constructor() {

  }

  importDir(dirPath) {

    let obj = {}

    fs.readdirSync(dirPath + '/').forEach( (file) => {

      if (file.match(/\.js$/) !== null && file !== 'index.js') {

        let name = file.replace('.js', '');
        obj[name] = require(`${dirPath}/` + file);
      
      } 

    })

    return obj
 
  }

  loadConfig() {

    let configFile = this.importDir('./config'); 

    let envConfig = {};
    if (process.env.NODE_ENV) { envConfig = require(`./config/env/${process.env.NODE_ENV}.js`); }

    this.config = deepExtend({}, configFile, envConfig); 

  }

  loadPage() {

    this.models = this.importDir('./models')
  
  }

  prepare() {
  
    this.loadConfig()
    this.loadPage()
    this.setupDriver()

  }

  exportToContext(context) {
    
    context.app = this

    Object.keys(this.models).forEach( (key) => {
    
      context[key] = this.models[key]
    
    })
  
  }

  setupDriver() {

  let server = this.config.server
  let client = this.config.client[this.config.testClient]

    let driver = new seleniumWebdriver.Builder()
        .forBrowser(client.browser)
        .usingServer(`http://${server.host}:${server.port}/wd/hub`)
        .build()

//  driver.on('status', function (info) {
//    console.log(info.cyan);
//  });
//  driver.on('command', function (meth, path, data) {
//    console.log(' > ' + meth.yellow, path.grey, data || '');
//  });
//  driver.on('http', function (meth, path, data) {
//    console.log(' > ' + meth.magenta, path, (data || '').grey);
//  });

    this.driver = driver

  }

  initDriver() {

    return this.driver
  
  }

  quitDriver() {
  
    return this.driver.quit();

  }

}

module.exports = App

