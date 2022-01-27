const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  webp = require('gulp-webp'),

  // responsive = require('gulp-responsive'),
  imageResize = require('gulp-image-resize'),
  del = require('del'),
  pug = require('gulp-pug'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass')(require('sass')),
  uglify = require('gulp-uglify'),
  PATHS = {
    html: {
      watch: 'src/html/**/*.pug',
      src: 'src/html/pages/*.pug',
      dest: 'dist/html',
    },
    scss: {
      watch: 'src/css/**/*.scss',
      src: 'src/css/*.scss',
      dest: 'dist/css/',
    },
    javascript: {
      src: 'src/javascript/*.js',
      dest: 'dist/javascript/',
    },
    statics: {
      fonts: {
        src: 'src/fonts/**/*',
        dest: 'dist/fonts/',
      },
      music: {
        src: 'src/music/**/*',
        dest: 'dist/music/',
      },
      css: {
        src: 'src/css/libs/*',
        dest: 'dist/css/libs/',
      },
      javascript: {
        src: 'src/javascript/libs/*.js',
        dest: 'dist/javascript/libs/',
      },
    },
    images: {
      src: ['src/images/**/*.{png,jpg,jpeg,svg}', '!src/images/icons/favicon.{png,jpg,jpeg,svg}'],
      dest: 'dist/images/',
    },
    favicon: {
      src: 'src/images/icons/favicon.{png,jpg,jpeg,svg}',
      dest: 'dist/images/icons/',
    },
  };

function clean() {
  'use strict';
  return del(['dist/**', '!dist']);
}

function scss_task() {
  'use strict';
  return gulp
    .src(PATHS.scss.src)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename(function (path) { path.extname = '.min.css'; }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.scss.dest));
}

function html_task() {
  'use strict';
  require('./server.js');
  return gulp
    .src(PATHS.html.src)
    .pipe(pug({ pretty: false }))
    .pipe(gulp.dest(PATHS.html.dest));
}

function js_task() {
  'use strict';
  return (
    gulp
      .src(PATHS.javascript.src)
      .pipe(sourcemaps.init())
      .pipe(babel({ presets: ['@babel/env'] }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(PATHS.javascript.dest))
  );
}

function statics_css_task() {
  'use strict';
  return gulp
    .src(PATHS.statics.css.src)
    .pipe(gulp.dest(PATHS.statics.css.dest));
}

function statics_js_task() {
  'use strict';
  return gulp
    .src(PATHS.statics.javascript.src)
    .pipe(gulp.dest(PATHS.statics.javascript.dest));
}

function images_task() {
  'use strict';
  return gulp.src(PATHS.images.src)
    .pipe(webp())
    .pipe(gulp.dest(PATHS.images.dest));
}

/**
 * return config objects
 * @param {Number} width width of the new image
 * @param {Number} height height of the new image
 * @returns {Object}
 */
function imageSizeConfig(width, height) {
  'use strict';
  return imageResize({
    width: width,
    height: height,
    format: 'png',
  });
}

function favicon_task() {
  'use strict';
  const default_favicon = gulp.src(PATHS.favicon.src).pipe(gulp.dest(PATHS.favicon.dest)),
    SIZE_CONFIG = [
      { width: 180, height: 180, label: 'apple-touch-icon' },
      { width: 512, height: 512, label: 'favicon@512' },
      { width: 192, height: 192, label: 'favicon@192' },
      { width: 32, height: 32, label: 'favicon@3x' },
      { width: 16, height: 16, label: 'favicon@2x' },
    ];

  SIZE_CONFIG.forEach(format => {
    default_favicon
      .pipe(imageSizeConfig(format.width, format.height))
      .pipe(rename(path => { path.basename = format.label; }))
      .pipe(gulp.dest(PATHS.favicon.dest));
  });

  return default_favicon;
}

function music_task() {
  'use strict';
  return gulp
    .src(PATHS.statics.music.src)
    .pipe(gulp.dest(PATHS.statics.music.dest));
}

function fonts_task() {
  'use strict';
  return gulp
    .src(PATHS.statics.fonts.src)
    .pipe(gulp.dest(PATHS.statics.fonts.dest));
}

function watch_fun() {
  'use strict';
  gulp.watch(PATHS.html.watch, html_task);
  gulp.watch(PATHS.scss.watch, scss_task);
  gulp.watch(PATHS.javascript.src, js_task);
  gulp.watch(PATHS.statics.javascript.src, statics_js_task);
  gulp.watch(PATHS.statics.css.src, statics_css_task);
  gulp.watch(PATHS.statics.fonts.src, fonts_task);
  gulp.watch(PATHS.images.src, images_task);
  gulp.watch(PATHS.statics.music.src, music_task);
  gulp.watch(PATHS.favicon.src, favicon_task);
}

exports.default = gulp.series(
  clean,
  html_task,
  js_task,
  statics_js_task,
  statics_css_task,
  scss_task,
  fonts_task,
  images_task,
  music_task,
  favicon_task,
  watch_fun,
);
