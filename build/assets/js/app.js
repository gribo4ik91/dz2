'use strict';

window.onload = function () {

// ПАРАЛАКС ЭФФФЕКТ В ШАПКЕ САЙТА
  var parallax = (function () {
    var bg = document.querySelector('.header__bg'),
      portfolio = document.querySelector('.header__portfolio'),
      user = document.querySelector('.header__user');

    return {

      move: function (block, windowScroll, strafeAmount) {
        var strafe = windowScroll / -strafeAmount + '%',
          transformString = 'translate3d(0, ' + strafe + ', 0)',
          style = block.style;

        style.transform = transformString;
        style.webkitTransform = transformString;
      },

      init: function (wScroll) {
        this.move(bg, wScroll, 45);
        this.move(portfolio, wScroll, 20);
        this.move(user, wScroll, 3);
      }

    }

  })();


  // АНИМАЦИЯ ИКОНОК СКИЛОВ
  var skillsDraw = (function () {
    var skills = document.querySelectorAll('.skill'),
      circles = document.querySelectorAll('.circle-second'),
      windowHeight = window.innerHeight;

    // вычисляем длину окружности
    var circleLength = function (circle) {
      var circleRadius = circle.getAttribute('r'),
        circleLength = 2 * Math.PI * circleRadius;

      return circleLength;
    };

    // применяем к окружности свойства по умолчанию
    [].slice.call(circles).forEach(function (circle) {

      circle.style.strokeDashoffset = circleLength(circle);
      circle.style.strokeDasharray = circleLength(circle);

    });

    // функция анимирования окружности в зависимости от процентов
    var circleAnimation = function (skill) {

      var circleFill = skill.querySelector('.circle-second'),
        skillPercent = skill.getAttribute('data-percent'),
        length = circleLength(circleFill),
        percent = length * (100 - skillPercent) / 100;

      setTimeout(function () {
        circleFill.style.strokeDashoffset = percent;
        circleFill.style.transition = 'all 1s';

        if (skillPercent < 50) {
          skill.style.opacity = 0.4;
          skill.style.transition = 'all 1s';
        }
      }, 500);

    };

    return {
      grow: function () {

        [].slice.call(skills).forEach(function (skill) {

          var circleRect = skill.getBoundingClientRect(),
            circlePos = circleRect.bottom,
            startAnimation = circlePos - windowHeight;

          if (startAnimation <= 0) {
            circleAnimation(skill);
          }

        });
      }
    }

  })();


  // ВЫЗОВ ФУНКЦИЯ ПО СКРОЛЛУ СТРАНИЦЫ
  window.onscroll = function () {
    var wScroll = window.pageYOffset;

    parallax.init(wScroll);
    skillsDraw.grow(wScroll);
  };

// BLUR EFFECT
  var blur = (function () {
    var section = document.querySelector('.feedback'),
      blurWrapper = document.querySelector('.feedback-form'),
      blur = document.querySelector('.feedback-form__blur');

    return {
      set: function () {
        var imgWidth = document.querySelector('.feedback__bg').offsetWidth,
          img = document.querySelector('.feedback__bg'),
          imgCoords = img.getBoundingClientRect(),
          sectionCoords = section.getBoundingClientRect(),
          blurCoords = blurWrapper.getBoundingClientRect(),
          posLeft = -blurWrapper.offsetLeft,
          posTop = img.offsetTop - blurWrapper.offsetTop,
          blurCSS = blur.style;

        console.log(img.offsetTop, imgCoords.top, posTop)

        blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
        blurCSS.backgroundPosition = posLeft + 'px ' + posTop + 'px';
      }
    }
  })();

  blur.set();

  window.onresize = function () {
    blur.set();
  };


  // СКРЫТЬ/ПОКАЗАТЬ ГЛАВНОЕ МЕНЮ
  var burgerMenu = document.querySelector('.hamburger-btn');

  burgerMenu.addEventListener('click', function () {
    var menu = document.querySelector('.main-navigation');

    console.log(this);
    this.classList.toggle('hamburger-btn_closed');
    menu.classList.toggle('main-navigation_disabled');

  });

  // СКРОЛЛ СТРАНИЦЫ ПО КЛИКУ НА ССЫЛКУ В ШАПКЕ
  var scrollDown = document.querySelector('.scroll-link_down');

  scrollDown.addEventListener('click', function (e) {
    e.preventDefault();
    var section = this.parentNode.nextSibling.nextSibling,
      posTop = section.offsetTop;

    $('body,html').animate({scrollTop: posTop}, 1500);

  });

  // СРОЛЛ СТРАНИЦЫ ВВЕРХ
  var scrollUp = document.querySelector('.scroll-link_up');

  scrollUp.addEventListener('click', function (e) {
    e.preventDefault();

    $('body,html').animate({scrollTop: 0}, 1200);
  });


};




