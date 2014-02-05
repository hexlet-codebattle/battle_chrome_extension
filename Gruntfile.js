module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-available-tasks');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-react');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    availabletasks: {
      tasks: {}
    },
    'curl-dir': {
      javascript: {
        src: [
          "https://raw2.github.com/extend/bullet/master/priv/bullet.js",
          "http://fb.me/react-0.8.0.min.js"
        ],
        dest: "app/lib"
      },
      bootstrap: {
        src:"http://bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css",
        dest: "app/stylesheets"
      }
    },
    compress: {
      app: {
        options: {
          archive: 'dist/app.zip'
        },
        files: [
          {expand: true, src: ['app/**/*']}
        ]
      }
    },
    copy: {
      lodash: {
        src: "node_modules/lodash/dist/lodash.min.js",
        dest: "app/lib/lodash.min.js"
      },
      jquery: {
        src: "node_modules/jquery/dist/jquery.min.js",
        dest: "app/lib/jquery.min.js"
      }
    },
    react: {
      compile: {
        files: [{
          expand: true,
          cwd: 'app/scripts/src',
          src: ['**/*.js'],
          dest: 'app/scripts/build',
          ext: '.js'
        }]
      }
    }
  });
};
