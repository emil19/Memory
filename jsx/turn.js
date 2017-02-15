module.exports = class Turn {
  constructor(player) {
    player.current = true;
    this.player = player;
    this.selectedCards = [];
  }
  go(card, callback, setBusy){
    var done = false,
    nextPlayer = false,
    turnBack = false,
    pairId = false;

    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      setBusy(true);

      // kolla om det är ett par
      if (this.isPair()) {
        done = true;
        nextPlayer = false;
        pairId = card.id;
        this.player.givePair({
          id: card.id,
          image: card.image
        });
        setBusy(false);

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
      if (turnBack) setBusy(false);
      callback({turnBack});
    },
      2000
    );

    return {done, nextPlayer, pairId};
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
}
