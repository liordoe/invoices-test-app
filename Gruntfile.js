module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-injector');

    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "public/css/app.css": "public/src/shared/styles/app.less" // destination file and source file
                }
            }
        },
        watch: {
            styles: {
                files: ['**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        injector: {
            options: {
                relative: true,
                min: true
            },
            local_dependencies: {
                files: {
                    'public/index.html': ['public/js/**/*.min.js', 'public/src/**/*.js', '**/*.css'],
                }
            }
        }
    });

    grunt.registerTask('server', 'Start a custom web server', function() {
        require('./app.js');
    });

    grunt.registerTask('default', ['injector', 'server', 'less', 'watch']);
};
