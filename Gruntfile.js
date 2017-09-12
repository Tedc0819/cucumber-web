'use strict';

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'local'
let client = process.env.TEST_CLIENT? process.env.TEST_CLIENT : 'chrome'

module.exports = function(grunt) {

  grunt.initConfig({

    cucumberjs: {

      default: {

        options: {
          format: 'html',
          output: `./reports/${env}/${client}.html`,
          theme: 'bootstrap',
          debug: true
        }

      }

    }

  })

  grunt.loadNpmTasks('grunt-cucumberjs')

  grunt.registerTask('test', ['cucumberjs'])


}
