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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLy8gaW5kZXggZmxpcFxudmFyIGZsaXAgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1dGgtYnV0dG9uJyksXG4gICAgZmxpcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBhdXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDE4MGRlZyknO1xuICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSxcbiAgICBtYWluOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDBkZWcpJztcbiAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG4gIH1cblxufSkoKTtcblxudmFyIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoLWJ1dHRvbicpLFxuICByZXR1cm5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJldHVybicpO1xuXG5idG4ub25jbGljayA9IGZsaXAuYXV0aDtcbnJldHVybkJ0bi5vbmNsaWNrID0gZmxpcC5tYWluO1xuXG5cbi8vaW5kZXggcGFyYWxheFxudmFyIHBhcmFsYXhDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFyYWxheCcpLFxuICBsYXllcnMgPSBwYXJhbGF4Q29udGFpbmVyLmNoaWxkcmVuO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcblxuICB2YXIgcGFnZVggPSBlLnBhZ2VYLFxuICAgIHBhZ2VZID0gZS5wYWdlWSxcbiAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXG4gICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcblxuICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcbiAgICB2YXIgbGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxuICAgICAgZGl2aWRlciA9IGkgLyA0MCxcbiAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogZGl2aWRlcixcbiAgICAgIGhvcml6b250YWxQb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpICogZGl2aWRlcixcbiAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcbiAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogZGl2aWRlcixcbiAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgsIDApJztcblxuICAgIGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgIGxheWVyU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgIGxheWVyU3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xuICAgIGxheWVyU3R5bGUubGVmdCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XG4gICAgbGF5ZXJTdHlsZS5yaWdodCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XG4gIH0pXG5cbn0pO1xuIl0sImZpbGUiOiJpbmRleC5qcyJ9
