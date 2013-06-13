module.exports = (grunt) ->
  
  grunt.task.loadTasks 'gruntcomponents/tasks'
  grunt.task.loadNpmTasks 'grunt-contrib-coffee'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'
  grunt.task.loadNpmTasks 'grunt-contrib-concat'
  grunt.task.loadNpmTasks 'grunt-contrib-uglify'

  grunt.initConfig

    pkg: grunt.file.readJSON('package.json')
    banner: """
/*! <%= pkg.name %> (<%= pkg.repository.url %>)
 * lastupdate: <%= grunt.template.today("yyyy-mm-dd") %>
 * version: <%= pkg.version %>
 * author: <%= pkg.author %>
 * License: MIT */

"""

    growl:

      ok:
        title: 'COMPLETE!!'
        msg: '＼(^o^)／'

    coffee:

      swapgallerywithdots:
        src: [ 'jquery.swapgallerywithdots.coffee' ]
        dest: 'jquery.swapgallerywithdots.js'

    concat:

      banner:
        options:
          banner: '<%= banner %>'
        src: [ '<%= coffee.swapgallerywithdots.dest %>' ]
        dest: '<%= coffee.swapgallerywithdots.dest %>'
        
    uglify:

      options:
        banner: '<%= banner %>'
      swapgallerywithdots:
        src: '<%= concat.banner.dest %>'
        dest: 'jquery.swapgallerywithdots.min.js'

    watch:

      swapgallerywithdots:
        files: '<%= coffee.swapgallerywithdots.src %>'
        tasks: [
          'default'
        ]

  grunt.registerTask 'default', [
    'coffee'
    'concat'
    'uglify'
    'growl:ok'
  ]

