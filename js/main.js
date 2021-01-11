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
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 410, //375
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
    let offset_top;

    $(className).each(function () {
      offset_top = $(this).offset().top;

      if (offset_top > offset_top_prev) {
        $(this).addClass(wrappedClassName);
      } else if (offset_top == offset_top_prev) {
        $(this).removeClass(wrappedClassName);
      }

      offset_top_prev = offset_top;
    });

    offset_top_prev = null;
  }

  $(".preventDefault").on("click", function (element) {
    element.preventDefault();
  });

  $(".tariff__form-input").on("change paste keyup", tariff_counter);
  $(".tariff__form-checkbox-radio > input").on("click", tariff_counter);

  function tariff_counter() {
    $(".tariff__val").html('Стоимость: <span id="tariff__val">0.00</span> грн');

    var t_val = document.getElementById("tariff__val");
    var value = 0;

    // alert(($(".tariff__form-input[name=amount]").val()));
    value = Number($(".tariff__form-input[name=amount]").val());

    var counter = 0;
    document
      .querySelectorAll(".tariff__form-checkbox-radio > input")
      .forEach((x) => {
        counter++;
        // alert(x.name + `: ${counter}`);
        if (x.checked) {
          // alert(x.name + `: ${counter}: checked: ${Number(x.value)}`);
          value *= Number(x.value);
        }
      });

    t_val.innerText = value * 600;

    //---------------------
    // alert($(".tariff__form-input[name=area]").val());
    if (
      $(".tariff__form-input[name=area]").val() == "" &&
      $(".tariff__form-input[name=amount]").val() != ""
    ) {
      $(".tariff__val").html("Введите площадь вашего дома");
    } else if (
      $(".tariff__form-input[name=amount]").val() == "" &&
      $(".tariff__form-input[name=area]").val() != ""
    ) {
      $(".tariff__val").html("Введите количество квартир");
    }
  }
});
