/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {


function renderTweets(tweets) {
  $('.all-tweets').empty();
  tweets.forEach(function(tweet) {
      $('.all-tweets').prepend(createTweetElement(tweet));
    });
}

var createTweetElement = (tweetData) => {
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
    <p class="time">${tweetData.created_at} days ago</p>
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

$("#newTweet").submit((event) => {
event.preventDefault();

console.log("inside submit");
  $.ajax ({
      method: "POST",
      url: "/tweets",
      data: $("#newTweet").serialize(),
      success: (response) => {
        loadTweets()
        $("#newTweet")[0].reset();
        $(".counter").text("140");
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
  $(".new-tweet").slideToggle();
  $('textarea').select();
});

});
