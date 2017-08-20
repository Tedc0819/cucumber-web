let App = require('../../app.js')

let app = new App()

app.prepare()
app.exportToContext(global)

module.exports = app

