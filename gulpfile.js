var gulp = require('gulp');
var sass = require('gulp-sass');
var wiredep = require('wiredep').stream;
var gulpLoadPlugins = require('gulp-load-plugins');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
const autoprefixer = require('gulp-autoprefixer');

const $ = gulpLoadPlugins();

// inject bower components....MAY HAVE TO FIX SRC PATHS
gulp.task('wiredep', () => {
    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/styles'));
    gulp.src('app/html/*.html')
        .pipe(wiredep({
            exclude: ['bootstrap-sass'],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('default', function() {

});

var scssStream = gulp.src(['./app/styles/*.scss'])
    .pipe(sass())
    .pipe(concat('scss-files.scss'));
gulp.task('styles', () => {
    return gulp.src('./app/styles/*.scss')
        .pipe(concat('main.scss'))
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe($.sourcemaps.write())
        .pipe(minify())
        .pipe(gulp.dest('.tmp/'))
        //.pipe(reload({stream: true}));
});
gulp.watch('app/styles/*.scss', ['styles']);
gulp.task('sass', function() {
    return gulp.src('./app/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/main.css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./app/**/*.scss', ['sass']);
});
