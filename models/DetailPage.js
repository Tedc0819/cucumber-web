let Page = require('./Page.js')

class DetailPage extends Page {

  get elements() {

    return {
       
      CLI: this.by.linkText('CLI')

    }
  
  }

  get url() {
  
    return 'https://github.com/cucumber/cucumber-js/tree/master'
    return 'https://www.gumtree.com.au/job-app/' 
  
  }

}

module.exports = DetailPage 
