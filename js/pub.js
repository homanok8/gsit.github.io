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

   // 메인 페이지 스크롤 이벤트
   $(window).scroll(function() {
      var windowT = $(this).scrollTop();
      var headerHi = $('#header').height() - 20;

      // 메인페이지 일때
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

      // Technology 페이지 일때
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

      // 탑 버튼 on
      if (windowT > 0) {
         $('#aside').stop().fadeIn();
      } else {
         $('#aside').stop().fadeOut();
      }
   });

   // TOP 버튼 클릭 시
   $('#topBtn').click(function() {
      $('html, body').animate({scrollTop: 0}, 300);
   });
});