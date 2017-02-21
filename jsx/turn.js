// klass för en tur, fram till spelaren får två kort som inte är lika.
module.exports = class Turn {
  constructor(player) {
    // sätter spelarens status till spelande
    player.current = true;

    // turens egenskaper
    this.player = player;
    this.selectedCards = [];
  }

  // funktionen som körs när man klickar på ett kort
  go(card, callback, setBusy){
    var state = {
      done: false,
      nextPlayer: false,
      turnBack: false,
      pairId: false
    };

    // lägger till kortet i valda kort
    this.selectedCards.push(card);

    // kolla efter par om man har två kort uppvända
    if (this.selectedCards.length === 2) {
      this.checkPair(state, setBusy);
    }

    // vänta två sekunder och skicka vilka kort som ska vändas tillbaka
    setTimeout(() => {
      if (state.turnBack) setBusy(false);
      callback({turnBack: state.turnBack});
    },
      2000
    );

    return state;
  }

  // kollar om spelaren fick par
  checkPair(state, setBusy) {
    setBusy(true);
    state.done = true;

    // kolla om det är ett par och vänd tillbaka om det inte är det
    if (this.isPair()) {
      this.givePair(state, setBusy);
    } else {
      this.turnBack(state);
    }

    this.selectedCards = []; // ta bort valda kort eftersom spelaren valt två
  }

  isPair() {
    return this.selectedCards[0].id === this.selectedCards[1].id;
  }

  // säger att nästa spelare ska spela och att valda korten ska vändas tillbaka
  turnBack(state) {
    state.nextPlayer = true;
    state.turnBack = this.selectedCards.map((selectedCard) => {
      return selectedCard.uid;
    });
  }

  // ger ett par till en spelare och ser till så spelaren får spela igen
  givePair(state, setBusy) {
    state.nextPlayer = false;
    state.pairId = this.selectedCards[0].id;
    this.player.givePair({
      id: this.selectedCards[0].id,
      image: this.selectedCards[0].image
    });
    setBusy(false);
  }

  // avslutar turen
  end() {
    this.player.current = false;
  }
};
