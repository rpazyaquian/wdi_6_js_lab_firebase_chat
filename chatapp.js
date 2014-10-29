var ChatApp = {};

ChatApp.firebase = new Firebase('https://blazing-heat-1056.firebaseio.com/web/data/chat');

ChatApp.posts = ChatApp.firebase.child('posts');

ChatApp.pushMessage = function(message) {
  ChatApp.posts.push({
    message: message
  });
}

ChatApp.sendMessage = function(e) {
  var message = $('#chat-message').val();
  ChatApp.pushMessage(message);
  $('#chat-message').val('');
}

ChatApp.renderPost = function(post) {
  $('#chat-messages').append('<li>'+post.message+'</li');
}

$(document).ready(function() {

  $('#chat-submit').click(ChatApp.sendMessage);

  // i want to: render all messages
  ChatApp.posts.on('child_added', function(snapshot) {
    var post = snapshot.val();
    ChatApp.renderPost(post);
  });

});