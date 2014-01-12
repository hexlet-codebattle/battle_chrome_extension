module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    curl: {
      long:{
        src: "https://raw2.github.com/extend/bullet/master/priv/bullet.js",
        dest: "app/lib/bullet.js"
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
