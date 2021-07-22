import gulp from 'gulp';
import include from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import sync from 'browser-sync';


import concat from 'gulp-concat'
import replace from 'gulp-replace';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import csso from 'gulp-csso';
import autoprefixer from 'gulp-autoprefixer';

import babel from 'gulp-babel';
import terser from 'gulp-terser';


// HTML

export const html = () => {
  return gulp.src('src/*.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

// SCSS

export const styles = () => {
  return gulp.src('src/styles/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
}

// Scripts

export const scripts = () => {
  return gulp.src('src/scripts/index.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(terser())
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
};

// Copy

export const copy = () => {
  return gulp.src([
      'src/fonts/**/*',
      'src/images/**/*',
    ], {
      base: 'src'
    })
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream({
      once: true
    }));
};

// Paths

export const paths = () => {
  return gulp.src('dist/*.html')
    .pipe(replace(
      /(<link rel="stylesheet" href=")styles\/(index.css">)/, '$1$2'
    ))
    .pipe(replace(
      /(<script src=")scripts\/(index.js">)/, '$1$2'
    ))
    .pipe(gulp.dest('dist'));
};

// Server

export const server = () => {
  sync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: 'dist'
    }
  });
};

// Watch

export const watch = () => {
  gulp.watch('src/*.html', gulp.series(html, paths));
  gulp.watch('src/styles/**/*.scss', gulp.series(styles));
  gulp.watch('src/scripts/**/*.js', gulp.series(scripts));
  gulp.watch([
    'src/fonts/**/*',
    'src/images/**/*',
  ], gulp.series(copy));
};

// Default

export default gulp.series(
  gulp.parallel(
    html,
    styles,
    scripts,
    copy,
  ),
  paths,
  gulp.parallel(
    watch,
    server,
  ),
);