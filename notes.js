// create firebase reference

var firebaseRef = new Firebase('https://blazing-heat-1056.firebaseio.com/web/data/chat');

// directories/objects and keys further down the tree:

// directoryRef = firebaseRef.child('path/to/directory');

// note: firebase cannot store arrays.
// "If we try to store an array,
// it really gets stored as an "object"
// with integers as the key names."

// create reference to resource name
// e.g. if we want to create user objects:
var usersRef = firebaseRef.child("users");

// we send a piece of data to that reference
// i.e. our user object

usersRef.set({
  mynameismud: {
    dob: "08/15/1990",
    full_name: "rebecca"
  },
  deadgoddess: {
    dob: "08/24/1990",
    full_name: "roxanne"
  }
});

// so now, if i reload this page, this data should be sent
// to the database on Firebase.

// you could also do:
// usersRef.child('mynameismud').set({data});
// this will trigger one event per set() called on a child.
// Using set() will overwrite the data at the specified location,
// including any child nodes.

// update() merges the sent data into the database,
// rather than outright overwriting it.
// e.g. update({name: "hi"}) will add the field `name`
// if it isn't there, but not touch any other fields.
// set({name: "hi"}) will wipe all data at that point
// and replace it with {name: "hi"}.
// make sure you understand this and BE CAREFUL!

// if you want to know when your data
// has been committed, you can use a callback
// they are anonymous functions set as a second
// parameter in set and update.

// ref.set(data, function(error) {
  // if (error) {
  //   doAThing
  // } else {
  //   doAnotherThing
  // }
// });

// BIG BIG NOTE:
// update only merges data at the first child level.
// data passed in at levels past the first child level
// are committed using set()!
// data may be overwritten!

// how do you save a list of data!?
// you want to use push() for this.

// for example, you may try to save this kind of data:

// {
//   "posts": {
//     "0": {
//       "author": "mynameismud",
//       "text": "butts butts butts"
//     },
//     "1": {
//       // etc
//     },
//     "2": {
//       // etc
//     }
//   }
// }

// but its not a good idea since people might try to write
// to the same post ID number at the same time.

// instead, do something like this:

var postsRef = firebaseRef.child("posts");

var message = {
  author: "mynameismud",
  text: "butts butts butts"
}

postsRef.push(message);
postsRef.push(message);
postsRef.push(message);

// firebase generates a unique ID for each message.
// this prevents the "write at the same time" problem.

// you can refer to a particular post by assigning
// the result of push() to a variable e.g.

// var newPostRef = postsRef.push(newPost);
// var newPostID = newPostRef.name();

// what is a transaction operation???????
// it's good for updating something concurrently
// among all users like a post's upvotes

// var upvotesRef = new Firebase('https://docs-examples.firebaseio.com/android/saving-data/fireblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes');
// upvotesRef.transaction(function (current_value) {
//   return (current_value || 0) + 1;
// });

// We use current_value || 0 to see if the counter is null or hasn't been incremented yet,
// since transactions can be called with null if no default value was written.

