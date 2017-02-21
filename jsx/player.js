// spelarens information
module.exports = class Player {
  constructor(id, name){
    this.name = name || "unnamed";
    this.pairs = [];
    this.id = id;
  }
  // ge spelaren ett par
  givePair(id){
    this.pairs.push(id);
  }
};
