/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

//function to calculate milliseconds into time since post
function timeSince(date) {
var seconds = Math.floor((new Date() - date) / 1000);
var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
      return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
      return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
      return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
      return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
      return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

//function to add tweets to database
function renderTweets(tweets) {
  $('.all-tweets').empty(); //prevents from readding all previous tweets
  tweets.forEach(function(tweet) {
      $('.all-tweets').prepend(createTweetElement(tweet)); //add to beginning of DB
    });
}

var createTweetElement = (tweetData) => { //create tweet to article HTML
    var date = timeSince(tweetData.created_at); //changes date format
    var tweet_html =
    `<article class="tweet">
    <header>
<img class="avatar" src="${tweetData.user.avatars.regular}" alt="avatar">
    </img>
    <span class="userName">
       <h1> ${tweetData.user.name}</h1>
    </span>
    <p class="handle">
      ${tweetData.user.handle}
    </p>
    </header>
<div class ="tweet">
    <p class="content">
      ${tweetData.content.text}
    </p>
</div>
    <footer>
    <p class="time">${date} ago</p>
              <img class="likes" src="/images/flag.png">
              <img class="likes" src="/images/retweet.png">
              <img class="likes" src="/images/heart.png">
    </footer>
    </article>`;
    return tweet_html;
};

//Ajax Submit Form

const handleError = (method) => {
			return (err) => {
				console.debug(method, err);
			}
		}

$("#newTweet").submit((event) => { //on submit of newTweet buttom
event.preventDefault();

  $.ajax ({
      method: "POST",
      url: "/tweets",
      data: $("#newTweet").serialize(),
      success: (response) => {
        loadTweets() //loads new tweets with refresh
        $("#newTweet")[0].reset(); //resets container to empty
        $(".counter").text("140"); //resets counter to 140
        }
      });
    //fail: handleError('submitTweet')
  });


var loadTweets = () => {
  $.ajax({
      method: 'GET',
      url: "/tweets",
      dataType: 'json',
      success: (response) => {
        renderTweets(response)
      },
      fail: handleError('loadTweets')
  })
}

loadTweets();

$('#compose').on("click", () => {
  $(".new-tweet").slideToggle(); //on click toggles new tweet section into view
  $('textarea').select(); //autoselects text area
});

});
