/// <binding BeforeBuild="build" />

var gulp = require("gulp");

var config = {
	dir: {
		appScripts: "wwwroot/scripts/app",
		vendorScripts: "wwwroot/scripts/vendor",
		vendorStyles: "wwwroot/css/vendor",
		fonts: "wwwroot/styles",
		bower: "./bower_components"
	}
};

gulp.task(
	"default",
	["build"]
);

gulp.task(
	"build",
	[
		"build-vendor-js",
		"build-vendor-css",
		"build-ts"
	]
);

gulp.task(
	"clean",
	[
		"clean-app-js",
		"clean-vendor-js",
		"clean-vendor-css"
	]
);

var cp = require("gulp-copy");
var rm = require("gulp-clean");
var tsc = require("gulp-tsc");
var bowerMain = require("bower-main");
var mainBowerFiles = require("main-bower-files");

var bowerScripts = bowerMain("js", "min.js");
var bowerStyles = bowerMain("css", "min.css");

/////////////////
// Vendor scripts

gulp.task(
	"build-vendor-js",
	function () {
		gulp.src(bowerScripts.normal)
			.pipe(
				gulp.dest(config.dir.vendorScripts)
			);

		gulp.src("vendor/js/**/*.js")
			.pipe(
				gulp.dest(config.dir.vendorScripts)
			);
	}
);

gulp.task(
	"clean-vendor-js",
	function () {
		gulp.src(config.dir.vendorScripts)
			.pipe(
				rm()
			);
	}
);

////////////////
// Vendor styles

gulp.task(
	"build-vendor-css",
	function () {
		gulp.src(bowerStyles.normal)
			.pipe(
				gulp.dest(config.dir.vendorStyles)
			);

		// Explicit copy for bootstrap components
		gulp.src(config.bowerDir + "/bootstrap/dist/css/*.css")
			.pipe(
				gulp.dest(config.dir.vendorStyles)
			);

		gulp.src(config.bowerDir + "/bootstrap/dist/fonts/*")
			.pipe(
				gulp.dest(config.dir.fonts)
			);

		gulp.src("vendor/css/**/*")
			.pipe(
				gulp.dest(config.dir.vendorStyles)
			);

	}
);

gulp.task(
	"clean-vendor-css",
	function () {
		gulp.src(config.dir.vendorStyles)
			.pipe(
				rm()
			);
	}
);

//////////////////////
// Application scripts

gulp.task(
	"build-ts",
	function () {
		gulp.src("app/**/*.ts")
			.pipe(
				tsc()
			)
			.pipe(
				gulp.dest(config.dir.appScripts)
			);
	}
);

gulp.task(
	"clean-app-js",
	function () {
		gulp.src(config.dir.appScripts)
			.pipe(
				rm()
			);
	}
);
