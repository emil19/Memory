module.exports = class Turn {
  constructor(player) {
    player.current = true;
    this.player = player;
    this.selectedCards = [];
  }
  go(card, callback, setBusy){
    var state = {
      done: false,
      nextPlayer: false,
      turnBack: false,
      pairId: false
    };

    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      this.checkPair(state, setBusy);
    }
    setTimeout(() => {
      if (state.turnBack) setBusy(false);
      callback({turnBack: state.turnBack});
    },
      2000
    );

    return state;
  }

  checkPair(state, setBusy) {
    setBusy(true);
    state.done = true;

    // kolla om det är ett par
    if (this.isPair()) {
      this.givePair(state, setBusy);
    } else {
      this.turnBack(state);
    }

    this.selectedCards = []; // ta bort valda kort
  }

  turnBack(state) {
    state.nextPlayer = true;
    state.turnBack = this.selectedCards.map((selectedCard) => {
      return selectedCard.uid;
    });
  }

  givePair(state, setBusy) {
    state.nextPlayer = false;
    state.pairId = this.selectedCards[0].id;
    this.player.givePair({
      id: this.selectedCards[0].id,
      image: this.selectedCards[0].image
    });
    setBusy(false);
  }

  end() {
    this.player.current = false;
  }

  isPair() {
    return this.selectedCards[0].id === this.selectedCards[1].id;
  }
};
