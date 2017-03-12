'use strict';

module.exports = function() {
  $.gulp.task('assets', function() {
    return $.gulp.src(['./sourse/assets/**/*.*', '!./sourse/assets/img/sprite/*.*'], { since: $.gulp.lastRun('assets') })
      .pipe($.gulp.dest($.config.root + '/assets/'));
  });
};
