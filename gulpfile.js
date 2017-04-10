'use strict';

var gulp          = require('gulp');
var less          = require('gulp-less');
var prefixer      = require('gulp-autoprefixer');
var sourcemaps    = require('gulp-sourcemaps');
var cssnano       = require('gulp-cssnano');
var uglify        = require('gulp-uglify');
var plumber       = require('gulp-plumber');
var concat        = require('gulp-concat');
var filter        = require('gulp-filter');
var remove        = require('rimraf');
var mainBower     = require('main-bower-files');
var watch         = require('gulp-watch');
// var fileSort      = require('gulp-angular-filesort');
var browserSync   = require("browser-sync");

var reload        = browserSync.reload;

var path = {
  src: {     //Откуда брать исходники
    html: 'src/index.html',
    scripts: 'src/scripts/**/*.js',
    styles: 'src/styles/index.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    vendor: {
      styles: 'src/vendor/**/*.css',
      scripts: 'src/vendor/**/*.js',
      fonts: ['src/vendor/**/*.woff2', 'src/vendor/**/*.woff', 'src/vendor/**/*.ttf', 'src/vendor/**/*.eot']
    }
  },
  dist: {    //Адреса куда ложить файлы сборки
    dev: {
      html: 'dist.dev/',
      scripts: 'dist.dev/scripts/',
      styles: 'dist.dev/styles/',
      img: 'dist.dev/img/',
      fonts: 'dist.dev/fonts/',
      vendor: 'dist.dev/vendor/'
    }
  },
  watch: {    //За изменениями каких файлов мы хотим наблюдать
    html: 'src/**/*.html',
    scripts: 'src/app/**/*.js',
    styles: 'src/content/styles/**/*.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './dist.dev'
};

var config = { //Конфигурация сервера
  server: {
    baseDir: "./dist.dev" //Исходная директория
  },
  // tunnel: true, Включить туннелирование
  host: 'localhost',
  port: 9999,
  logPrefix: "Laplandin"
};

gulp.task('html', function() {
  gulp.src(path.src.html)
    .pipe(gulp.dest(path.dist.dev.html))
    .pipe(reload({stream: true}));
});

gulp.task('styles', function() {
  gulp.src(path.src.styles)
    .pipe(plumber())
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest(path.dist.dev.styles))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
  gulp.src(path.src.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.dev.scripts))
    .pipe(reload({stream: true}));
});

gulp.task('vendor',function() {
  gulp.src(mainBower())
    .pipe(filter(['**/*.css']))
    .pipe(concat('vendor.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(path.dist.dev.vendor));

  gulp.src(mainBower())
    .pipe(filter(['**/*.js']))
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.dev.vendor));

  gulp.src(mainBower())
    .pipe(filter(['**/*.woff2', '**/*.woff', '**/*.ttf', '**/*.eot']))
    .pipe(gulp.dest(path.dist.dev.fonts));
});

gulp.task('build-dev', ['html', 'styles', 'scripts', 'vendor']);

gulp.task('serve', ['build-dev', 'watch'], function() {
  browserSync(config);
});

gulp.task('watch', function() {
  watch([path.watch.html], function() {
    gulp.start('html');
  });
  watch([path.watch.styles], function() {
    gulp.start('styles');
  });
  watch([path.watch.scripts], function() {
    gulp.start('scripts');
  });
});

gulp.task('clean',function(cb) {
  remove(path.clean, cb);
});
