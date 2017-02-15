module.exports = class Turn {
  constructor(player) {
    player.current = true;
    this.player = player;
    this.selectedCards = [];
    this.busy = false;
  }
  go(card, callback){
    var done = false,
    nextPlayer = false,
    turnedCard = false,
    turnBack = false,
    pairId = false;

    if (this.validClick(card)) {
      turnedCard = true;
      this.selectedCards.push(card);

      if (this.selectedCards.length === 2) {
        this.busy = true;

        // kolla om det är ett par
        if (this.isPair()) {
          done = true;
          nextPlayer = false;
          pairId = card.id;
          this.player.givePair({
            id: card.id,
            image: card.image
          });

          this.busy = false;
        } else {
          done = true;
          nextPlayer = true;
          turnBack = this.selectedCards.map((selectedCard) => {
            return selectedCard.uid;
          });
        }

        this.selectedCards = []; // ta bort valda kort
      }
      setTimeout(() => {
        if (turnBack) this.busy = false;
        callback({turnBack});
      },
        2000
      );
    }

    return {done, nextPlayer, turnedCard, pairId};
  }

  end(){
    this.player.current = false;
  }

  isPair(){
    if (this.selectedCards[0].id === this.selectedCards[1].id){
      return true;
    }
    return false;
  }

  validClick(card){
    if (card.flipped)
      return false;

    if (this.busy)
      return false;

    return true;
  }
}
