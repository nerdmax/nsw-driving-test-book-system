const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

gulp.task('auto', ['browser-sync'], () => {});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3500',
    files: ['views/**/*.*', 'public/**/*.*', 'gulpflag.html'],
    port: 3001,
    notify: true,
  });
});
gulp.task('nodemon', (cb) => {
  let started = false;

  return nodemon({
    script: 'app.js',
    nodeArgs: ['--debug'],
    ignore: ['gulpfile.js', 'node_modules/', 'public/', 'views/'],
  }).on('start', () => {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});
