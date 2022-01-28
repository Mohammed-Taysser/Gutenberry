const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  webp = require('gulp-webp'),
  imagemin = require('gulp-imagemin'),

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
      src:   'src/html/pages/*.pug',
      dest:  'dist/html',
    },
    scss: {
      watch: 'src/css/**/*.scss',
      src:   'src/css/*.scss',
      dest:  'dist/css/',
    },
    javascript: {
      src:  'src/javascript/*.js',
      dest: 'dist/javascript/',
    },
    statics: {
      fonts: {
        src:  'src/fonts/**/*',
        dest: 'dist/fonts/',
      },
      music: {
        src:  'src/music/**/*',
        dest: 'dist/music/',
      },
      css: {
        src:  'src/css/libs/*',
        dest: 'dist/css/libs/',
      },
      javascript: {
        src:  'src/javascript/libs/*.js',
        dest: 'dist/javascript/libs/',
      },
    },
    images: {
      src: [
        'src/images/**/*.{png,jpg,jpeg,svg}',
        '!src/images/icons/favicon.{png,jpg,jpeg,svg}',
      ],
      dest: 'dist/images/',
    },
    favicon: {
      src:  'src/images/icons/favicon.{png,jpg,jpeg,svg}',
      dest: 'dist/images/icons/',
      size: [
        { width: 180, height: 180, label: 'apple-touch-icon' },
        { width: 512, height: 512, label: 'favicon@512' },
        { width: 192, height: 192, label: 'favicon@192' },
        { width: 32, height: 32, label: 'favicon@3x' },
        { width: 16, height: 16, label: 'favicon@2x' },
      ],
    },
  };

function clean() {
  'use strict';
  return del(['dist/**', '!dist']);
}

function scssTask() {
  'use strict';
  return gulp
    .src(PATHS.scss.src)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename((path) => {
      path.extname = '.min.css';
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.scss.dest));
}

function htmlTask() {
  'use strict';
  require('./server.js');
  return gulp
    .src(PATHS.html.src)
    .pipe(pug({ pretty: false }))
    .pipe(gulp.dest(PATHS.html.dest));
}

function javascriptTask() {
  'use strict';
  return gulp
    .src(PATHS.javascript.src)
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATHS.javascript.dest));
}

function staticsCSSTask() {
  'use strict';
  return gulp
    .src(PATHS.statics.css.src)
    .pipe(gulp.dest(PATHS.statics.css.dest));
}

function staticsJavascriptTask() {
  'use strict';
  return gulp
    .src(PATHS.statics.javascript.src)
    .pipe(gulp.dest(PATHS.statics.javascript.dest));
}

function imagesTask() {
  'use strict';
  return gulp
    .src(PATHS.images.src)
    .pipe(imagemin({ verbose: true }))
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
    width,
    height,
    format: 'png',
  });
}

function faviconTask() {
  'use strict';
  const favicon = gulp
    .src(PATHS.favicon.src)
    .pipe(gulp.dest(PATHS.favicon.dest));

  PATHS.favicon.size.forEach((format) => {
    favicon
      .pipe(imageSizeConfig(format.width, format.height))
      .pipe(rename((path) => {
        path.basename = format.label;
      }))
      .pipe(gulp.dest(PATHS.favicon.dest));
  });

  return favicon;
}

function musicTask() {
  'use strict';
  return gulp
    .src(PATHS.statics.music.src)
    .pipe(gulp.dest(PATHS.statics.music.dest));
}

function fontsTask() {
  'use strict';
  return gulp
    .src(PATHS.statics.fonts.src)
    .pipe(gulp.dest(PATHS.statics.fonts.dest));
}

function watchChange() {
  'use strict';
  gulp.watch(PATHS.html.watch, htmlTask);
  gulp.watch(PATHS.scss.watch, scssTask);
  gulp.watch(PATHS.javascript.src, javascriptTask);
  gulp.watch(PATHS.statics.javascript.src, staticsJavascriptTask);
  gulp.watch(PATHS.statics.css.src, staticsCSSTask);
  gulp.watch(PATHS.statics.fonts.src, fontsTask);
  gulp.watch(PATHS.images.src, imagesTask);
  gulp.watch(PATHS.statics.music.src, musicTask);
  gulp.watch(PATHS.favicon.src, faviconTask);
}

exports['default'] = gulp.series(clean, htmlTask, javascriptTask, staticsJavascriptTask, staticsCSSTask, scssTask, fontsTask, imagesTask, musicTask, faviconTask, watchChange);
