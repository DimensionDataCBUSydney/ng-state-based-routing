/// <binding BeforeBuild='build' />

var gulp = require('gulp');

var config = {
	bowerDir: "./bower_components"
};

gulp.task(
	'default',
	['build']
);

gulp.task(
	'build',
	[
		'build-vendor-js',
		'build-vendor-css',
		'build-ts'
	]
);

gulp.task(
	'clean',
	[
		'clean-vendor-js',
		'clean-vendor-css'
	]
);

var cp = require('gulp-copy');
var rm = require('gulp-clean');
var tsc = require('gulp-tsc');
var bowerMain = require('bower-main');
var mainBowerFiles = require('main-bower-files');

var bowerScripts = bowerMain('js', 'min.js');
var bowerStyles = bowerMain('css', 'min.css');

/////////////////
// Vendor scripts

gulp.task(
	'build-vendor-js',
	function () {
		gulp.src(bowerScripts.normal)
			.pipe(
				gulp.dest('wwwroot/scripts/vendor')
			);
	}
);

gulp.task(
	'clean-vendor-js',
	function () {
		gulp.src('wwwroot/scripts/vendor')
			.pipe(
				rm()
			);
	}
);

////////////////
// Vendor styles

gulp.task(
	'build-vendor-css',
	function () {
		gulp.src(bowerStyles.normal)
			.pipe(
				gulp.dest('wwwroot/css/vendor')
			);

		// Explicit copy for bootstrap components
		gulp.src(config.bowerDir + '/bootstrap/dist/css/*.css')
			.pipe(
				gulp.dest('wwwroot/css/vendor')
			);

		gulp.src(config.bowerDir + '/bootstrap/dist/fonts/*')
			.pipe(
				gulp.dest('wwwroot/fonts')
			);
	}
);

gulp.task(
	'clean-vendor-css',
	function () {
		gulp.src('wwwroot/css/vendor')
			.pipe(
				rm()
			);
	}
);

//////////////////////
// Application scripts

gulp.task(
	'build-ts',
	function () {
		gulp.src('app/**/*.ts')
			.pipe(
				tsc()
			)
			.pipe(
				gulp.dest('wwwroot/scripts/app')
			);
	}
);
