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



