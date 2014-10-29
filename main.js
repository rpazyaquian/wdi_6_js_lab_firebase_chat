// create firebase reference

$(document).ready(function() {

  var firebaseRef = new Firebase('https://blazing-heat-1056.firebaseio.com/web/data/chat');

  var postsRef = firebaseRef.child('posts');

  // 1. add the data
  // 2. get the updated data
  // 3. translate the data, and render/map/process

  var sendMessage = function(e) {
    var message = $('#chat-message').val();
    pushMessage(message);
    $('#chat-message').val('');
  }

  var pushMessage = function(message) {
    postsRef.push({
      message: message
    });
  }

  var renderPost = function(post) {
    // console.log(post.message);
  }

  $('#chat-submit').click(sendMessage);

  // i want to: render all messages
  postsRef.on('child_added', function(snapshot) {
    var post = snapshot.val();
    console.log(post.message);
    renderPost(post);
  });

});