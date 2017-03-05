"use strict";

// index flip
var flip = (function () {
  var btn = document.querySelector('.auth-button'),
    flipper = document.querySelector('.flipper');

  return {
    auth: function () {
      flipper.style.transform = 'rotateY(180deg)';
      btn.style.display = 'none';
    },
    main: function () {
      flipper.style.transform = 'rotateY(0deg)';
      btn.style.display = 'block';
    }
  }

})();

var btn = document.querySelector('.auth-button'),
  returnBtn = document.querySelector('.btn-return');

btn.onclick = flip.auth;
returnBtn.onclick = flip.main;


//index paralax
var paralaxContainer = document.querySelector('.paralax'),
  layers = paralaxContainer.children;

window.addEventListener('mousemove', function (e) {

  var pageX = e.pageX,
    pageY = e.pageY,
    initialX = (window.innerWidth / 2) - pageX,
    initialY = (window.innerHeight / 2) - pageY;

  [].slice.call(layers).forEach(function (layer, i) {
    var layerStyle = layer.style,
      divider = i / 40,
      bottomPosition = (window.innerHeight / 2) * divider,
      horizontalPosition = (window.innerWidth / 2) * divider,
      positionX = initialX * divider,
      positionY = initialY * divider,
      transformString = 'translate3d(' + positionX + 'px,' + positionY + 'px, 0)';

    layerStyle.transform = transformString;
    layerStyle.webkitTransform = transformString;
    layerStyle.bottom = '-' + bottomPosition + 'px';
    layerStyle.left = '-' + horizontalPosition + 'px';
    layerStyle.right = '-' + horizontalPosition + 'px';
  })

});
