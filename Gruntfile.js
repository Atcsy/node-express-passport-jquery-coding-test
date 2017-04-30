module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      dist: ["dist"]
    },
    copy: {
      dist: {
        files: [
          { expand: true, cwd: 'src/', src: ['**','!**/*.jsx', '!static/scripts/*'], dest: "dist"}
        ]
      }
    },
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [
          { expand: true, src: ['**/*.jsx','**/*.js', '!static/scripts/*.js'], cwd: 'src', dest: "dist", ext: '.js'}
        ]
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/static/scripts/*.js'],
        dest: 'dist/static/scripts/app.js',
      }
    },
    uglify: {
      options: {
        beautify: false,
        report: 'gzip'
      },
      dist: {
        src: 'dist/static/scripts/app.js',
        dest: 'dist/static/scripts/app.min.js'
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/static/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/static/css',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      jsx: {
        files: ['src/**/*.jsx'],
        tasks: ['babel:dist'],
        options: {
          spawn: false
        }
      },
      other: {
        files: ['src/**/*.*', '!**/*.jsx'],
        tasks: ['copy:dist'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('dev', ['default','watch']);
  grunt.registerTask('default', ['clean:dist', 'copy:dist', 'babel:dist', 'concat:dist', 'uglify:dist', 'cssmin:dist']);
};