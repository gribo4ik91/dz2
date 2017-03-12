var BlogMenu = (function () {
  var sidebar = document.querySelector('.sidebar');

  function _fixMenu() {
    var nav = document.querySelector('.blog-menu'),
      navCoords = sidebar.getBoundingClientRect().top;

    if (window.innerWidth >= 780) {
      if (navCoords <= -50) {
        nav.style.position = 'fixed';
        nav.style.top = '20px';
        nav.style.width = '20%';
      } else {
        nav.style.position = 'static';
        nav.style.width = 'auto';
      }
    } else {
      nav.style.position = 'absolute';
      nav.style.top = '';
      nav.style.width = 'auto';
    }

  }

  function _initActive () {
    var posts = document.querySelectorAll('.post__title'),
      postLinks = document.querySelectorAll('.blog-menu__link'),
      activeLink = document.getElementsByClassName('blog-menu__link_active');


    for (var i = 0; i < posts.length; i++) {
      var post = posts[i],
        postTop = post.getBoundingClientRect().top;

      if (postTop <= 100) {
        activeLink[0].classList.remove('blog-menu__link_active');
        postLinks[i].classList.add('blog-menu__link_active');
      }
    }
  }

  var _openMenu = function () {
    sidebar.classList.add('sidebar_open');
  };
  var _closeMenu = function () {
    sidebar.classList.remove('sidebar_open');
  };

  return {
    init: _fixMenu,
    initActive: _initActive,
    toggle: function () {
      if (!sidebar.classList.contains('sidebar_open')) {
        _openMenu();
      }
      else {
        _closeMenu();
      }
    }
  }
})();
// BLUR EFFECT
var Blur = (function () {
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

      blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
      blurCSS.backgroundPosition = posLeft + 'px ' + posTop + 'px';
    }
  }
})();
// index flip
var Flip = (function () {
  var btn = document.querySelector('.auth-button'),
    flipper = document.querySelector('.flipper');

  var _auth = function () {
    flipper.style.transform = 'rotateY(180deg)';
    btn.style.display = 'none';
  };

  var _welcome = function () {
    flipper.style.transform = 'rotateY(0deg)';
    btn.style.display = 'block';
  };

  return {
    auth: _auth,
    welcome: _welcome
  }

})();
var Validation = (function () {
  var errorField = document.querySelector('.input-error-msg'),
    captchaError = document.querySelector('.welcome__error'),
    formContainer = document.querySelector('.form__container');

  var _init = function (form) {
    var elems = form.elements;

    console.log(elems);
    return _validate(elems) ? true : false;
  };

  function _validate(inputs) {

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].tagName === 'BUTTON') continue;

      var elem = inputs[i];

      if (elem.value == '') {
        console.log(elem);
        return _showError(elem)
      }

      if (elem.type === 'checkbox' || elem.type === 'radio') {

        if (elem.checked && elem.value === 'yes') {
          return true;
        }
        if (!elem.checked) {
          captchaError.style.display = 'flex';
        }
      }
    }

    return true;

  };

  function _showError(elem) {
    var text = elem.getAttribute('placeholder').toLowerCase();
    var position = elem.parentNode.offsetTop + elem.parentNode.offsetHeight;

    elem.parentNode.classList.add('input-group_error');
    errorField.style.display = 'block';
    errorField.innerText = 'Вы не ввели ' + text;

    // if (position > formContainer.offsetHeight)
    errorField.style.top = position + 'px';
  }

  function _clearError(elem) {
    console.log(elem);
    elem.parentNode.classList.remove('input-group_error');
    errorField.style.display = 'none';
  }


  return {
    init: _init,
    clear: _clearError
  }
})();
function initMap () {
  var pointer = new google.maps.LatLng(47.045302, 28.768934),
    center = new google.maps.LatLng(47.037911, 28.779352);

  var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#96d7c8"},{"visibility":"on"}]}];

  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  var mapSettings = {
    center: center,
    scrollwheel: false,
    zoom: 15,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    streetViewControl: false
  };

  var map = new google.maps.Map(document.getElementById('map'), mapSettings);

  var marker = new google.maps.Marker({
    icon: 'assets/img/decor/map_marker.png',
    position: pointer,
    map: map,
    title: "I'm here!",
    animation: google.maps.Animation.BOUNCE
  });

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
};

var Menu = (function () {
  var menu = document.querySelector('.main-navigation'),
    burgerMenu = document.querySelector('.hamburger-btn');

  return {
    toggle: function () {
      burgerMenu.classList.toggle('hamburger-btn_closed');
      menu.classList.toggle('main-navigation_disabled');

      document.body.style.overflow = (!menu.classList.contains('main-navigation_disabled')) ? 'hidden' : 'auto';
    }
  }
})();
//index paralax
var MainParalax = (function () {

  var _show = function () {

    var paralaxContainer = document.querySelector('#paralax'),
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
  };

  var _disabled = function () {
    //для планшетов и телефонов подставить просто картинку, а не грузить весь паралакс
  };

  return {
    init: _show
  };

})();
var Preloader = (function () {
  var loader = document.querySelector('.preloader'),
    wrapper = document.querySelector('.index-wrapper'),
    images = document.querySelectorAll('img'),
    flipCard = document.querySelector('.flipper'),
    procentField = document.querySelector('.preloader__percent'),
    percent = 0,
    percentStep = 100 / (images.length + 0.4);

  function _loadImage(img) {
    return new Promise(function (resolve, reject) {
      img.onload = function () {
        percent = Math.ceil(percent + percentStep);
        console.log(percent, percentStep);
        procentField.innerHTML = percent + '%';
        resolve(img);
      };
      img.onerror = function () {
        reject(img);
      }
    });
  }

  function _showLoader(imgList) {
    var promiseImg = imgList.map(_loadImage);

    Promise.all(promiseImg)
      .then(function (value) {
        wrapper.style.display = 'block';

        percent = 100;
        procentField.innerHTML = percent + '%';
        setTimeout(function () {
          loader.style.opacity = '0';
          // loader.parentNode.removeChild(loader);
          loader.style.display = 'none';
        }, 1500)
      })
      .then(function () {
        setTimeout(function () {
          flipCard.style.transform = 'rotate3d(1,0,0, 0deg)';
        }, 1500)
      })
  };

function _closeLoader() {
  var imgArr = Array.prototype.slice.call(images);

  _showLoader(imgArr);
};


return {
  init: _closeLoader
}

})
();


