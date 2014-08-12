module.exports = function (grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        concat:{
            options:{
                separator:'\n'
            },
            dist:{
                src:[
                    'myCanvasDrawing/src/js/init.js',
                    'myCanvasDrawing/src/js/*.js',
                    '!myCanvasDrawing/src/js/drawing.js'
                ],
                dest:'myCanvasDrawing/dist/<%= pkg.name%>.js'
            }
        },
        uglify:{
            options:{
                banner:'/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist:{
                files:{
                  'myCanvasDrawing/dist/<%= pkg.name %>.min.js':['<%= concat.dist.dest %>']
                }
            }
        },
        qunit:{
            files:['test/**/*.html']
        },
        jshint:{
            options:{
                curly:true,
                eqeqeq:true,
                eqnull:true,
                browser:true
            },
            all:['Gruntfile.js','myCanvasDrawing/src/js/*.js','myCanvasDrawing/dist/<%= pkg.name%>.js','test/**/*.js'],
            beforeconcat:['Gruntfile.js','myCanvasDrawing/src/js/*.js','test/**/*.js'],
            afterconcat:{
                options:{
                    curly:true,
                    eqeqeq:true,
                    eqnull:true,
                    browser:true,
                    unused:true,
                    undef:true
                },
                files:{
                    src:['myCanvasDrawing/dist/myCanvasDrawing.js']
                }
            }

        },
        watch:{
            files:['<%= jshint.files%>'],
            tasks:['jshint:all','concat','uglify']
        },
        exec:{
            restart_app:{
                cmd:"echo 'my name is xu'"
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('test',['jshint']);
    grunt.registerTask('default',['jshint:all','concat','uglify']);
};