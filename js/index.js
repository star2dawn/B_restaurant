(function($,window){


  const Rest = {

    init(){
      this.header();
      this.section6();
      this.section7();
      this.section10();
    },
    header(){
      const $window  = $(window);
      const $Top = $('#header').offset().top;
      const $Header = $('#header');

      $window.scroll(function(){
        if($window.scrollTop() >= $Top+1){
          $Header.addClass('on');
        }
        else{
          $Header.removeClass('on');
        }
      })
    },
    section6(){

      const $bg2 = $('#section6 .bg2');
      const $menu = $('#section6 .menu');

      $menu.on({
        mouseenter(){
          $(this).find('.bg2').stop().fadeIn(300);
        },

        mouseleave(){
          $(this).find('.bg2').stop().fadeOut(300);

        }
      })

    },
    section7(){

      const $chef = $('#section7 .chef');

      $chef.on({
        mouseenter(){
          $(this).find('.explain').stop().fadeIn(300);
        },

        mouseleave(){
          $(this).find('.explain').stop().fadeOut(300);

        }
      })
    },
    section10(){

      let cnt = 0;
      let setId = 0;

      const  $section10       = $('#section10');
      const  $slideContainer  = $('#section10 .slide-container');
      const  $slideWrap       = $('#section10 .slide-wrap');
      const  n                = $('#section10 .slide').length-2;
      const  $prevBtn         = $('#section10 .prev-btn');
      const  $nextBtn         = $('#section10 .next-btn');


      mainSlide();  //로딩시 실행

      //1. 메인슬라이드 함수
      function mainSlide(){
         $slideWrap.stop().animate({ left:`${ -100*cnt}%` }, 600, 'easeInOutExpo', function(){
            if(cnt>=n) {cnt=0;}
            if(cnt<=-1) {cnt=n-1;}
            $slideWrap.stop().animate({ left:`${ -100*cnt}%` }, 0); //fowrords + backwrords = both
         })

      }

      //2. 다음카운트 함수
      function nextCount(){
         cnt++;
         mainSlide();
      }
      //2. 이전카운트 함수
      function prevCount(){
         cnt--;
         mainSlide();
      }

      //3. 자동타이머 함수
      function autoTimer(){
         clearInterval(setId);
         setId = setInterval(nextCount, 3000); 
      }
      autoTimer();

      $slideContainer.on({
        mouseenter: function(){
           clearInterval(setId);                  
        },
        mouseleave: function(){
           autoTimer();
        }
     });  

     $prevBtn.on({
      click: function(e){
        e.preventDefault();
         if( $slideWrap.is(':animated')===false ){
            prevCount();
         }
      }
   });
   $nextBtn.on({
    click: function(e){
      e.preventDefault();
      if( $slideWrap.is(':animated')===false ){
         nextCount(); //다음카운트함수 호출
      }                
      }
   });

            // 터치스와이프 & 드래그앤 드롭
            // 5. 터치스와이프
            let touchS = null;
            let touchE = null;

            // 6. 드래그앤 드롭(잡고끌기 그리고 놓기)
            let mouseD = false; 
            let dragS = null;
            let dragE = null;
            let winW = $(window).width();
            let conW = $slideContainer.width(); 


            // 데스크탑
            // 드래그앤드롭 터치스와이프는 컨테이너로 하고
            $slideContainer.on({
               mousedown(e){  // 터치시작
                  clearInterval(setId);
                  winW = $(window).width();
                  conW = $slideContainer.width(); // 터치할 때마다 창너비를 가져와서 변수에 저장
                  touchS = e.clientX; // 터치 시작

                  mouseD = true;       // 드래그 시작(마우스 다운 인경우만 실행)
                  // dragS = e.clientX - $slideWrap.offset().left-conW + ((창너비-슬라이드너비)/2);  //  좌표값 - 슬라이드.offset().left-1903
                  dragS = e.clientX - $slideWrap.offset().left - conW + ((winW-conW)/2);  //  좌표값 - 슬라이드.offset().left-1903
               },         
               mouseup(e){   // 터치끝
                  touchE = e.clientX;

                  if( touchS - touchE > 0 ){ //다음 슬라이드
                     if( !$slideWrap.is(':animated') ){
                        nextCount();
                     }               
                  }
                  if( touchS - touchE < 0 ){ //이전 슬라이드
                     if( !$slideWrap.is(':animated') ){
                        prevCount();
                     }               
                  }
                  mouseD = false;    // 드래그 끝(마우스 업 인경우 끝)  
               },
               mousemove(e){
                  if(!mouseD) return;

                  // 마우스 좌우 이동하는걸 마우스무브라한다.
                  // 반드시 마우스 다운했을 때만 마우스무브 가 작동
                  // 메인슬라이드를 마우스로 잡고 끌고 놓기(드래그앤드롭)
                  dragE = e.clientX;
                  $slideWrap.css({ left : dragE-dragS });
                  // 200픽셀 이하의 드래그는 동작안함
                  // -      200
                  // 부호 절대값 Math.abs()
                  if(Math.abs(touchS - touchE) < 100){
                     mainSlide();
                  }
               },
               mouseleave(e){ // 마우스리브를 마우스 아웃으로 간주한다.
                  if(!mouseD) return;

                  touchE = e.clientX;
                  if( touchS - touchE > 0 ){ //다음 슬라이드
                     if( !$slideWrap.is(':animated') ){
                        nextCount();
                     }               
                  }

                  if( touchS - touchE < 0 ){ //이전 슬라이드
                     if( !$slideWrap.is(':animated') ){
                        prevCount();
                     }               
                  }
                  mouseD = false;    // 드래그 끝(마우스 업 인경우 끝)  
               }
            });

            // 태블릿 & 모바일: 핑거링(손가락) 이벤트 => 터치이벤트
            // 드래그앤드롭 터치스와이프는 컨테이너로 하고
            $slideContainer.on({
               touchstart(e){  // 터치시작
                  clearInterval(setId);

                  winW = $(window).width();
                  conW = $slideContainer.width(); // 터치할 때마다 창너비를 가져와서 변수에 저장
                  touchS = e.originalEvent.changedTouches[0].clientX; // 터치 시작

                  mouseD = true;       // 드래그 시작(마우스 다운 인경우만 실행)
                  dragS = e.clientX - $slideWrap.offset().left - conW + ((winW-conW)/2);  //  좌표값 - 슬라이드.offset().left-1903

               },         
               touchend(e){   // 터치끝
                  touchE = e.originalEvent.changedTouches[0].clientX;
                  if( touchS - touchE > 0 ){ //다음 슬라이드
                     if( !$slideWrap.is(':animated') ){
                        nextCount();
                     }               
                  }
                  if( touchS - touchE < 0 ){ //이전 슬라이드
                     if( !$slideWrap.is(':animated') ){
                        prevCount();
                     }               
                  }
                  mouseD = false;    // 드래그 끝(마우스 업 인경우 끝)  
               },
               touchmove(e){
                  if(!mouseD) return;
                  // 마우스 좌우 이동하는걸 마우스무브라한다.
                  // 반드시 마우스 다운했을 때만 마우스무브 가 작동
                  // 메인슬라이드를 마우스로 잡고 끌고 놓기(드래그앤드롭)
                  dragE = e.originalEvent.changedTouches[0].clientX;
                  $slideWrap.css({ left : dragE-dragS });
                  // 200픽셀 이하의 드래그는 동작안함
                  // -      200
                  // 부호 절대값 Math.abs()
                  if(Math.abs(touchS - touchE) < 100){
                     mainSlide();
                  }
               }

            });
     
    }

  }
  Rest.init();

})(jQuery, window);