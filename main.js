// create firebase reference

$(document).ready(function() {

  var firebaseRef = new Firebase('https://blazing-heat-1056.firebaseio.com/web/data/chat');

  var postsRef = firebaseRef.child('posts');

  // 1. add the data
  // 2. get the updated data
  // 3. translate the data, and render/map/process

  // i want to: send a message
  $('#chat-submit').click(sendMessage);

  var sendMessage = function(e) {
    var text = $('#chat-message').val();
    pushMessage(text);
    $('#chat-message').val('');
  }

  var push

  // i want to: render all messages
  postsRef.on('child_added', function(snapshot) {
    renderPosts(snapshot.val());
  });

});