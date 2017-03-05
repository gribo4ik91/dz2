'use strict';

module.exports = function() {
  $.gulp.task('sprite:png', function() {
    var spriteData = $.gulp.src('./source/assets/img/sprite/*.png')
      .pipe($.gp.spritesmith({
			    imgName: 'sprite.png',
			    cssName: 'sprite.scss',
          cssFormat: 'scss',
          imgPath: '../img/sprite/sprite.png',
          algorithm: 'binary-tree',
			    padding: 5,
          cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
			  }));

    spriteData.img.pipe($.gulp.dest($.config.root + '/assets/img/sprite'));
    spriteData.css.pipe($.gulp.dest('./source/style'));
    
    return spriteData;
  });
};