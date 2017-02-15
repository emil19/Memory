var Turn = require('./turn');
var Cards = require('./cards');
var Card = require('./card');
var Player = require('./player');

module.exports = class Game {
  constructor(playerCount, cardCount, images) {

    this.players = [];
    for (var i = 0; i < playerCount; i++) {
      this.players.push(new Player(i, "Player " + (i+1)));
    }

    this.cards = new Cards();

    for (var i = 0; i < cardCount/2; i++) {
      for (var n = 0; n < 2; n++) {
        this.cards.add(new Card(i*2+n, i, images[i]));
      }
    }
    for (var i = 0; i < 3; i++) {
      this.cards.shuffle();
    }

    this.currentTurn = new Turn(this.players[0]);
    //this.previousTurns = [];
  }

  nextTurn() {
    var lastPlayer = this.currentTurn.player.id;
    var nextPlayer = 0;
    if (lastPlayer < this.players.length - 1)
      nextPlayer = lastPlayer + 1;
    console.log(lastPlayer);
    console.log(this.players.length);
    console.log(nextPlayer);

    setTimeout(() => {
      this.currentTurn.end();
      this.currentTurn = new Turn(this.players[nextPlayer]);
      console.log(this.currentTurn);
    }, 2000)
  }

  click(card, callback) {
    var clickResponse = this.currentTurn.go(card, callback);
    if (clickResponse.nextPlayer)
      this.nextTurn();
    return clickResponse;
  }
}
