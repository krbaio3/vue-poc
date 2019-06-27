import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import cssnano from 'gulp-cssnano';
import csso from 'gulp-csso';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import shell from 'gulp-shell';
import runSeq from 'run-sequence';
import path from 'path';
import $ from 'gulp-plugin';

const WEB_PORT = 4500; 

const paths = {
  index: './index.html',
  js: ['./app.js'],
  css: ['./app.css', './foundation.min.css'],
  dist: './dist',
  source: './'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', () => {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(paths.dist);
});

gulp.task('scss', () => {
  return gulp
    .src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.resolve(paths.dist, 'css')));
});

// Copy all static images
gulp.task('images', () => {
  gulp.src(paths.images).pipe(gulp.dest(path.resolve(paths.dist, 'images')));
});

gulp.task('original', function() {
  return gulp
    .src(paths.images)
    .pipe(
      imagemin({
        progressive: true,
        optimizationLevel: 5
      })
    )
    .pipe(gulp.dest(path.resolve(paths.dist, 'images')));
});

// Rerun the task when a file changes
gulp.task('cssnano', () => {
  return gulp
    .src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(concat('all.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.resolve(paths.dist, 'css')));
});

// Rerun the task when a file changes
gulp.task('css', () => {
  return gulp
    .src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(
      csso({
        restructure: true,
        debug: true
      })
    )
    .pipe(concat('all.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.resolve(paths.dist, 'css')));
});

// FontStyles file
gulp.task('fontStyles', () => {
  return gulp
    .src(paths.fontStyles)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.resolve(paths.dist, 'css')));
});

gulp.task('package', shell.task('npm pack'));

// Static Server + watching scss/html files
gulp.task('server', function() {
  browserSync.init({
    logLevel: 'debug',
    server: {
      baseDir: './dist',
      index: 'index.html',
      routes: {}
    },
    browserSync: true,
    port: WEB_PORT,
    open: 'local'
  });

  //sass scripts watch
  gulp.watch(['src/app/**/*.scss'], ['build-sass'], function() {
    browserSync.reload();
    //done();
  });

  gulp.watch(path.alljs, function() {
    browserSync.reload();
    log('Ha recargado JS');
  });

  //html watch
  gulp.watch('./src/app/**/*.html').on('change', browserSync.reload);
  log('Ha recargado!!');
});

gulp.task('inject:js', function() {
  let injectScripts = gulp
    .src(paths.js)
    .on('error', this.errorHandler('JavaScrit'));

  let injectOptions = {
    //addRootSlash: false
    relative: true
  };

  gutil.log('Inyección de dependecias en el index.html');
  gutil.log('path.index ===> ' + paths.index);
  gutil.log('path.alljs ===> ' + paths.js);
  //revisar
  return (
    gulp
      .src(path.index)
      .pipe(
        $.debug({
          verbose: true
        })
      )
      .pipe($.plumber())
      .pipe($.inject(injectScripts, injectOptions))
      // write the injections to the src/app/index.html file
      .pipe(gulp.dest(paths.source))
  );
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean'], () => {
  return runSeq(['css', 'fonts', 'fontStyles', 'images']);
});
