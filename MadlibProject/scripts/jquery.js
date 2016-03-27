$( document ).ready(function() {

  var prompts = [
    'Type a city name',
    'Type a verb',
    'Type an object',
    'Type an adjective',
    'Type a feeling',
    'Type a place',
    'Type a plant',
    'Type a color',
    'Type an adjective',


  ];

  var answers = [];

  var currentPrompt = 0;

  var nextPrompt = function() {
    if (currentPrompt != 0) {
      answers.push($('input').val());
    }

    if(currentPrompt < prompts.length) {
      // ($('input').val());
      $('.prompt').html(prompts[currentPrompt] + '<br><input type="text" autofocus>');
        $('input').focus();
        currentPrompt = currentPrompt + 1;
      }
    else {
      showFinal();
    }
}

  var showFinal = function(){
      $('.prompt').html('Once upon a time in <span class="fill">'+answers[0]+'</span> I was <span class="fill">'+answers[1]+'</span>ing because my <span class="fill">'+answers[2]+'</span> was <span class="fill">'+answers[3]+'</span>. So, to make myself feel<span class="fill">'+answers[4]+'</span>, I went to the <span class="fill">'+answers[5]+'</span>. The <span class="fill">'+answers[6]+'</span>s were <span class="fill">'+answers[7]+'</span> and it was a <span class="fill">'+answers[8]+'</span> day.');
    $('button').hide();
  }

  function emptyValue() {
    if($('input').val().length < 1){
        $('input').addClass('error');
        $('input').after('<p class= "error-msg">*Please enter a value.</p>');
        return true;
    }
    else {
      return false;
    }
  }



  $('button').click(function(){
    if (!emptyValue()) {

        nextPrompt();
    }

  });
  $('.prompt').keyup(function (e) {
    if (e.keyCode == 13) {
      if (!emptyValue()) {

          nextPrompt();
      }
    }
  });

  // if($('.answers' < 1)) {
  //   ('.prompt').addClass('error');
  // }
  // else {
  //   ('.promp').removeClass('error');
  // }


  nextPrompt();


});
