'use strict';

module.exports = function() {
  $.gulp.task('assets', function() {
    return $.gulp.src(['./source/assets/**/*.*', '!./source/assets/img/sprite/*.*'], { since: $.gulp.lastRun('assets') })
      .pipe($.gulp.dest($.config.root + '/assets/'));
  });
};
