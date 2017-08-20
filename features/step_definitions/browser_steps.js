var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {
  Given('I am on the Cucumber.js GitHub repository', function() {
    
    var page = new HomePage(this.driver)

    return page.go() 
  });

  When('I click on {string}', function (text) {
    var page = new HomePage(this.driver)
    
    return page.click(text)

  });

  Then('I should see {string}', function (text) {
    var xpath = "//*[contains(text(),'" + text + "')]";

    let page = new DetailPage(this.driver)
    return page.waitAndLocate({xpath: xpath}, 5000)

  });
});
