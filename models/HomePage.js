let Page = require('./Page.js')

class HomePage extends Page {

  get elements() {

    return {
       
      CLI: this.by.linkText('CLI')

    }
  
  }

  get url() {
  
    return 'https://github.com/cucumber/cucumber-js/tree/master'
  
  }

}

module.exports = HomePage
