'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./sourse/js/**/*.js', $.gulp.series('js:process'));
    $.gulp.watch('./sourse/style/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./sourse/template/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('./sourse/img/**/*.*', $.gulp.series('assets'));
  });
};
