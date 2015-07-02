/// <binding BeforeBuild='build' />

var gulp = require('gulp');

gulp.task(
	'default',
	['build']
);

gulp.task(
	'build',
	[
		'build-vendor-js',
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

var bowerScripts = bowerMain('js', 'min.js');
var bowerStyles = bowerMain('css', 'min.css');

/////////////////
// Vendor scripts

gulp.task(
	'build-vendor-js',
	function()
	{
		var pipeline =
			gulp.src(
				bowerScripts.normal
			)
			.pipe(
				gulp.dest('wwwroot/scripts/vendor')
			);

		return pipeline;
	}
);

gulp.task(
	'clean-vendor-js',
	function()
	{
		return gulp.src('wwwroot/scripts/vendor').pipe(rm());
	}
);

////////////////
// Vendor styles

gulp.task(
	'build-vendor-css',
	function () {
		var pipeline =
			gulp.src(
				bowerStyles.normal
			)
			.pipe(
				gulp.dest('wwwroot/css/vendor')
			);

		return pipeline;
	}
);

gulp.task(
	'clean-vendor-css',
	function()
	{
		return gulp.src('wwwroot/css/vendor').pipe(rm());
	}
);

//////////////////////
// Application scripts

gulp.task(
	'build-ts',
	function () {
		var pipeline =
			gulp.src(
				'app/**/*.ts'
			)
			.pipe(
				tsc()
			)
			.pipe(
				gulp.dest('wwwroot/scripts/app')
			);

		return pipeline;
	}
);
