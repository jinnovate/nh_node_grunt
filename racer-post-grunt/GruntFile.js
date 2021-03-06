module.exports = function (grunt) {
    /** load all grunt tasks matching the `grunt-*` pattern **/
    require('load-grunt-tasks')(grunt);

    /** set up config **/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        distDir: 'dist',
        port: 9020,

        // serve the presentation
        connect: {
            watch: {
                options: {
                    port: '<%= port %>',
                    base: '',
                    livereload: true,
                    hostname: '0.0.0.0',
                    open: {
                        target: 'http://localhost:<%= port %>'
                    }
                }
            },
            standalone: {
                options: {
                    port: '<%= port %>',
                    base: '',
                    livereload: true,
                    keepalive: true,
                    hostname: '0.0.0.0',
                    open: {
                        target: 'http://localhost:<%= port %>'
                    }
                }
            }
        },

        // copy the files to the dist version
        copy: {
            statics: {
                files: {
                    'dist/': ['*.html']
                }
            },
            img: {
                files: {
                    'dist/': ['images/**']
                }
            }
        },

        // clean the dist directory
        clean: {
            src: [
                '<%= distDir %>/'
            ]
        },

        // concat the files
        concat: {
            js: {
                src: 'js/*.js',
                dest: '<%= distDir %>/main.js'
            },
            css: {
                src: 'css/common.css',
                dest: '<%= distDir %>/main.css'
            }
        },

        // minify the js
        uglify: {
            options: {
                report: 'min'
            },
            js: {
                files: {
                    '<%= distDir %>/main.js': '<%= distDir %>/main.js'
                }
            }
        },

        ////////////////////////////////////////////
        // Insert cssmin here
        ////////////////////////////////////////////

        // allow to serve different files for development and release
        useminPrepare: {
            html: 'index.html'
        },
        usemin: {
            html: '<%= distDir %>/index.html'
        },

        // watch files and run tasks on change
        watch: {
            options: {
                livereload: true
            },
            all: {
                files: [ 'images/**', '*.{html,css,js}'],
                tasks: []
            }
        }
    });

    /** register tasks **/

    // default task
    grunt.registerTask('default', []);

    // create a web server to host content
    grunt.registerTask('serve', ['connect:standalone']);

    // use before a release
    grunt.registerTask('release', ['useminPrepare', 'clean', 'copy', 'concat', 'uglify', 'usemin']);

    // kick off the default task then watch
    grunt.registerTask('dev', ['default', 'connect:watch', 'watch']);
};