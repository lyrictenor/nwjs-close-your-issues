'use strict';

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      options: webpackDistConfig,

      dist: {
        cache: false
      }
    },

    'webpack-dev-server': {
      options: {
        hot: true,
        port: 8000,
        webpack: webpackDevConfig,
        publicPath: '/assets/',
        contentBase: './<%= pkg.src %>/',
      },

      start: {
        keepAlive: true,
      }
    },

    connect: {
      options: {
        port: 8003
      },

      dist: {
        options: {
          keepalive: true,
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },

    open: {
      options: {
        delay: 500
      },
      dev: {
        path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
      },
      dist: {
        path: 'http://localhost:<%= connect.options.port %>/'
      }
    },

    copy: {
      dev: {
        files: [
          {
            flatten: true,
            expand: true,
            src: ['node_modules/lovefield/dist/lovefield.min.js'],
            dest: '<%= pkg.src %>/assets/vendor/'
          }
        ]
      },
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/*'],
            dest: '<%= pkg.dist %>/',
            filter: 'isFile'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/assets/images/*'],
            dest: '<%= pkg.dist %>/assets/images/'
          },
          {
            flatten: true,
            expand: true,
            src: ['node_modules/lovefield/dist/lovefield.min.js'],
            dest: '<%= pkg.dist %>/assets/vendor/'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/assets/js/*'],
            dest: '<%= pkg.dist %>/assets/js/'
          }
        ]
      }
    },

    clean: {
      dev: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.src %>/assets/vendor'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>'
          ]
        }]
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist']);
    }

    grunt.task.run([
      'clean:dev', 'copy:dev', 'webpack-dev-server'
    ]);
  });

  grunt.registerTask('test', []);

  grunt.registerTask('build', ['clean:dist', 'copy:dist', 'webpack']);

  grunt.registerTask('default', []);
};
