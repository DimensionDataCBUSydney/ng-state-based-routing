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
	"watch",
	[
		"watch-ts"
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

var cp				= require("gulp-copy");
var plumber			= require("gulp-plumber");
var rm				= require("gulp-clean");
var tsc				= require("gulp-tsc");
var watch			= require("gulp-watch");

var bowerMain		= require("bower-main");

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

		// Explicit copy for semantic-ui components
		gulp.src(config.dir.bower + "/semantic-ui/dist/**/*.js")
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
			.pipe(plumber())
			.pipe(
				gulp.dest(config.dir.vendorStyles)
			);

		gulp.src("vendor/css/**/*")
			.pipe(plumber())
			.pipe(
				gulp.dest(config.dir.vendorStyles)
			);

		// Explicit copy for semantic-ui components
		gulp.src(config.dir.bower + "/semantic-ui/dist/**/*.css")
			.pipe(plumber())
			.pipe(
				gulp.dest(config.dir.vendorStyles)
			);

		gulp.src(config.dir.bower + "/semantic-ui/dist/themes/**/*")
			.pipe(plumber())
			.pipe(
				gulp.dest(config.dir.vendorStyles + "/themes")
			);

		// Explicit copy for FontAwesome components
		gulp.src(config.dir.bower + "/fontawesome/css/*")
			.pipe(plumber())
			.pipe(
				gulp.dest(config.dir.vendorStyles)
			);
		gulp.src(config.dir.bower + "/fontawesome/fonts/*")
			.pipe(plumber())
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
	"watch-ts",
	function () {
		gulp
			.watch(
				"app/**/*.ts",
				[
					"build-ts"
				]
			)
			.on("change", reportFileChange);
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

/**
 * Print a notification about a changes to files to the console
 * @param {} fileChange The file that changed.
 * @returns {} 
 */
function reportFileChange(fileChange) {
	console.log("File " + fileChange.path + " was " + fileChange.type + ", running tasks...");
}