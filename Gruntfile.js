
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
        },
        banner: '/*!\n' +
          '  <%= pkg.name %>\n' +
          '  @version: <%= pkg.version %>\n' + 
          '  @author: <%= pkg.author %>\n' +
          '  @update: <%= grunt.template.today("yyyy-mm-dd") %>\n' + 
        '*/'
      },
      target: {
        options: {
          sourceMap: true,
          sourceMapName: './<%= pkg.name %>.map'
        },
        files: {
          'jquery.slide.<%= pkg.version %>.min.js': ['<%= pkg.main %>']
        }
      }
    },
  });
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.registerTask( 'default', [ 'uglify' ] );
};

