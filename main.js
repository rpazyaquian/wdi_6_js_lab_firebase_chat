// create App

var App = {};

// create firebase reference


App.firebase = new Firebase('https://blazing-heat-1056.firebaseio.com/web/data/chat');

App.posts = App.firebase.child('posts');

// 1. add the data
// 2. get the updated data
// 3. translate the data, and render/map/process

App.pushMessage = function(message) {
  App.posts.push({
    message: message
  });
}

App.sendMessage = function(e) {
  var message = $('#chat-message').val();
  App.pushMessage(message);
  $('#chat-message').val('');
}

App.renderPost = function(post) {
  // console.log(post.message);

}

$(document).ready(function() {

  $('#chat-submit').click(App.sendMessage);

  // i want to: render all messages
  App.posts.on('child_added', function(snapshot) {
    var post = snapshot.val();
    App.renderPost(post);
  });

});