let {until, By} = require('selenium-webdriver')

class Page {

  constructor(driver) {

    this.driver = driver

  }

  get by() {
  
    return By
  
  }

  get elements() {
  
    return { } 

  }

  get url() {
  
    return ''
  
  }

  go () {
  
    return this.driver.get(this.url)

  }

  click(elementId) {

    let element = this.elements[elementId]
 
    element = element ? element : elementId

    return this.driver.findElement(element).then(function(element) {

      return element.click();

    });
  
  }

  waitAndLocate(elementId, timeout = 5000) {

    let element = this.elements[elementId]

    element = element ? element : elementId

    var condition = until.elementLocated(element);
    return this.driver.wait(condition, timeout); 

  }

}

module.exports = Page
