module.exports = function (grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        concat:{
            options:{
                separator:';'
            },
            dist:{
                src:[
                    'myCanvasDrawing/src/js/init.js',
                    'myCanvasDrawing/src/js/baseDrawing.js',
                    'myCanvasDrawing/src/js/moduleRelativeToFun.js',
                    'myCanvasDrawing/src/js/help.js',
                    'myCanvasDrawing/src/js/mainDrawingFuns.js',
                    'myCanvasDrawing/src/js/Polygon.js',
                    'myCanvasDrawing/src/js/relateToRubber.js',
                    'myCanvasDrawing/src/js/event.js'
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
            files:['Gruntfile.js','myCanvasDrawing/src/js/*.js','test/**/*.js'],
            options:{
                jQuery:true,
                console:true,
                module:true
            }
        },
        watch:{
            files:['<%= jshint.files%>'],
            tasks:['jshint','qunit']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test',['jshint']);
    grunt.registerTask('default',['jshint','concat','uglify']);
};