var React = require('react');

var Card = require('./react-card');
var Player = require('./react-player');
var BackButton = require('./react-backButton');

// inkluderar spelklasserna som ska vara oberoende av react
var GameLib = require('./game');

// räknar ut vilken höjd och bredd layouten ska ha
function calcGridSize(num){
  var sqrt = Math.sqrt(num);
  if ((sqrt % 1) === 0){
    return {x: sqrt, y: sqrt};
  }
  var testint = Math.ceil(sqrt);
  while (testint > 0){
    if((num % testint) === 0)
      return {x: num/testint, y: testint};
    testint--;
  }
  return null;
}

// react klassen som håller ihop spelet
class Game extends React.Component {
  constructor(props){
    super(props);

    this.cardClick = this.cardClick.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.generateHtmlCards = this.generateHtmlCards.bind(this);
    this.generateHtmlPlayers = this.generateHtmlPlayers.bind(this);

    // sätter gridstorleken
    this.gridSize = calcGridSize(this.props.options.cards);

    // initierar spelklasserna
    this.game = new GameLib(
      this.props.options.players,
      this.props.options.cards,
      this.props.options.images
    );

    // sätter state till html versioner av det som finns i spelklasserna
    this.state = {
      cards: this.generateHtmlCards(),
      players: this.generateHtmlPlayers()
    };
  }

  render(){
    return(
      <div className="gameContainer">
        <div className="gameMenuContainer">
          <h1 className="title">
            <BackButton to={this.props.back} />
            <span>
              Game
            </span>
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

  // ger ett korts unika id och en bool så vänds kortet
  flipCard(uid, flipped) {
    // hittar kortet i spelklasserna
    var card = this.game.cards.cards.find((card) => {
      return card.uid === uid;
    });
    // flippar kortet
    card.flipped = flipped;
    // uppdaterar react
    this.setState({
      cards: this.generateHtmlCards(),
      players: this.generateHtmlPlayers()
    });
  }

  // klicklyssnare på kortet
  cardClick(card) {
    // skickar kortet till spelklasserna och får svar om vad som ska hända
    var turned = this.game.click(card, (res) => {
      // extra svar efter två sekunder som avgör om några kort ska vändas
      // tillbaka
      if (res.turnBack){
        res.turnBack.forEach((uid) => {
          this.flipCard(uid, false);
        });
      }
    });

    // kollar om kortet vändes
    if (turned) {
      this.flipCard(card.uid, true);

      // kollar om det blev ett par och uppdaterar spelaren isåfall
      if (turned.pairId) {
        this.setState({players: this.generateHtmlPlayers()});
      }
    }
  }

  // genererar kort att visa från spelklassernas kortinformation
  generateHtmlCards() {
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

  // genererar spelare att visa från spelklassernas spelarinformation
  generateHtmlPlayers() {
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

Game.propTypes = {
  options: React.PropTypes.shape({
    players: React.PropTypes.oneOfType([
      React.PropTypes.number.isRequired,
      React.PropTypes.string.isRequired
    ]),
    cards: React.PropTypes.oneOfType([
      React.PropTypes.number.isRequired,
      React.PropTypes.string.isRequired
    ]),
    images: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired
    )
  }),
  back: React.PropTypes.func.isRequired
};

module.exports = Game;
