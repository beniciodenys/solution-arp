$(function () {
  $(".photos__slider").slick({
    initialSlide: 1,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    dots: true,
    prevArrow: $(".photos__slider-prev"),
    nextArrow: $(".photos__slider-next"),
    appendDots: $(".photos__slider-dots"),
    customPaging: function (slider, i) {
      return "";
      // return '<div><div class="photos__slider-dots-item--inactive"/></div><div class="photos__slider-dots-item--active" /></div></div>';
      // return '<div><img src="img/dot-inactive.png" /><img src="img/dot-active.png"/></div>';
    },
    // autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
  });

  $(".news__slider").slick({
    initialSlide: 1,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    dots: true,
    prevArrow: $(".news__slider-prev"),
    nextArrow: $(".news__slider-next"),
    appendDots: $(".news__slider-dots"),
    customPaging: function (slider, i) {
      return "";
    },
    speed: 1000,
    autoplaySpeed: 2000,
  });

  $(".header__burger").on("click", function () {
    $(this).toggleClass("header__burger--active");
  });

  $(window).on("load resize", function () {
    checkWrap(".footer__main-flex-item", "footer__main-flex-item--wrapped");
  });

  function checkWrap(
    className = "flex-item",
    wrappedClassName = className + "--wrapped"
  ) {
    let offset_top_prev;

    $(className).each(function () {
      let offset_top = $(this).offset().top;

      if (offset_top > offset_top_prev) {
        $(this).addClass(wrappedClassName);
      } else if (offset_top == offset_top_prev) {
        $(this).removeClass(wrappedClassName);
      }

      offset_top_prev = offset_top;
    });

    offset_top_prev = null;
  }
});
