module.exports = class Player {
  constructor(id, name){
    this.name = name || "unnamed";
    this.pairs = [];
    this.id = id;
  }
  givePair(id){
    this.pairs.push(id);
  }
}
