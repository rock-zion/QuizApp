var msg = document.getElementById('scoremessage')
var displayScore = document.getElementById('userscore');
var scoreImage = document.getElementById('happyimage')
var highscoreURL = new URL(window.location.href);
console.log(highscoreURL.searchParams.get('score'));
displayScore.innerHTML = highscoreURL.searchParams.get('score')+"/10";
scoreImage.src = highscoreURL.searchParams.get('image');
msg.innerHTML = highscoreURL.searchParams.get('msg');
console.log("this is",highscoreURL.searchParams.get('msg'))