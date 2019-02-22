
// LOAD DATA

var friends = require("../data/friends");

// ROUTING

module.exports = function(app) {
  // API GET Requests
  
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  var comparisonUserTotalScore = 0;

  var friendScores = [];


  // API POST Requests
  app.post("/api/friends", function(req, res) {

    // Store current user scores in array.
    var currentUserScores = req.body.scores;

    console.log("Current user scores: " + currentUserScores);

    // Determine the best friend.
    for (var i = 0; i < friends.length; i++) {

      // Convert each user's results in to an array of numbers.
      var comparisonUserScores = friends[i].scores;

      // Find total difference between current user and other users.
      comparisonUserTotalScore = compatibilityScore(currentUserScores, comparisonUserScores);

      // array of compatibility scores.
      friendScores.push(comparisonUserTotalScore);

    }

    console.log("Array of friend scores: " + friendScores);

    var index = 0;
    var value = friendScores[0];

    // Need to get index of lowest score.
    
    for (var i = 0; i < friendScores.length; i++) {
      console.log("Value of item in array: " + friendScores[i]);
      if (friendScores[i] < value) {
        value = friendScores[i];
        index = i;
      }
    }

    console.log("Best friend name: " + friends[index].name);

    
    res.send(friends[index]);

    // Push new user to user array.
    friends.push(req.body);

  });
};

var totalDifference = 0;


function compatibilityScore(currentUserScores, comparisonUserScores) {

  // Reset counter 
  totalDifference = 0;

  for (var i = 0; i < currentUserScores.length; i++) {

    totalDifference+=Math.abs(currentUserScores[i] - comparisonUserScores[i]);
  }

  console.log("Final total difference for friend: " + totalDifference);

  return totalDifference;
};
