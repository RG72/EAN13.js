module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*\n* Copyright (c) <%= grunt.template.today("yyyy") %> Johannes Mittendorfer (http://johannes-mittendorfer.com)\n* Licensed under the MIT License (LICENSE.txt).\n*\n* Version <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n\n'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    coffeelint: {
      app: ['src/<%= pkg.name %>.coffee'],
      options: {
        'max_line_length': {
          'level': 'ignore'
        },
        'arrow_spacing':{
          'level': 'warn'
        },
        'line_endings':{
          'level': 'warn'
        },
        'no_empty_param_list':{
          'level': 'warn'
        },
        'no_backticks':{
          'level': 'ignore'
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true
      },
      uses_defaults: ['src/**/*.js'],
    },
    qunit: {
      all: ['tests/**/*.html']
    },
    coffee:{
      compile: {
        files: {
          'dist/<%= pkg.name %>.js': 'src/<%= pkg.name %>.coffee'
        },
         options: {
          sourceMap: false,
          bare: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');

  // Default task(s).
  grunt.registerTask('default', ['coffeelint','coffee','jshint','uglify','qunit']);
  grunt.registerTask('test', ['coffeelint','coffee','jshint','uglify','qunit']);

};