//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4vLyDQn9CQ0KDQkNCb0JDQmtChINCt0KTQpNCk0JXQmtCiINCSINCo0JDQn9Ca0JUg0KHQkNCZ0KLQkFxuICB2YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2JnJyksXG4gICAgICBwb3J0Zm9saW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19wb3J0Zm9saW8nKSxcbiAgICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX191c2VyJyk7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XG4gICAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnLFxuICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknLFxuICAgICAgICAgIHN0eWxlID0gYmxvY2suc3R5bGU7XG5cbiAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICB9LFxuXG4gICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xuICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcbiAgICAgICAgdGhpcy5tb3ZlKHBvcnRmb2xpbywgd1Njcm9sbCwgMjApO1xuICAgICAgICB0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgMyk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfSkoKTtcblxuXG4gIC8vINCQ0J3QmNCc0JDQptCY0K8g0JjQmtCe0J3QntCaINCh0JrQmNCb0J7QklxuICB2YXIgc2tpbGxzRHJhdyA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbCcpLFxuICAgICAgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaXJjbGUtc2Vjb25kJyksXG4gICAgICB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAvLyDQstGL0YfQuNGB0LvRj9C10Lwg0LTQu9C40L3RgyDQvtC60YDRg9C20L3QvtGB0YLQuFxuICAgIHZhciBjaXJjbGVMZW5ndGggPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICB2YXIgY2lyY2xlUmFkaXVzID0gY2lyY2xlLmdldEF0dHJpYnV0ZSgncicpLFxuICAgICAgICBjaXJjbGVMZW5ndGggPSAyICogTWF0aC5QSSAqIGNpcmNsZVJhZGl1cztcblxuICAgICAgcmV0dXJuIGNpcmNsZUxlbmd0aDtcbiAgICB9O1xuXG4gICAgLy8g0L/RgNC40LzQtdC90Y/QtdC8INC6INC+0LrRgNGD0LbQvdC+0YHRgtC4INGB0LLQvtC50YHRgtCy0LAg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cbiAgICBbXS5zbGljZS5jYWxsKGNpcmNsZXMpLmZvckVhY2goZnVuY3Rpb24gKGNpcmNsZSkge1xuXG4gICAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xuICAgICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xuXG4gICAgfSk7XG5cbiAgICAvLyDRhNGD0L3QutGG0LjRjyDQsNC90LjQvNC40YDQvtCy0LDQvdC40Y8g0L7QutGA0YPQttC90L7RgdGC0Lgg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINC/0YDQvtGG0LXQvdGC0L7QslxuICAgIHZhciBjaXJjbGVBbmltYXRpb24gPSBmdW5jdGlvbiAoc2tpbGwpIHtcblxuICAgICAgdmFyIGNpcmNsZUZpbGwgPSBza2lsbC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlLXNlY29uZCcpLFxuICAgICAgICBza2lsbFBlcmNlbnQgPSBza2lsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpLFxuICAgICAgICBsZW5ndGggPSBjaXJjbGVMZW5ndGgoY2lyY2xlRmlsbCksXG4gICAgICAgIHBlcmNlbnQgPSBsZW5ndGggKiAoMTAwIC0gc2tpbGxQZXJjZW50KSAvIDEwMDtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNpcmNsZUZpbGwuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IHBlcmNlbnQ7XG4gICAgICAgIGNpcmNsZUZpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xuXG4gICAgICAgIGlmIChza2lsbFBlcmNlbnQgPCA1MCkge1xuICAgICAgICAgIHNraWxsLnN0eWxlLm9wYWNpdHkgPSAwLjQ7XG4gICAgICAgICAgc2tpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xuICAgICAgICB9XG4gICAgICB9LCA1MDApO1xuXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBncm93OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgW10uc2xpY2UuY2FsbChza2lsbHMpLmZvckVhY2goZnVuY3Rpb24gKHNraWxsKSB7XG5cbiAgICAgICAgICB2YXIgY2lyY2xlUmVjdCA9IHNraWxsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgY2lyY2xlUG9zID0gY2lyY2xlUmVjdC5ib3R0b20sXG4gICAgICAgICAgICBzdGFydEFuaW1hdGlvbiA9IGNpcmNsZVBvcyAtIHdpbmRvd0hlaWdodDtcblxuICAgICAgICAgIGlmIChzdGFydEFuaW1hdGlvbiA8PSAwKSB7XG4gICAgICAgICAgICBjaXJjbGVBbmltYXRpb24oc2tpbGwpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSkoKTtcblxuXG4gIC8vINCS0KvQl9Ce0JIg0KTQo9Cd0JrQptCY0K8g0J/QniDQodCa0KDQntCb0JvQoyDQodCi0KDQkNCd0JjQptCrXG4gIHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgIHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XG4gICAgc2tpbGxzRHJhdy5ncm93KHdTY3JvbGwpO1xuICB9O1xuXG4vLyBCTFVSIEVGRkVDVFxuICB2YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSxcbiAgICAgIGJsdXJXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm0nKSxcbiAgICAgIGJsdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW1nV2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2tfX2JnJykub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrX19iZycpLFxuICAgICAgICAgIGltZ0Nvb3JkcyA9IGltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBzZWN0aW9uQ29vcmRzID0gc2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBibHVyQ29vcmRzID0gYmx1cldyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgcG9zTGVmdCA9IC1ibHVyV3JhcHBlci5vZmZzZXRMZWZ0LFxuICAgICAgICAgIHBvc1RvcCA9IGltZy5vZmZzZXRUb3AgLSBibHVyV3JhcHBlci5vZmZzZXRUb3AsXG4gICAgICAgICAgYmx1ckNTUyA9IGJsdXIuc3R5bGU7XG5cbiAgICAgICAgY29uc29sZS5sb2coaW1nLm9mZnNldFRvcCwgaW1nQ29vcmRzLnRvcCwgcG9zVG9wKVxuXG4gICAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFNpemUgPSBpbWdXaWR0aCArICdweCcgKyAnICcgKyAnYXV0byc7XG4gICAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFBvc2l0aW9uID0gcG9zTGVmdCArICdweCAnICsgcG9zVG9wICsgJ3B4JztcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG5cbiAgYmx1ci5zZXQoKTtcblxuICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgYmx1ci5zZXQoKTtcbiAgfTtcblxuXG4gIC8vINCh0JrQoNCr0KLQrC/Qn9Ce0JrQkNCX0JDQotCsINCT0JvQkNCS0J3QntCVINCc0JXQndCuXG4gIHZhciBidXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlci1idG4nKTtcblxuICBidXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbicpO1xuXG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXItYnRuX2Nsb3NlZCcpO1xuICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnbWFpbi1uYXZpZ2F0aW9uX2Rpc2FibGVkJyk7XG5cbiAgfSk7XG5cbiAgLy8g0KHQmtCg0J7Qm9CbINCh0KLQoNCQ0J3QmNCm0Ksg0J/QniDQmtCb0JjQmtCjINCd0JAg0KHQodCr0JvQmtCjINCSINCo0JDQn9Ca0JVcbiAgdmFyIHNjcm9sbERvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWxpbmtfZG93bicpO1xuXG4gIHNjcm9sbERvd24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgc2VjdGlvbiA9IHRoaXMucGFyZW50Tm9kZS5uZXh0U2libGluZy5uZXh0U2libGluZyxcbiAgICAgIHBvc1RvcCA9IHNlY3Rpb24ub2Zmc2V0VG9wO1xuXG4gICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBwb3NUb3B9LCAxNTAwKTtcblxuICB9KTtcblxuICAvLyDQodCg0J7Qm9CbINCh0KLQoNCQ0J3QmNCm0Ksg0JLQktCV0KDQpVxuICB2YXIgc2Nyb2xsVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWxpbmtfdXAnKTtcblxuICBzY3JvbGxVcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgMTIwMCk7XG4gIH0pO1xuXG5cbn07XG5cblxuXG4iXSwiZmlsZSI6ImFwcC5qcyJ9
