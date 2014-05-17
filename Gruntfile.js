
module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    uglify: {
      options: {
        compress: { 
          dead_code: true,
          unused: true,
          drop_debugger: true,
          warnings: true
        }
      },
      'slide': {
        options: {
          banner: '/*!\n' +
          '  <%= pkg.name %>\n' +
          '  @version: <%= pkg.version %>\n' + 
          '  @author: <%= pkg.author %>\n' +
          '  @update: <%= grunt.template.today("yyyy-mm-dd") %>\n' + 
          '*/'
        },
        files: {
          'jquery.slide.<%= pkg.version %>.min.js': ['<%= pkg.main %>']
        }
      },
      'slide-ui': {
        files: {
          'jquery.slide.ui.<%= pkg.uiversion %>.min.js': [ './jquery.slide.ui.js' ]
        }
      }
    },
  });
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.registerTask( 'default', [ 'uglify' ] );
};

