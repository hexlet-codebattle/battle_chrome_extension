module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-available-tasks');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    availabletasks: {
      tasks: {}
    },
    'curl-dir': {
      long:{
        src: [
          "https://raw2.github.com/extend/bullet/master/priv/bullet.js",
          "http://www.reactjs.com/dl/react-1.0.min.js"
        ],
        dest: "app/lib"
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
    }
  });
};
