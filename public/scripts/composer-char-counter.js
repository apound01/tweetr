$(document).ready(function() {
  $(".new-tweet textarea").keyup(function(){
  var count = $("#count")
  var characters = $(this).val().length;
  if (characters >= 140) {
    count.addClass('over');
  } else {
    count.removeClass('over');
  }
count.text(140 - characters)
  });
});
