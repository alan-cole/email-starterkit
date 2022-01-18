const sass = require('node-sass');

module.exports = function(grunt) {

  grunt.initConfig({

    // Twig Render
    twigRender: {
      options: {
        // Task-specific options go here.
      },
      your_target: {
        options: {
          // Target specific options go here
        },
        files : [
          {
            data: "src/data.json",
            template: "src/template.twig",
            dest: "dist/twig-build.html"
          }
        ]
      },
    },

    // SCSS
    sass: {
      options: {
        implementation: sass,
      },
      dist: {
        files: {
          'dist/styles.css': 'src/styles.scss',
        }
      }
    },

    // INLINE CSS
    inlinecss: {
      main: {
        files: {
          'dist/index.html': 'dist/twig-build.html'
        }
      }
    },

    // Watch
    watch: {
      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['src/**/*'],
        tasks: ['twigRender', 'sass:dist', 'inlinecss'],
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        files: ['dist/index.html'],
        options: {
          livereload: true
        },
      },
    },

    // Connect
    connect: {
      server: {
        options: {
          livereload: true,
          port: 8000,
          base: 'dist'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-twig-render');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-inline-css');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default tasks.
  grunt.registerTask('default', ['twigRender', 'sass:dist', 'inlinecss']);
  grunt.registerTask('dev', ['connect', 'twigRender', 'sass:dist', 'inlinecss', 'watch']);

}
