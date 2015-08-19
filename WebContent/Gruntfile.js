/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({

		dir: {
			webapp: "webapp",
			dist: "dist",
			bower_components: "bower_components"
		},

		jshint: {
			all: ['Gruntfile.js', 'view/**/*.js']
		},

		sass: {
					
			'resources/styles/css/default.css' : 'resources/styles/sass/default.scss'
		},

		watch: {
/*			application: {
				files: "<%= jshint.application.src %>",
				tasks: ["jshint"]
			},*/
			livereload: {
				options: {
					livereload: "<%= connect.options.livereload %>"
				},
				files: [
					"<%= dir.webapp %>/**",
					"util/**/*.js",
					"view/**/*.js",
					"*.js",
					"view/**/*.xml"
				]
			},
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		},


		open: {
			root: {
				path: "http://<%= connect.options.hostname %>:<%= connect.options.port %>",
				options: {
					delay: 500
				}
			}
		},


		connect: {
			options: {
				port: "8080",
				livereload: 35729,
				hostname: "localhost",
				base: "."
			},

			proxies: {
				context: "/lexmark",  // When the url contains this...
				host: "tlexwsang001.na.ds.lexmark.com", // Proxy to this host
				changeOrigin: true,
				port: 8010 ,
				rewrite: {
			        // the key '^/api' is a regex for the path to be rewritten
			        // the value is the context of the data service
			        '^/lexmark': ''
			    }
			},

			livereload: {
				
				options: {
					middleware: function(connect, options) {
						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}

						// Setup the proxy
						var middlewares = [require("grunt-connect-proxy/lib/utils").proxyRequest];

						// Serve static files.
						options.base.forEach(function(base) {
							middlewares.push(connect.static(base));
						});

						return middlewares;
					}
				}
				
			
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					//cwd: 'src/',
					dest: 'dist/',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'view/**/*',
						'images/**/**/*',
						'fonts/*'
					]
				}]
			}
		},

		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      //cwd: 'release/css',
		      src: ['*.css', '!*.min.css','resources/styles/css/*.css'],
		      dest: 'dist',
		      ext: '.min.css'
		    }]
		  }
		},

		htmlmin: {                                                                       
		    options: {                                 
		        removeComments: true,
		        collapseWhitespace: true
		    },
		    compile:{
		    	files: {                                   
		        	'dist/index.html': ['index.html']
		      	}
			}
		},
		uglify: {
    		options: {
		      mangle: false
		    },
		    my_target: {
		      files: {
		        'dist/output.min.js': ['*.js','view/*.js']
		      }
		    }
  		},

		clean: ["dist/"]
	});

	// These plugins provide necessary tasks
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-open");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-connect-proxy");

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask("default", ["jshint", "qunit:all", "watch"]);
	grunt.registerTask("serve", function() {
		grunt.task.run([
			"configureProxies",
			"connect:livereload",
			"open",
			"clean",
			"copy:dist",
			"sass",
			"jshint",
			"watch"
		]);
	});

	grunt.registerTask('build', [
		"configureProxies",
		"connect:livereload",
		"clean",
		"copy:dist",
		"jshint",
		"sass",
		"cssmin",
		"htmlmin",
		"uglify"
	]);
};
