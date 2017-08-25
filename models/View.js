let {until, By} = require('selenium-webdriver')

class View {

  constructor(driver) {

    this.driver = driver

  }

  /* getter methodd */
  get by() { return By }

  get elements() { return { } }

  /* check if the page is the current page
   * TO BE OVERRIDED
   *
   * @method exist 
   *
   * @return {object} a promise
   */

  exist() {
  
    return this.waitAndLocate('id', 5 * 1000)
  
  }

  /*
   * click an element
   *
   * @method click
   *
   * @params {string / object} can be the elementId defined in elements getter method or a selector. if no element is mapped, the method will treat it as a selector 
   *
   * @return {obj} a promise 
   */

  click(elementId) {

    let element = this.elements[elementId]
 
    element = element ? element : elementId

    return this.driver.findElement(element).then(function(element) {

      return element.click();

    });
  
  }

  /*
   * click an element
   *
   * @method waitAndLocate 
   *
   * @params {string / object} can be the elementId defined in elements getter method or a selector. if no element is mapped, the method will treat it as a selector 
   *
   * @return {obj} a promise 
   */


  waitAndLocate(elementId, timeout = 5000) {

    let element = this.elements[elementId]

    element = element ? element : elementId

    var condition = until.elementLocated(element);

    return this.driver.wait(condition, timeout); 

  }

  waitForAlert(text, timeout = 5000) {

    var condition = until.alertIsPresent();

    return this.driver.wait(condition, timeout)
      .then( () => {
      
        let alertBox = driver.switchTo().alert()
        alertText = alertBox.getText();

      })

  }

  waitAndFill(elementId, value, timeout = 5000) {

    return this.waitAndLocate(elementId, timeout).sendKeys(value)
  
  } 

  snapShot(filename) {

    return this.driver.takeScreenshot()
      .then(function(image) {
        require('fs').writeFile(`${filename}.png`, image, 'base64', function(err) {
          if (err) { console.log(err); }
        });
      }); 
 
  }

}

module.exports = View 
