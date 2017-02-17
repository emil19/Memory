module.exports = class Cards {
  constructor() {
    this.cards = [];
  }
  add(card){
    this.cards.push(card);
  }
  shuffle(){
    this.cards.sort(()=>{
      return 0.5 - Math.random();
    });
  }
};
