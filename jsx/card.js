module.exports = class Card {
  constructor(uid, id, image) {
    this.uid = uid;
    this.id = id;
    this.image = image;
    this.flipped = false;
  }
};
