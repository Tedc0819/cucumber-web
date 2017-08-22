let {until, By} = require('selenium-webdriver')

class Page {

  constructor(driver) {

    this.driver = driver

  }

  /* getter methodd */
  get by() { return By }

  get elements() { return { } }

  get url() { return '' }

  /* check if the page is the current page
   * TO BE OVERRIDED
   *
   * @method isCurrentPage
   *
   * @return {object} a promise
   */

  isCurrentPage() {
  
  
  }


  /*
   * go to this page
   *
   * @return {obj} a promise 
   */

  go () {
  
    return this.driver.get(this.url)

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

}

module.exports = Page