/*
 1 - загрузить сам прелоадер
 2 - взять все картинки на странице
 3 - по мере загрузки картинок менять проценты
 4 - после загрузки всех картинок убрать прелоадер
 */
var ScrollPage = (function () {

  return {
    down: function (elem) {
      var section = elem.parentNode.nextSibling.nextSibling,
        posTop = section.offsetTop;

      $('body,html').animate({scrollTop: posTop}, 1500);
    },

    up: function () {
      $('body,html').animate({scrollTop: 0}, 1200);
    }
  }
})();


// ПАРАЛАКС ЭФФФЕКТ В ШАПКЕ САЙТА
var HeaderParallax = (function () {
  var bg = document.querySelector('.header__bg'),
    portfolio = document.querySelector('.header__portfolio'),
    user = document.querySelector('.header__user');

  var _move = function (block, windowScroll, strafeAmount) {
    var strafe = windowScroll / -strafeAmount + '%',
      transformString = 'translate3d(0, ' + strafe + ', 0)',
      style = block.style;

    if (windowScroll < window.innerHeight) {
      style.transform = transformString;
      style.webkitTransform = transformString;
    }
  };

  return {

    init: function (wScroll) {
      _move(bg, wScroll, 45);
      if (portfolio !== null) {
        _move(portfolio, wScroll, 20);
      };
      _move(user, wScroll, 3);
    }

  }

})();
// АНИМАЦИЯ ИКОНОК СКИЛОВ
var Skills = (function () {
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
var Slider = (function () {
  var items = $('.work-slider__item', '.work-slider__list_next'),
    index = 1,
    ndx,
    duration = 500,
    title = $('.work__title'),
    skills = $('.work__technology'),
    imgContainer = $('.work__pic');

  function _init() {
    var activeItem = items.eq(index),
      imgSrc = activeItem.find('img').attr('src'),
      activeTitle = activeItem.data('title'),
      activeSlill = activeItem.data('technology');

    imgContainer.attr('src', imgSrc);
    title.text(activeTitle);
    skills.text(activeSlill);

    var nextItem = $('.work-slider__item', '.work-slider__list_next').eq(index + 1);
    nextItem.addClass('work-slider__item_current');
    var prevItem = $('.work-slider__item', '.work-slider__list_prev').eq(index - 1);
    prevItem.addClass('work-slider__item_current');
  }

  function animateSlide(ndx, container, direction) {
    var nextItems = $('.work-slider__item', container),
      currentItem = nextItems.filter('.work-slider__item_current'),
      reqItem = nextItems.eq(ndx);
    direction = direction === 'up' ? -100 : 100;

    currentItem.animate({
      'top': direction + '%'
    }, duration);

    reqItem.animate({
      'top': 0
    }, duration, function () {
      currentItem.removeClass('work-slider__item_current').css('top', -direction + '%');
      reqItem.addClass('work-slider__item_current');
    })
  }

  function _moveNext() {
    var container = $('.work-slider__list_next'),
      direction = 'up';

    if (index == items.length - 1) {
      ndx = 0;
    } else if (index < 0) {
      ndx = items.length - 1;
    } else {
      ndx = index + 1;
    }

    animateSlide(ndx, container, direction);
  }

  function _movePrev() {
    var container = $('.work-slider__list_prev'),
      direction = 'down';

    if (index > items.length - 1) {
      ndx = 0;
    } else if (index <= 0) {
      ndx = items.length - 1;
    } else {
      ndx = index - 1;
    }

    animateSlide(ndx, container, direction);
  }

  function _slideShow() {
    var fadedOut = $.Deferred(),
      loaded = $.Deferred(),
      nextSrc = items.eq(index).find('img').attr('src'),
      nextTitle = items.eq(index).data('title'),
      nextSkills = items.eq(index).data('technology');

    _moveNext();
    _movePrev();

    imgContainer.fadeOut(function () {
      title.slideUp();
      skills.fadeOut();
      fadedOut.resolve();
    });

    fadedOut.done(function () {
      title.text(nextTitle);
      skills.text(nextSkills);
      imgContainer.attr('src', nextSrc).on('load', function () {
        loaded.resolve();
      })
    });

    loaded.done(function () {
      title.slideDown();
      skills.fadeIn();
      imgContainer.fadeIn();
    });
  }

  return {
    init: _init,
    move: function () {

      $('.toggle__link').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('toggle__link_next')) {
          index++;
        } else if ($(this).hasClass('toggle__link_prev')) {
          index--;
        }

        if (index > items.length - 1) {
          index = 0;
        } else if (index < 0) {
          index = items.length - 1;
        }

        _slideShow();

      })
    }
  }
})
();
var preload = document.querySelector('.preloader');

if (preload !== null) Preloader.init();

