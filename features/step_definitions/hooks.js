var {defineSupportCode } = require('cucumber');

defineSupportCode(function({Before, After, setWorldConstructor, setDefaultTimeout}) {

  setDefaultTimeout(40 *1000)

  Before(function() {
  
    return app.initDriver()
    
  })

  After(function() {

    return this.driver.quit();

  });
  
  setWorldConstructor(function() {
  
    this.driver = app.driver

  })

});

