$(function() {
   // 메뉴 펼치기
   $('#nav').hover(function() {
      $('.lnb').stop().slideDown(200);
   }, function() {
      $('.lnb').stop().slideUp(200);
   });

   let slideCount = 0;
   let slideSize = $('.intro__item').length-1;
   let slideTimer = null;

   // 슬라이드 버튼 클릭 시
   $('#slideBtn').find('button').click(function() {
      let elNum = $(this).index();
      slideCount = elNum;
      $('.slide-btn').stop().removeClass('focus');
      $(this).stop().addClass('focus');
      $('.intro__item').stop().removeClass('focus');
      $('.intro__item').eq(elNum).addClass('focus');
   });

   // 슬라이드 플레이
   function slidePlay() {
      slideTimer = setInterval(function() {
         slideCount == slideSize ? slideCount = 0 : slideCount++;
         $('#slideBtn').find('button').eq(slideCount).trigger('click');
      }, 5000);
   }
   // 슬라이드 정지
   function slideStop() {
      clearInterval(slideTimer);
      slideTimer = null;
   }

   slidePlay();
   // 슬라이드 마우스 오버 시
   $('.intro__rt').hover(function() {
      slideStop();
   }, function() {
      slidePlay();
   });

   // 텍스트 애니메이션
   var textCount = 0;
   var scrollFirst = 0;
   var textSize = $('.plan__item').length - 1;
   var textInterval = null;
   var textSetTime = null;

   function textAnimation() {
      $('.plan__item').eq(textCount).stop().addClass('focus');
      textSetTime = setTimeout(function() {
         $('.plan__item').eq(textCount).stop().removeClass('focus');
         $('.plan__item').eq(textCount).stop().addClass('blur');
      }, 3000);
      textInterval = setInterval(function() {
         if (textCount < textSize) {
            textCount++;
            $('.plan__item').eq(textCount).stop().addClass('focus');
            if (textCount != textSize) {
               textSetTime = setTimeout(function() {
                  $('.plan__item').eq(textCount).stop().removeClass('focus');
                  $('.plan__item').eq(textCount).stop().addClass('blur');
               }, 3000);
            }
         }
         // console.log(textCount);
      }, 4000);

      textSetTime = setTimeout(function() {
         clearInterval(textInterval);
         textInterval = null;
      }, 20500);
   }

   // 메인 페이지 스크롤 이벤트
   $(window).scroll(function() {
      var windowT = $(this).scrollTop();
      var headerHi = $('#header').height() - 20;

      // 메인페이지
      if ($('#main').length) {
         var introT = $('#mainIntro').offset().top - headerHi;
         var techT = $('#mainTech').offset().top - headerHi;
         var cntctT = $('#mainCntct').offset().top - headerHi;

         if (windowT >= 0 && windowT <= introT) {
            $('#logo').attr('src', 'images/logo-white.png');
            $('#nav').stop().removeClass('blk');
         } else if (windowT >= introT && windowT <= techT) {
            $('#logo').attr('src', 'images/logo.png');
            $('#nav').stop().addClass('blk');
         } else if (windowT >= techT && windowT <= cntctT) {
            $('#logo').attr('src', 'images/logo-white.png');
            $('#nav').stop().removeClass('blk');
         } else if (windowT >= cntctT) {
            $('#logo').attr('src', 'images/logo.png');
            $('#nav').stop().addClass('blk');
         }
      }

      // Technology 페이지
      if ($('#technology').length) {
         var contentsT = $('#contents').offset().top - headerHi;

         if (windowT >= contentsT) {
            $('#logo').attr('src', '../../images/logo.png');
            $('#nav').stop().addClass('blk');
         } else {
            $('#logo').attr('src', '../../images/logo-white.png');
            $('#nav').stop().removeClass('blk');
         }
      }

      //Company 페이지
      if ($('#company').length) {
         var workT = $('#work').offset().top - headerHi;
         var planT = $('#plan').offset().top - headerHi;
         var containerT = $('#container').offset().top - headerHi;

         if (windowT >= 0 && windowT <= workT) {
            $('#logo').attr('src', '../../images/logo-white.png');
            $('#nav').stop().removeClass('blk');
         } else if (windowT >= workT && windowT <= planT) {
            $('#logo').attr('src', '../../images/logo.png');
            $('#nav').stop().addClass('blk');
            $('.work__dt').stop().addClass('focus');
            $('.work__dd').stop().addClass('focus');
         } else if (windowT >= planT && windowT <= containerT) {
            $('#logo').attr('src', '../../images/logo-white.png');
            $('#nav').stop().removeClass('blk');
            scrollFirst++;
            if (scrollFirst == 1) {
               textAnimation();
            }
         } else if (windowT >= containerT) {
            $('#logo').attr('src', '../../images/logo.png');
            $('#nav').stop().addClass('blk');
         }
      }

      // 탑 버튼 on
      if (windowT > 0) {
         $('#aside').stop().fadeIn();
      } else {
         $('#aside').stop().fadeOut();
      }

      if ($('#plan').length) {
         var planTT = $('#plan').offset().top - headerHi;
         if (windowT >= planTT) {
            scrollFirst++;
            if (scrollFirst == 1) {
               textAnimation();
            }
         }
      }
   });

   // TOP 버튼 클릭 시
   $('#topBtn').click(function() {
      $('html, body').animate({scrollTop: 0}, 300);
   });

   // history 토글 버튼
   $('.hst__btn').click(function() {
      $(this).find('i').stop().toggleClass('active');
      if ($(this).find('i').hasClass('active')) {
         $(this).next().stop().slideDown();
         $(this).next().css({'display': 'flex'});
      } else {
         $(this).next().stop().slideUp();
      }
   });
   
});