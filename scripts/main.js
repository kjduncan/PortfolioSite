$( document ).ready(function() {
    console.log( "ready!" );


    // $(document).ready(function(){
    //   $("#sticker").sticky({topSpacing:0});
    // });
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });

    var navTop = $('.nav')[0].offsetTop;

    $( window ).scroll(function() {

      var navHeight = $('.nav').outerHeight();
      console.log(navHeight);

      if($(document).scrollTop() >= navTop){
        $('.nav').css({'position': 'fixed'});
        $('.section1').css({'margin-bottom': navHeight + 'px'});
      }
      else{
        $('.nav').css({'position': 'static'});
        $('.section1').css({'margin-bottom': 0});
      }
    });

    var rand = Math.floor((Math.random() * 1000) + 1);
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=90s&rating=g&api_key=dc6zaTOxFJmzC&limit=5&offset=" + rand + "");
    xhr.done(function(data) {
      console.log("success got data", data);
      function changeGif(i) {
        console.log(data.data[i].images);
        $('.section1').css({'background-image': 'url("' + data.data[i].images.downsized.url + '")'});

        setTimeout(function(){

          i++;
          if (i > 4) {
            i = 0;
          }
          changeGif(i);
        }, 3000);
      }

      changeGif(0);


    });

});
