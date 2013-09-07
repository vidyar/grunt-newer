var assert = require('assert');
var path = require('path');
var fs = require('fs');


/**
 * @param {Object} grunt Grunt.
 */
module.exports = function(grunt) {

  var gruntfileSrc = 'gruntfile.js';
  var tasksSrc = 'tasks/**/*.js';
  var testSrc = 'test/**/*.spec.js';

  grunt.initConfig({

    cafemocha: {
      options: {
        reporter: 'spec'
      },
      all: {
        src: testSrc
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: gruntfileSrc
      },
      tasks: {
        src: tasksSrc
      },
      fixtures: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: testSrc
      }
    },

    watch: {
      tasks: {
        files: tasksSrc,
        tasks: ['cafemocha']
      },
      tests: {
        files: testSrc,
        tasks: ['newer:cafemocha']
      },
      fixtures: {
        files: 'test/fixtures/**/*',
        tasks: ['cafemocha']
      },
      all: {
        files: [gruntfileSrc, tasksSrc, testSrc],
        tasks: ['newer:jshint']
      }
    }

  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-cafe-mocha');

  grunt.registerTask('test', ['newer:jshint', 'cafemocha']);

  grunt.registerTask('default', 'test');

};
