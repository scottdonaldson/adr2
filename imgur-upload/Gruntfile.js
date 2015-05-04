module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            node: {
                command: 'foreman start'
            }
        },
        sass: {
            dist: {
                options: {
                    compass: true,
                    style: 'compressed'
                },
                files: {
                    'public/css/style.css': 'public/sass/style.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 1%']
            },
            no_dest: {
                src: ['public/css/style.css']
            }
        },

        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['public/js/**/*.js'],
                tasks: ['uglify', 'jshint'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['public/sass/*.scss', 'public/css/style.css'],
                tasks: ['public/sass', 'autoprefixer'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('watch', ['sass', 'autoprefixer', 'watch']);
    grunt.registerTask('default', ['shell:node']);
}
