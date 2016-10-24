$(document).ready(function() {
  $(".new-tweet textarea").keyup(function(){
  var count = $("#count")
  var error = $("h5")
  var characters = $(this).val().length; //calculates length
  if (characters >= 140) {
    count.addClass('over'); //add class over to turn counter red when over 140
    error.addClass('toolong'); // makes error message visible
    document.getElementById("submit").disabled = true; //diables tweet button when too long
  } else {
    count.removeClass('over');
    error.removeClass('toolong');
    document.getElementById("submit").disabled = false;

  }
count.text(140 - characters) // count down from 140
  });
});
