/**
 * Created by CLAKE on 2016/3/17.
 */
module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        pkg: pkg,
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
            compile: {
                options: {
                    baseUrl: "src",
                    mainConfigFile: "src/r.config.js",
                    out: "dist/public/<%= pkg.name %>.js",
                    name: 'main',
                    optimize: pkg.debug ? "none" : "uglify"
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> version:<%= pkg.version%>*/\n'
            },
            dist: {
                files: {
                    'dist/public/<%= pkg.name %>-<%= pkg.version.replace(/[\.]/g,"-")%>.min.js': ['<%= requirejs.compile.options.out %>']
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