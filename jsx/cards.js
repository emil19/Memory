// kortens lista
module.exports = class Cards {
  constructor() {
    this.cards = [];
  }

  add(card){
    this.cards.push(card);
  }

  // blandar korten med en random sortering, kan blanda flera gånger.
  shuffle(times){
    times = times || 1;
    for (let i = 0; i < times; i++) {
      this.cards.sort(sort);
    }
  }
};

let sort = () => 0.5 - Math.random();