window.onload = function () {

  //MAIN PARALAX
  var paralax = document.querySelector('#paralax');

  if (paralax !== null) {
    MainParalax.init();
  }
  //
  // console.log(paralax);


  //FLIP CARD
  var authBtn = document.querySelector('.auth-button'),
    welcomeBtn = document.querySelector('.btn-return');

  if (authBtn !== null) {
    authBtn.addEventListener('click', function () {
      Flip.auth();
    });
  }

  if (welcomeBtn !== null) {
    welcomeBtn.addEventListener('click', function () {
      Flip.welcome();
    });
  }

  //BURGERMENU
  var burgerMenu = document.querySelector('.hamburger-btn');

  if (burgerMenu !== null) {
    burgerMenu.addEventListener('click', function () {
      Menu.toggle();
    });
  }


  //BLUR
  var blurForm = document.querySelector('.feedback-form__blur');

  if (blurForm !== null) {
    Blur.set();
    window.onresize = function () {
      Blur.set();
    };
  }


  var form = document.querySelector('form');

  if (form !== null) {
    //очистка ошибки
    var inputs = form.elements;
    var closeError = document.querySelector('.input-error-captcha__close');

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].onfocus = function() {
        if (this.parentNode.classList.contains('input-group_error')) {
          Validation.clear(this);
        }
      }
    }

    if (closeError !== null) {
      closeError.onclick = function() {
        closeError.parentNode.parentNode.style.display = 'none';
      };
    }


    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = Validation.init(form);

      console.log(valid);
    })
  }


  //SCROLL PAGE
  var scrollLinkDown = document.querySelector('.scroll-link_down');
  var scrollLinkUp = document.querySelector('.scroll-link_up');

  if (scrollLinkDown !== null) {
    scrollLinkDown.addEventListener('click', function (e) {
      e.preventDefault();

      ScrollPage.down(this);
    })
  }
  if (scrollLinkUp !== null) {
    scrollLinkUp.addEventListener('click', function (e) {
      e.preventDefault();

      ScrollPage.up(this);
    })
  }

  //SLIDER
  var slider = document.querySelector('.work__slider');

  if (slider !== null) {
    (function () {
      // Slider.init();
      Slider.init();
      Slider.move();
    })();
  }

  //HEADER PARALAX & SKILLS
  var bg = document.querySelector('.header__bg'),
    skills = document.querySelectorAll('.skill'),
    blogWrapper = document.querySelector('.blog-container');

  // ВЫЗОВ ФУНКЦИЯ ПО СКРОЛЛУ СТРАНИЦЫ
  window.onscroll = function () {

    var wScroll = window.pageYOffset;

    if (bg !== null) {
      HeaderParallax.init(wScroll);
    }

    if (skills !== null) {
      Skills.grow();
    }

    if (blogWrapper !== null) {
      BlogMenu.init();
      BlogMenu.initActive();
    }

  };

  var sideMenu = document.querySelector('.sidemenu-btn');

  if (sideMenu !== null) {
    sideMenu.onclick = function () {
      BlogMenu.toggle();
    }
  }

  window.onresize = function () {
    BlogMenu.init();
  }


};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2ctbWVudS5qcyIsImJsdXIuanMiLCJmbGlwLmpzIiwiZm9ybXMuanMiLCJnb29nbGUtbWFwLmpzIiwibWFpbi1tZW51LmpzIiwibWFpbi1wYXJhbGF4LmpzIiwicHJlbG9hZGVyLmpzIiwic2Nyb2xsLXBhZ2UuanMiLCJzY3JvbGwtcGFyYWxheC5qcyIsInNraWxscy5qcyIsInNsaWRlci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQmxvZ01lbnUgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG5cbiAgZnVuY3Rpb24gX2ZpeE1lbnUoKSB7XG4gICAgdmFyIG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLW1lbnUnKSxcbiAgICAgIG5hdkNvb3JkcyA9IHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc4MCkge1xuICAgICAgaWYgKG5hdkNvb3JkcyA8PSAtNTApIHtcbiAgICAgICAgbmF2LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgbmF2LnN0eWxlLnRvcCA9ICcyMHB4JztcbiAgICAgICAgbmF2LnN0eWxlLndpZHRoID0gJzIwJSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuYXYuc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJztcbiAgICAgICAgbmF2LnN0eWxlLndpZHRoID0gJ2F1dG8nO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuYXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgbmF2LnN0eWxlLnRvcCA9ICcnO1xuICAgICAgbmF2LnN0eWxlLndpZHRoID0gJ2F1dG8nO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gX2luaXRBY3RpdmUgKCkge1xuICAgIHZhciBwb3N0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0X190aXRsZScpLFxuICAgICAgcG9zdExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJsb2ctbWVudV9fbGluaycpLFxuICAgICAgYWN0aXZlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2ctbWVudV9fbGlua19hY3RpdmUnKTtcblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3N0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBvc3QgPSBwb3N0c1tpXSxcbiAgICAgICAgcG9zdFRvcCA9IHBvc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBpZiAocG9zdFRvcCA8PSAxMDApIHtcbiAgICAgICAgYWN0aXZlTGlua1swXS5jbGFzc0xpc3QucmVtb3ZlKCdibG9nLW1lbnVfX2xpbmtfYWN0aXZlJyk7XG4gICAgICAgIHBvc3RMaW5rc1tpXS5jbGFzc0xpc3QuYWRkKCdibG9nLW1lbnVfX2xpbmtfYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIF9vcGVuTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfb3BlbicpO1xuICB9O1xuICB2YXIgX2Nsb3NlTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpZGViYXJfb3BlbicpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogX2ZpeE1lbnUsXG4gICAgaW5pdEFjdGl2ZTogX2luaXRBY3RpdmUsXG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyX29wZW4nKSkge1xuICAgICAgICBfb3Blbk1lbnUoKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBfY2xvc2VNZW51KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KSgpOyIsIi8vIEJMVVIgRUZGRUNUXG52YXIgQmx1ciA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJyksXG4gICAgYmx1cldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybScpLFxuICAgIGJsdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpO1xuXG4gIHJldHVybiB7XG4gICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgaW1nV2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2tfX2JnJykub2Zmc2V0V2lkdGgsXG4gICAgICAgIGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFja19fYmcnKSxcbiAgICAgICAgaW1nQ29vcmRzID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBzZWN0aW9uQ29vcmRzID0gc2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgYmx1ckNvb3JkcyA9IGJsdXJXcmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBwb3NMZWZ0ID0gLWJsdXJXcmFwcGVyLm9mZnNldExlZnQsXG4gICAgICAgIHBvc1RvcCA9IGltZy5vZmZzZXRUb3AgLSBibHVyV3JhcHBlci5vZmZzZXRUb3AsXG4gICAgICAgIGJsdXJDU1MgPSBibHVyLnN0eWxlO1xuXG4gICAgICBibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xuICAgICAgYmx1ckNTUy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4ICcgKyBwb3NUb3AgKyAncHgnO1xuICAgIH1cbiAgfVxufSkoKTsiLCIvLyBpbmRleCBmbGlwXG52YXIgRmxpcCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcbiAgICBmbGlwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKTtcblxuICB2YXIgX2F1dGggPSBmdW5jdGlvbiAoKSB7XG4gICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgxODBkZWcpJztcbiAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfTtcblxuICB2YXIgX3dlbGNvbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSc7XG4gICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXV0aDogX2F1dGgsXG4gICAgd2VsY29tZTogX3dlbGNvbWVcbiAgfVxuXG59KSgpOyIsInZhciBWYWxpZGF0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVycm9yRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtZXJyb3ItbXNnJyksXG4gICAgY2FwdGNoYUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlbGNvbWVfX2Vycm9yJyksXG4gICAgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19jb250YWluZXInKTtcblxuICB2YXIgX2luaXQgPSBmdW5jdGlvbiAoZm9ybSkge1xuICAgIHZhciBlbGVtcyA9IGZvcm0uZWxlbWVudHM7XG5cbiAgICBjb25zb2xlLmxvZyhlbGVtcyk7XG4gICAgcmV0dXJuIF92YWxpZGF0ZShlbGVtcykgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgZnVuY3Rpb24gX3ZhbGlkYXRlKGlucHV0cykge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpbnB1dHNbaV0udGFnTmFtZSA9PT0gJ0JVVFRPTicpIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgZWxlbSA9IGlucHV0c1tpXTtcblxuICAgICAgaWYgKGVsZW0udmFsdWUgPT0gJycpIHtcbiAgICAgICAgY29uc29sZS5sb2coZWxlbSk7XG4gICAgICAgIHJldHVybiBfc2hvd0Vycm9yKGVsZW0pXG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtLnR5cGUgPT09ICdjaGVja2JveCcgfHwgZWxlbS50eXBlID09PSAncmFkaW8nKSB7XG5cbiAgICAgICAgaWYgKGVsZW0uY2hlY2tlZCAmJiBlbGVtLnZhbHVlID09PSAneWVzJykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZWxlbS5jaGVja2VkKSB7XG4gICAgICAgICAgY2FwdGNoYUVycm9yLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9O1xuXG4gIGZ1bmN0aW9uIF9zaG93RXJyb3IoZWxlbSkge1xuICAgIHZhciB0ZXh0ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJykudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgcG9zaXRpb24gPSBlbGVtLnBhcmVudE5vZGUub2Zmc2V0VG9wICsgZWxlbS5wYXJlbnROb2RlLm9mZnNldEhlaWdodDtcblxuICAgIGVsZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdpbnB1dC1ncm91cF9lcnJvcicpO1xuICAgIGVycm9yRmllbGQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgZXJyb3JGaWVsZC5pbm5lclRleHQgPSAn0JLRiyDQvdC1INCy0LLQtdC70LggJyArIHRleHQ7XG5cbiAgICAvLyBpZiAocG9zaXRpb24gPiBmb3JtQ29udGFpbmVyLm9mZnNldEhlaWdodClcbiAgICBlcnJvckZpZWxkLnN0eWxlLnRvcCA9IHBvc2l0aW9uICsgJ3B4JztcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jbGVhckVycm9yKGVsZW0pIHtcbiAgICBjb25zb2xlLmxvZyhlbGVtKTtcbiAgICBlbGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtZ3JvdXBfZXJyb3InKTtcbiAgICBlcnJvckZpZWxkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuXG4gIHJldHVybiB7XG4gICAgaW5pdDogX2luaXQsXG4gICAgY2xlYXI6IF9jbGVhckVycm9yXG4gIH1cbn0pKCk7IiwiZnVuY3Rpb24gaW5pdE1hcCAoKSB7XG4gIHZhciBwb2ludGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0Ny4wNDUzMDIsIDI4Ljc2ODkzNCksXG4gICAgY2VudGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0Ny4wMzc5MTEsIDI4Ljc3OTM1Mik7XG5cbiAgdmFyIHN0eWxlcyA9IFt7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NDV9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM5NmQ3YzhcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfV07XG5cbiAgdmFyIHN0eWxlZE1hcCA9IG5ldyBnb29nbGUubWFwcy5TdHlsZWRNYXBUeXBlKHN0eWxlcyxcbiAgICB7bmFtZTogXCJTdHlsZWQgTWFwXCJ9KTtcblxuICB2YXIgbWFwU2V0dGluZ3MgPSB7XG4gICAgY2VudGVyOiBjZW50ZXIsXG4gICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxuICAgIHpvb206IDE1LFxuICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xuICAgICAgbWFwVHlwZUlkczogW2dvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLCAnbWFwX3N0eWxlJ11cbiAgICB9LFxuICAgIHpvb21Db250cm9sOiB0cnVlLFxuICAgIHpvb21Db250cm9sT3B0aW9uczoge1xuICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9UT1BcbiAgICB9LFxuICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZVxuICB9O1xuXG4gIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwgbWFwU2V0dGluZ3MpO1xuXG4gIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICBpY29uOiAnYXNzZXRzL2ltZy9kZWNvci9tYXBfbWFya2VyLnBuZycsXG4gICAgcG9zaXRpb246IHBvaW50ZXIsXG4gICAgbWFwOiBtYXAsXG4gICAgdGl0bGU6IFwiSSdtIGhlcmUhXCIsXG4gICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uQk9VTkNFXG4gIH0pO1xuXG4gIG1hcC5tYXBUeXBlcy5zZXQoJ21hcF9zdHlsZScsIHN0eWxlZE1hcCk7XG4gIG1hcC5zZXRNYXBUeXBlSWQoJ21hcF9zdHlsZScpO1xufTtcbiIsInZhciBNZW51ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1uYXZpZ2F0aW9uJyksXG4gICAgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXItYnRuJyk7XG5cbiAgcmV0dXJuIHtcbiAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGJ1cmdlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGFtYnVyZ2VyLWJ0bl9jbG9zZWQnKTtcbiAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnbWFpbi1uYXZpZ2F0aW9uX2Rpc2FibGVkJyk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAoIW1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYWluLW5hdmlnYXRpb25fZGlzYWJsZWQnKSkgPyAnaGlkZGVuJyA6ICdhdXRvJztcbiAgICB9XG4gIH1cbn0pKCk7IiwiLy9pbmRleCBwYXJhbGF4XG52YXIgTWFpblBhcmFsYXggPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBfc2hvdyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBwYXJhbGF4Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsYXgnKSxcbiAgICAgIGxheWVycyA9IHBhcmFsYXhDb250YWluZXIuY2hpbGRyZW47XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgdmFyIHBhZ2VYID0gZS5wYWdlWCxcbiAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxuICAgICAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXG4gICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XG5cbiAgICAgIFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChsYXllciwgaSkge1xuICAgICAgICB2YXIgbGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxuICAgICAgICAgIGRpdmlkZXIgPSBpIC8gNDAsXG4gICAgICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxuICAgICAgICAgIGhvcml6b250YWxQb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpICogZGl2aWRlcixcbiAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXG4gICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxuICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgsIDApJztcblxuICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgICAgbGF5ZXJTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgIGxheWVyU3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xuICAgICAgICBsYXllclN0eWxlLmxlZnQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xuICAgICAgICBsYXllclN0eWxlLnJpZ2h0ID0gJy0nICsgaG9yaXpvbnRhbFBvc2l0aW9uICsgJ3B4JztcbiAgICAgIH0pXG5cbiAgICB9KTtcbiAgfTtcblxuICB2YXIgX2Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgIC8v0LTQu9GPINC/0LvQsNC90YjQtdGC0L7QsiDQuCDRgtC10LvQtdGE0L7QvdC+0LIg0L/QvtC00YHRgtCw0LLQuNGC0Ywg0L/RgNC+0YHRgtC+INC60LDRgNGC0LjQvdC60YMsINCwINC90LUg0LPRgNGD0LfQuNGC0Ywg0LLQtdGB0Ywg0L/QsNGA0LDQu9Cw0LrRgVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogX3Nob3dcbiAgfTtcblxufSkoKTsiLCJ2YXIgUHJlbG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKSxcbiAgICB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZGV4LXdyYXBwZXInKSxcbiAgICBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKSxcbiAgICBmbGlwQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyksXG4gICAgcHJvY2VudEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcl9fcGVyY2VudCcpLFxuICAgIHBlcmNlbnQgPSAwLFxuICAgIHBlcmNlbnRTdGVwID0gMTAwIC8gKGltYWdlcy5sZW5ndGggKyAwLjQpO1xuXG4gIGZ1bmN0aW9uIF9sb2FkSW1hZ2UoaW1nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlcmNlbnQgPSBNYXRoLmNlaWwocGVyY2VudCArIHBlcmNlbnRTdGVwKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyY2VudCwgcGVyY2VudFN0ZXApO1xuICAgICAgICBwcm9jZW50RmllbGQuaW5uZXJIVE1MID0gcGVyY2VudCArICclJztcbiAgICAgICAgcmVzb2x2ZShpbWcpO1xuICAgICAgfTtcbiAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZWplY3QoaW1nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zaG93TG9hZGVyKGltZ0xpc3QpIHtcbiAgICB2YXIgcHJvbWlzZUltZyA9IGltZ0xpc3QubWFwKF9sb2FkSW1hZ2UpO1xuXG4gICAgUHJvbWlzZS5hbGwocHJvbWlzZUltZylcbiAgICAgIC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB3cmFwcGVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIHBlcmNlbnQgPSAxMDA7XG4gICAgICAgIHByb2NlbnRGaWVsZC5pbm5lckhUTUwgPSBwZXJjZW50ICsgJyUnO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsb2FkZXIuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAvLyBsb2FkZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsb2FkZXIpO1xuICAgICAgICAgIGxvYWRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9LCAxNTAwKVxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZmxpcENhcmQuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZTNkKDEsMCwwLCAwZGVnKSc7XG4gICAgICAgIH0sIDE1MDApXG4gICAgICB9KVxuICB9O1xuXG5mdW5jdGlvbiBfY2xvc2VMb2FkZXIoKSB7XG4gIHZhciBpbWdBcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpbWFnZXMpO1xuXG4gIF9zaG93TG9hZGVyKGltZ0Fycik7XG59O1xuXG5cbnJldHVybiB7XG4gIGluaXQ6IF9jbG9zZUxvYWRlclxufVxuXG59KVxuKCk7XG5cblxuLypcbiAxIC0g0LfQsNCz0YDRg9C30LjRgtGMINGB0LDQvCDQv9GA0LXQu9C+0LDQtNC10YBcbiAyIC0g0LLQt9GP0YLRjCDQstGB0LUg0LrQsNGA0YLQuNC90LrQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcbiAzIC0g0L/QviDQvNC10YDQtSDQt9Cw0LPRgNGD0LfQutC4INC60LDRgNGC0LjQvdC+0Log0LzQtdC90Y/RgtGMINC/0YDQvtGG0LXQvdGC0YtcbiA0IC0g0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCy0YHQtdGFINC60LDRgNGC0LjQvdC+0Log0YPQsdGA0LDRgtGMINC/0YDQtdC70L7QsNC00LXRgFxuICovIiwidmFyIFNjcm9sbFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHJldHVybiB7XG4gICAgZG93bjogZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgIHZhciBzZWN0aW9uID0gZWxlbS5wYXJlbnROb2RlLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nLFxuICAgICAgICBwb3NUb3AgPSBzZWN0aW9uLm9mZnNldFRvcDtcblxuICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBwb3NUb3B9LCAxNTAwKTtcbiAgICB9LFxuXG4gICAgdXA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDEyMDApO1xuICAgIH1cbiAgfVxufSkoKTtcblxuIiwiLy8g0J/QkNCg0JDQm9CQ0JrQoSDQrdCk0KTQpNCV0JrQoiDQkiDQqNCQ0J/QmtCVINCh0JDQmdCi0JBcbnZhciBIZWFkZXJQYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2JnJyksXG4gICAgcG9ydGZvbGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fcG9ydGZvbGlvJyksXG4gICAgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3VzZXInKTtcblxuICB2YXIgX21vdmUgPSBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XG4gICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJScsXG4gICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwgJyArIHN0cmFmZSArICcsIDApJyxcbiAgICAgIHN0eWxlID0gYmxvY2suc3R5bGU7XG5cbiAgICBpZiAod2luZG93U2Nyb2xsIDwgd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG5cbiAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xuICAgICAgX21vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcbiAgICAgIGlmIChwb3J0Zm9saW8gIT09IG51bGwpIHtcbiAgICAgICAgX21vdmUocG9ydGZvbGlvLCB3U2Nyb2xsLCAyMCk7XG4gICAgICB9O1xuICAgICAgX21vdmUodXNlciwgd1Njcm9sbCwgMyk7XG4gICAgfVxuXG4gIH1cblxufSkoKTsiLCIvLyDQkNCd0JjQnNCQ0KbQmNCvINCY0JrQntCd0J7QmiDQodCa0JjQm9Ce0JJcbnZhciBTa2lsbHMgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsJyksXG4gICAgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaXJjbGUtc2Vjb25kJyksXG4gICAgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gIC8vINCy0YvRh9C40YHQu9GP0LXQvCDQtNC70LjQvdGDINC+0LrRgNGD0LbQvdC+0YHRgtC4XG4gIHZhciBjaXJjbGVMZW5ndGggPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgdmFyIGNpcmNsZVJhZGl1cyA9IGNpcmNsZS5nZXRBdHRyaWJ1dGUoJ3InKSxcbiAgICAgIGNpcmNsZUxlbmd0aCA9IDIgKiBNYXRoLlBJICogY2lyY2xlUmFkaXVzO1xuXG4gICAgcmV0dXJuIGNpcmNsZUxlbmd0aDtcbiAgfTtcblxuICAvLyDQv9GA0LjQvNC10L3Rj9C10Lwg0Log0L7QutGA0YPQttC90L7RgdGC0Lgg0YHQstC+0LnRgdGC0LLQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuICBbXS5zbGljZS5jYWxsKGNpcmNsZXMpLmZvckVhY2goZnVuY3Rpb24gKGNpcmNsZSkge1xuXG4gICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBjaXJjbGVMZW5ndGgoY2lyY2xlKTtcbiAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XG5cbiAgfSk7XG5cbiAgLy8g0YTRg9C90LrRhtC40Y8g0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINC+0LrRgNGD0LbQvdC+0YHRgtC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDQv9GA0L7RhtC10L3RgtC+0LJcbiAgdmFyIGNpcmNsZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChza2lsbCkge1xuXG4gICAgdmFyIGNpcmNsZUZpbGwgPSBza2lsbC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlLXNlY29uZCcpLFxuICAgICAgc2tpbGxQZXJjZW50ID0gc2tpbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmNlbnQnKSxcbiAgICAgIGxlbmd0aCA9IGNpcmNsZUxlbmd0aChjaXJjbGVGaWxsKSxcbiAgICAgIHBlcmNlbnQgPSBsZW5ndGggKiAoMTAwIC0gc2tpbGxQZXJjZW50KSAvIDEwMDtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgY2lyY2xlRmlsbC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gcGVyY2VudDtcbiAgICAgIGNpcmNsZUZpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xuXG4gICAgICBpZiAoc2tpbGxQZXJjZW50IDwgNTApIHtcbiAgICAgICAgc2tpbGwuc3R5bGUub3BhY2l0eSA9IDAuNDtcbiAgICAgICAgc2tpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xuICAgICAgfVxuICAgIH0sIDUwMCk7XG5cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdyb3c6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgW10uc2xpY2UuY2FsbChza2lsbHMpLmZvckVhY2goZnVuY3Rpb24gKHNraWxsKSB7XG5cbiAgICAgICAgdmFyIGNpcmNsZVJlY3QgPSBza2lsbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBjaXJjbGVQb3MgPSBjaXJjbGVSZWN0LmJvdHRvbSxcbiAgICAgICAgICBzdGFydEFuaW1hdGlvbiA9IGNpcmNsZVBvcyAtIHdpbmRvd0hlaWdodDtcblxuICAgICAgICBpZiAoc3RhcnRBbmltYXRpb24gPD0gMCkge1xuICAgICAgICAgIGNpcmNsZUFuaW1hdGlvbihza2lsbCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbn0pKCk7IiwidmFyIFNsaWRlciA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBpdGVtcyA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsICcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxuICAgIGluZGV4ID0gMSxcbiAgICBuZHgsXG4gICAgZHVyYXRpb24gPSA1MDAsXG4gICAgdGl0bGUgPSAkKCcud29ya19fdGl0bGUnKSxcbiAgICBza2lsbHMgPSAkKCcud29ya19fdGVjaG5vbG9neScpLFxuICAgIGltZ0NvbnRhaW5lciA9ICQoJy53b3JrX19waWMnKTtcblxuICBmdW5jdGlvbiBfaW5pdCgpIHtcbiAgICB2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcbiAgICAgIGltZ1NyYyA9IGFjdGl2ZUl0ZW0uZmluZCgnaW1nJykuYXR0cignc3JjJyksXG4gICAgICBhY3RpdmVUaXRsZSA9IGFjdGl2ZUl0ZW0uZGF0YSgndGl0bGUnKSxcbiAgICAgIGFjdGl2ZVNsaWxsID0gYWN0aXZlSXRlbS5kYXRhKCd0ZWNobm9sb2d5Jyk7XG5cbiAgICBpbWdDb250YWluZXIuYXR0cignc3JjJywgaW1nU3JjKTtcbiAgICB0aXRsZS50ZXh0KGFjdGl2ZVRpdGxlKTtcbiAgICBza2lsbHMudGV4dChhY3RpdmVTbGlsbCk7XG5cbiAgICB2YXIgbmV4dEl0ZW0gPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X25leHQnKS5lcShpbmRleCArIDEpO1xuICAgIG5leHRJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XG4gICAgdmFyIHByZXZJdGVtID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9wcmV2JykuZXEoaW5kZXggLSAxKTtcbiAgICBwcmV2SXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pIHtcbiAgICB2YXIgbmV4dEl0ZW1zID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgY29udGFpbmVyKSxcbiAgICAgIGN1cnJlbnRJdGVtID0gbmV4dEl0ZW1zLmZpbHRlcignLndvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKSxcbiAgICAgIHJlcUl0ZW0gPSBuZXh0SXRlbXMuZXEobmR4KTtcbiAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09ICd1cCcgPyAtMTAwIDogMTAwO1xuXG4gICAgY3VycmVudEl0ZW0uYW5pbWF0ZSh7XG4gICAgICAndG9wJzogZGlyZWN0aW9uICsgJyUnXG4gICAgfSwgZHVyYXRpb24pO1xuXG4gICAgcmVxSXRlbS5hbmltYXRlKHtcbiAgICAgICd0b3AnOiAwXG4gICAgfSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGN1cnJlbnRJdGVtLnJlbW92ZUNsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50JykuY3NzKCd0b3AnLCAtZGlyZWN0aW9uICsgJyUnKTtcbiAgICAgIHJlcUl0ZW0uYWRkQ2xhc3MoJ3dvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKTtcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gX21vdmVOZXh0KCkge1xuICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxuICAgICAgZGlyZWN0aW9uID0gJ3VwJztcblxuICAgIGlmIChpbmRleCA9PSBpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICBuZHggPSAwO1xuICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XG4gICAgICBuZHggPSBpdGVtcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZHggPSBpbmRleCArIDE7XG4gICAgfVxuXG4gICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gX21vdmVQcmV2KCkge1xuICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfcHJldicpLFxuICAgICAgZGlyZWN0aW9uID0gJ2Rvd24nO1xuXG4gICAgaWYgKGluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgbmR4ID0gMDtcbiAgICB9IGVsc2UgaWYgKGluZGV4IDw9IDApIHtcbiAgICAgIG5keCA9IGl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5keCA9IGluZGV4IC0gMTtcbiAgICB9XG5cbiAgICBhbmltYXRlU2xpZGUobmR4LCBjb250YWluZXIsIGRpcmVjdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBfc2xpZGVTaG93KCkge1xuICAgIHZhciBmYWRlZE91dCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgIGxvYWRlZCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgIG5leHRTcmMgPSBpdGVtcy5lcShpbmRleCkuZmluZCgnaW1nJykuYXR0cignc3JjJyksXG4gICAgICBuZXh0VGl0bGUgPSBpdGVtcy5lcShpbmRleCkuZGF0YSgndGl0bGUnKSxcbiAgICAgIG5leHRTa2lsbHMgPSBpdGVtcy5lcShpbmRleCkuZGF0YSgndGVjaG5vbG9neScpO1xuXG4gICAgX21vdmVOZXh0KCk7XG4gICAgX21vdmVQcmV2KCk7XG5cbiAgICBpbWdDb250YWluZXIuZmFkZU91dChmdW5jdGlvbiAoKSB7XG4gICAgICB0aXRsZS5zbGlkZVVwKCk7XG4gICAgICBza2lsbHMuZmFkZU91dCgpO1xuICAgICAgZmFkZWRPdXQucmVzb2x2ZSgpO1xuICAgIH0pO1xuXG4gICAgZmFkZWRPdXQuZG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICB0aXRsZS50ZXh0KG5leHRUaXRsZSk7XG4gICAgICBza2lsbHMudGV4dChuZXh0U2tpbGxzKTtcbiAgICAgIGltZ0NvbnRhaW5lci5hdHRyKCdzcmMnLCBuZXh0U3JjKS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9hZGVkLnJlc29sdmUoKTtcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBsb2FkZWQuZG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICB0aXRsZS5zbGlkZURvd24oKTtcbiAgICAgIHNraWxscy5mYWRlSW4oKTtcbiAgICAgIGltZ0NvbnRhaW5lci5mYWRlSW4oKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdDogX2luaXQsXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAkKCcudG9nZ2xlX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0b2dnbGVfX2xpbmtfbmV4dCcpKSB7XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfSBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0b2dnbGVfX2xpbmtfcHJldicpKSB7XG4gICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgaW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgX3NsaWRlU2hvdygpO1xuXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSlcbigpOyIsInZhciBwcmVsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcicpO1xuXG5pZiAocHJlbG9hZCAhPT0gbnVsbCkgUHJlbG9hZGVyLmluaXQoKTtcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAvL01BSU4gUEFSQUxBWFxuICB2YXIgcGFyYWxheCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXJhbGF4Jyk7XG5cbiAgaWYgKHBhcmFsYXggIT09IG51bGwpIHtcbiAgICBNYWluUGFyYWxheC5pbml0KCk7XG4gIH1cbiAgLy9cbiAgLy8gY29uc29sZS5sb2cocGFyYWxheCk7XG5cblxuICAvL0ZMSVAgQ0FSRFxuICB2YXIgYXV0aEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoLWJ1dHRvbicpLFxuICAgIHdlbGNvbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJldHVybicpO1xuXG4gIGlmIChhdXRoQnRuICE9PSBudWxsKSB7XG4gICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIEZsaXAuYXV0aCgpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKHdlbGNvbWVCdG4gIT09IG51bGwpIHtcbiAgICB3ZWxjb21lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgRmxpcC53ZWxjb21lKCk7XG4gICAgfSk7XG4gIH1cblxuICAvL0JVUkdFUk1FTlVcbiAgdmFyIGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyLWJ0bicpO1xuXG4gIGlmIChidXJnZXJNZW51ICE9PSBudWxsKSB7XG4gICAgYnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIE1lbnUudG9nZ2xlKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8vQkxVUlxuICB2YXIgYmx1ckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpO1xuXG4gIGlmIChibHVyRm9ybSAhPT0gbnVsbCkge1xuICAgIEJsdXIuc2V0KCk7XG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgQmx1ci5zZXQoKTtcbiAgICB9O1xuICB9XG5cblxuICB2YXIgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcblxuICBpZiAoZm9ybSAhPT0gbnVsbCkge1xuICAgIC8v0L7Rh9C40YHRgtC60LAg0L7RiNC40LHQutC4XG4gICAgdmFyIGlucHV0cyA9IGZvcm0uZWxlbWVudHM7XG4gICAgdmFyIGNsb3NlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtZXJyb3ItY2FwdGNoYV9fY2xvc2UnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbnB1dHNbaV0ub25mb2N1cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnaW5wdXQtZ3JvdXBfZXJyb3InKSkge1xuICAgICAgICAgIFZhbGlkYXRpb24uY2xlYXIodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2xvc2VFcnJvciAhPT0gbnVsbCkge1xuICAgICAgY2xvc2VFcnJvci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsb3NlRXJyb3IucGFyZW50Tm9kZS5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgdmFsaWQgPSBWYWxpZGF0aW9uLmluaXQoZm9ybSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKHZhbGlkKTtcbiAgICB9KVxuICB9XG5cblxuICAvL1NDUk9MTCBQQUdFXG4gIHZhciBzY3JvbGxMaW5rRG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtbGlua19kb3duJyk7XG4gIHZhciBzY3JvbGxMaW5rVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWxpbmtfdXAnKTtcblxuICBpZiAoc2Nyb2xsTGlua0Rvd24gIT09IG51bGwpIHtcbiAgICBzY3JvbGxMaW5rRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIFNjcm9sbFBhZ2UuZG93bih0aGlzKTtcbiAgICB9KVxuICB9XG4gIGlmIChzY3JvbGxMaW5rVXAgIT09IG51bGwpIHtcbiAgICBzY3JvbGxMaW5rVXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBTY3JvbGxQYWdlLnVwKHRoaXMpO1xuICAgIH0pXG4gIH1cblxuICAvL1NMSURFUlxuICB2YXIgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtfX3NsaWRlcicpO1xuXG4gIGlmIChzbGlkZXIgIT09IG51bGwpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgLy8gU2xpZGVyLmluaXQoKTtcbiAgICAgIFNsaWRlci5pbml0KCk7XG4gICAgICBTbGlkZXIubW92ZSgpO1xuICAgIH0pKCk7XG4gIH1cblxuICAvL0hFQURFUiBQQVJBTEFYICYgU0tJTExTXG4gIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2JnJyksXG4gICAgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsJyksXG4gICAgYmxvZ1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jb250YWluZXInKTtcblxuICAvLyDQktCr0JfQntCSINCk0KPQndCa0KbQmNCvINCf0J4g0KHQmtCg0J7Qm9Cb0KMg0KHQotCg0JDQndCY0KbQq1xuICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgIGlmIChiZyAhPT0gbnVsbCkge1xuICAgICAgSGVhZGVyUGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcbiAgICB9XG5cbiAgICBpZiAoc2tpbGxzICE9PSBudWxsKSB7XG4gICAgICBTa2lsbHMuZ3JvdygpO1xuICAgIH1cblxuICAgIGlmIChibG9nV3JhcHBlciAhPT0gbnVsbCkge1xuICAgICAgQmxvZ01lbnUuaW5pdCgpO1xuICAgICAgQmxvZ01lbnUuaW5pdEFjdGl2ZSgpO1xuICAgIH1cblxuICB9O1xuXG4gIHZhciBzaWRlTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlbWVudS1idG4nKTtcblxuICBpZiAoc2lkZU1lbnUgIT09IG51bGwpIHtcbiAgICBzaWRlTWVudS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgQmxvZ01lbnUudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIEJsb2dNZW51LmluaXQoKTtcbiAgfVxuXG5cbn07Il19
