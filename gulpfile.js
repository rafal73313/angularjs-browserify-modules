
var gulp = require('gulp'),
webserver = require('gulp-webserver'),
del = require('del'),
sourcemaps = require('gulp-sourcemaps'),
spritesmith = require('gulp.spritesmith'),
browserify = require('browserify'),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer'),
uglify = require('gulp-uglify'),
gutil = require('gulp-util'),
ngAnnotate = require('browserify-ngannotate'),
runSequence = require('gulp4-run-sequence'),
concat = require('gulp-concat');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs bower to install frontend dependencies
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('bower', function() {

    var install = require("gulp-install");

    return gulp.src(['./bower.json'])
        .pipe(install());
});

/////////////////////////////////////////////////////////////////////////////////////
//
// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-template-cache', function() {

    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");

    return gulp.src("./src/components/**/*.html")
        .pipe(ngHtml2Js({
            moduleName: "wa",
            prefix: 'src/components/'
        }))
        .pipe(concat("componentsTemplatesCache.js"))
        .pipe(gulp.dest("./src/dist"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// Build a minified Javascript bundle - the order of the js files is determined
// by browserify
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-js', function() {
var b = browserify({
    entries: './src/index.js',
    debug: true,
    paths: ['./src/components/**/*.js'],
    transform: [ngAnnotate]
});

return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // .pipe(cachebust.resources())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/dist/'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// full build (except sprites), applies cache busting to the main page css and js bundles
//
/////////////////////////////////////////////////////////////////////////////////////

/*
gulp.task('build', [ 'clean', 'bower','build-css','build-template-cache', 'jshint', 'build-js'], function() {
return gulp.src('index.html')
    .pipe(cachebust.references())
    .pipe(gulp.dest('dist'));
});
*/
gulp.task('default', function() {
    return runSequence('build-template-cache', 'build-js');
})

/////////////////////////////////////////////////////////////////////////////////////
//
// launches a web server that serves files in the current directory
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('webserver', function() {
gulp.src('.')
    .pipe(webserver({
        livereload: false,
        directoryListing: true,
        open: "http://localhost:8000/dist/index.html"
    }));
});
