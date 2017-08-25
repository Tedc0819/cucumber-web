let fs = require('fs');
let deepExtend = require('deep-extend');
let Promise = require('bluebird')
var colors = require('colors');
var seleniumWebdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');

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

  }

  exportToContext(context) {
    
    context.app = this

    Object.keys(this.models).forEach( (key) => {
    
      context[key] = this.models[key]
    
    })
  
  }

  initDriver() {

    let server = this.config.server
    let client = this.config.client[this.config.testClient]
    
    let opts;

    if (client.browser == 'chrome') { opts = new chrome.Options(); }

    if (client.browser == 'firefox') { opts = new firefox.Options(); }

    if (client.optsArguments) { opts.addArguments(client.optsArguments) }

    let driver = new seleniumWebdriver.Builder()
        .withCapabilities(opts.toCapabilities())
        .usingServer(`http://${server.host}:${server.port}/wd/hub`)
        .build()

    this.driver = driver

    return this.driver
  
  }

  quitDriver() {
  
    return this.driver.quit();

  }

}

module.exports = App

