var gulp = require('gulp');
var sass = require('gulp-sass');
var wiredep = require('wiredep').stream;
var gulpLoadPlugins = require('gulp-load-plugins');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
var browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

const $ = gulpLoadPlugins();

// inject bower components....MAY HAVE TO FIX SRC PATHS
gulp.task('wiredep', () => {
    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/styles'));
    gulp.src('*.html')
        .pipe(wiredep({
            exclude: ['bootstrap-sass'],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('.'));
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
// gulp.task('sass', function() {
//     return gulp.src('./app/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./css/main.css'));
// });

// gulp.task('sass:watch', function() {
//     gulp.watch('./app/**/*.scss', ['sass']);
// });
gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.', '.tmp'],
      routes: {
        '/bower_components': 'bower_components'
      },
      directory: true
    }
  });

  gulp.watch([
    'app/**/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});
gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
