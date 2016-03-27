$(document).ready(function(){

  $( ".menu-button" ).click(function() {
    $(".menu").addClass("open");
    $(".menu-button").addClass("dn");
    $(".menu-remove").removeClass("dn");
});

  $(".menu-remove").click(function(){
    $(".menu").removeClass("open");
    $(".menu-button").removeClass("dn");
    $(".menu-remove").addClass("dn");
  });

  $(".projects li").click(function(){
    var projectClass = $(this).attr("class");
    if(projectClass == "Holstee") {
      $(".holstee-description").addClass("open");
    }
    else if (projectClass == "Resume") {
      $(".resume-description").addClass("open");
    }
    else {
      $(".alice-description").addClass("open");
    }
    $(".modal-close").addClass("open");

  });
  $(".modal-close").click(function(){
    $(".modal").removeClass("open");
    $(".modal-close").removeClass("open");
  });

  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });



});
