var Turn = require('./turn');
var Cards = require('./cards');
var Card = require('./card');
var Player = require('./player');

// klassen som håller koll på hela spelet
module.exports = class Game {
  constructor(playerCount, cardCount, images) {
    // när spelet är busy kan man inte vända kort
    this.busy = false;

    // skapar spelare
    this.players = [];
    this.addPlayers(playerCount);

    // skapar alla kort och blandar dem
    this.cards = new Cards();
    this.generateCards(cardCount, images);
    this.cards.shuffle(3);

    // skapar en tur
    this.currentTurn = new Turn(this.players[0]);
  }

  addPlayers(playerCount) {
    for (let i = 0; i < playerCount; i++) {
      this.players.push(new Player(i, "Player " + (i+1)));
    }
  }

  // genererar kort och ger dem idn och bilder
  generateCards(cardCount, images) {
    for (let i = 0; i < cardCount/2; i++) {
      for (let n = 0; n < 2; n++) {
        this.cards.add(new Card(i*2+n, i, images[i]));
      }
    }
  }

  //avslutar turen och gör en ny åt nästa spelare
  nextTurn() {
    var lastPlayer = this.currentTurn.player.id;
    var nextPlayer = 0;
    if (lastPlayer < this.players.length - 1)
      nextPlayer = lastPlayer + 1;
    this.currentTurn.end();
    this.currentTurn = new Turn(this.players[nextPlayer]);
  }

  // sätter busy från andra komponenter
  setBusy(busy){
    this.busy = busy;
  }

  // kollar om ett klick på ett kort är giltigt, beroende på om spelet är
  // upptaget eller om kortet redan är vänt
  validClick(card){
    if (card.flipped)
      return false;

    if (this.busy)
      return false;

    return true;
  }

  // kallas utifrån när man väljer på ett kort, returnerar info om klicket
  click(card, callback) {
    if (this.validClick(card)) {
      var clickResponse = this.currentTurn.go(card, callback, this.setBusy.bind(this));
      if (clickResponse.nextPlayer)
        this.nextTurn();
      return clickResponse;
    }
    return false;
  }
};
