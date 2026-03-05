
var symbols = ["🐶","🐱","🦊","🐸","🦁","🐧","🦋","🌸"];
//  variable r reset every time startGame() is called.

var flippedCards  = [];    // stores the 1 or 2 cards currently face-up
var moves         = 0;     // counts how many pair attempts the player made
var matchedPairs  = 0;     // counts how many pairs have been found
var canFlip       = true;  // false while waiting 1s after a wrong guess
var seconds       = 0;     // elapsed time in seconds
var timerInterval = null;  // stores the setInterval ID so we can stop it
var gameStarted   = false; // becomes true on the first card click

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j    = Math.floor(Math.random() * (i + 1)); 
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function startGame() {
  flippedCards  = [];
  moves         = 0;
  matchedPairs  = 0;
  canFlip       = true;
  gameStarted   = false;
  seconds       = 0;
  clearInterval(timerInterval);   // stop the timer if it was running

  // Reset what the player sees on screen
  $("#moves").text(0);
  $("#timer").text(0);
  $("#winMessage").hide();
  $("#gameBoard").empty();        // remove all existing cards

  // Make 16 cards: each symbol twice
  var allCards = shuffle(symbols.concat(symbols));

  // Loop through all 16 card values and build a card div for each
  for (var i = 0; i < allCards.length; i++) {
    var $card  = $("<div>").addClass("card").attr("data-symbol", allCards[i]);
    var $inner = $("<div>").addClass("card-inner");
    var $back  = $("<div>").addClass("card-back").text("❓");
    var $front = $("<div>").addClass("card-front").text(allCards[i]);

    // back + front go inside inner, inner goes inside card
    $inner.append($back).append($front);
    $card.append($inner);

    // Listen for clicks on this card
    $card.on("click", onCardClick);

    // Add the finished card to the game board on the page
    $("#gameBoard").append($card);
  }
}
//  $(this) = the card that was just clicked.

function onCardClick() {
  if (!canFlip)                    return;  // board is locked (wrong guess delay)
  if ($(this).hasClass("flipped")) return;  // card is already face-up
  if ($(this).hasClass("matched")) return;  // card is already matched
  if (!gameStarted) {
    gameStarted = true;
    timerInterval = setInterval(function () {
      seconds++;
      $("#timer").text(seconds);
    }, 1000);
  }
  $(this).addClass("flipped");
  flippedCards.push($(this));

  if (flippedCards.length === 2) {
    moves++;
    $("#moves").text(moves);
    checkMatch();
  }
}

function checkMatch() {

  var card1   = flippedCards[0];
  var card2   = flippedCards[1];

  var symbol1 = card1.attr("data-symbol");
  var symbol2 = card2.attr("data-symbol");

  if (symbol1 === symbol2) {

    // MATCH — keep cards face-up, mark them green
    card1.addClass("matched");
    card2.addClass("matched");
    matchedPairs++;
    flippedCards = [];
    canFlip = true;

    if (matchedPairs === symbols.length) {
      clearInterval(timerInterval);  
      $("#winMessage").fadeIn();      
    }

  } else {

    // NO MATCH — lock the board, wait 1 second, flip both cards back
    canFlip = false;

    setTimeout(function () {
      // Removing "flipped" reverses the CSS rotation back to 0deg
      card1.removeClass("flipped");
      card2.removeClass("flipped");
      flippedCards = [];
      canFlip = true;   // unlock the board
    }, 1000);           // 1000ms = 1 second delay
  }
}
startGame();
