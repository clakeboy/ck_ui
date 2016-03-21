/**
 * Created by CLAKE on 2016/3/17.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //concat: {
        //    options: {
        //        separator: ';'
        //    },
        //    dist: {
        //        src: ['src/**/*.js'],
        //        dest: 'dist/<%= pkg.name %>.js'
        //    }
        //},
        requirejs: {
            std: {
                options: {
                    baseUrl: "src",
                    out: "dist/public/<%= pkg.name %>.js"
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> version:<%= pkg.version%>*/\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.<%= pkg.version.replace(/[\.]/g,"_")%>.min.js': ['<%= requirejs.std.options.out %>']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['requirejs', 'uglify']);

};