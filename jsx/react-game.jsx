var React = require('react');
var Card = require('./react-card');
var Player = require('./react-player');

var Lib = {
  Game: require('./game'),
  Card: require('./card'),
  Cards: require('./cards'),
  Turn: require('./cards'),
}

// räknar ut vilket höjd och bredd layouten ska ha
function calcGridSize(num){
  var sqrt = Math.sqrt(num);
  if ((sqrt % 1) === 0){
    return {x: sqrt, y: sqrt};
  } else {
    var testint = Math.ceil(sqrt);
    while (testint > 0){
      if((num % testint) === 0)
      return {x: num/testint, y: testint};
      testint--;
    }
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);

    this.cardClick = this.cardClick.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.generateHtmlCards = this.generateHtmlCards.bind(this);
    this.generateHtmlPlayers = this.generateHtmlPlayers.bind(this);

    this.gridSize = calcGridSize(this.props.options.cards);
    this.game = new Lib.Game(
      this.props.options.players,
      this.props.options.cards,
      this.props.options.images
    );

    this.state = {
      cards: this.generateHtmlCards(),
      players: this.generateHtmlPlayers()
    }
  }

  render(){
    return(
      <div className="gameContainer">
        <div className="gameMenuContainer">
          <h1 className="title">
            Game
          </h1>
          { this.state.players }
        </div>
        <div
          className="cardContainer"
          style={{
            width: (100 * this.gridSize.x / this.gridSize.y) + "vh"
          }}
          >
          { this.state.cards }
        </div>
      </div>
    );
  }

  flipCard(uid, flipped){
    var card = this.game.cards.cards.find((card) => {
      return card.uid === uid;
    });
    card.flipped = flipped;
    this.setState({
      cards: this.generateHtmlCards(),
      players: this.generateHtmlPlayers()
    });
  }

  cardClick(card){
    var clickResponse = this.game.click(card, (res) => {
      if (res.turnBack){
        res.turnBack.forEach((uid) => {
          this.flipCard(uid, false)
        });
      }
    });
    if (clickResponse.turnedCard) {
      this.flipCard(card.uid, true);
    }
    if (clickResponse.pairId) {

      this.setState({players: this.generateHtmlPlayers()});
    }
  }

  generateHtmlCards(){
    return this.game.cards.cards.map(
      (card, i) => (
        <Card
          key={i}
          card={card}
          gridSize={this.gridSize}
          game={this.game}
          onClick={this.cardClick}
        />
      )
    );
  }

  generateHtmlPlayers(animate){
    // var card = this.game.cards.cards.find((card) => {
    //   return card.uid === uid;
    // });
    return this.game.players.map(
      (player, i) => (
        <Player
          player={player}
          key={i}
        />
      )
    );
  }
}

module.exports = Game;
