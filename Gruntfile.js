module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-available-tasks');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-shell');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    availabletasks: {
      tasks: {}
    },
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
      },
      react: {
        src: "src/react/build/react.min.js",
        dest: "app/lib/react.min.js"
      }
    },
    gitclone: {
      reactjs: {
        options: {
          repository: "https://github.com/facebook/react",
          directory: "src/react"
        }
      }
    },
    shell: {
      build_react: {
        stdout: true,
        command: [
          'cd src/react',
          'npm install',
          'mkdir build',
          'grunt build'
        ].join('&&')
      }
    }
  });
};
