var React = require('react');
var path = require('path');

// gör en instans samtidigt som jag inkluderar
var FlickrRequest = new (require('./request'));

// importerar flera klasser från en fil
var buttons = require('./react-button');
var Button = buttons.Button;
var MarkdownButton = buttons.MarkdownButton;

var Select = require('./react-select');
var Input = require('./react-input');
var ErrorList = require('./react-errorList');

class MainMenu extends React.Component {
  constructor(props){
    super(props);

    this.stateSetter = this.stateSetter.bind(this);
    this.startGame = this.startGame.bind(this);
    this.addError = this.addError.bind(this);
    this.removeError = this.removeError.bind(this);

    // förbestämda kortantal att spela med.
    this.memorySizes = [16, 24, 36, 48, 64, 80, 100, 144, 196, 256];

    // sätter state som sidan har när den laddas
    this.state = {
      players: 2,
      cards: 16,
      search: '',
      loading: false,
      errors: []
    };
  }

  render(){
    // istället för class attributen i html använder react className eftersom
    // ordet class är reserverat.

    // indikator att något laddar, används när bilderna hämtas
    var loader = (
      <div className="loader">
        <div className="bounce1" />
        <div className="bounce2" />
        <div />
      </div>
    );

    // allt innehåll på menysidan
    return(
      <div className="pageContainer">

        <h1 className="title">
          <span>
            Memory Game
          </span>
        </h1>

        <div className="container-24">

          {/* Alla fält och knappar i menyn */}

          {/* Listan som visar alla errors */}

          <ErrorList
            errors={this.state.errors}
            removeError={this.removeError}
          />

          {/* Inmatning */}

          <Input
            label="Amount of players:"
            type="number"
            id="players"
            value={this.state.players}
            changeCallback={this.stateSetter}
          />
          <Select
            label="Amount of cards:"
            options={this.memorySizes}
            id="cards"
            value={this.state.cards}
            changeCallback={this.stateSetter}
          />
          <Input
            label="Image theme:"
            type="text"
            id="search"
            value={this.state.search}
            changeCallback={this.stateSetter}
          />

          {/* Knappar */}

          <Button
            onClick={this.startGame}>
            {
              // visar laddaren om det laddar, annars texten
              this.state.loading ? loader : 'Start Game'
            }
          </Button>
          <MarkdownButton
            onClick={this.props.markdownPage}
            path={path.join(__dirname, '..', 'md', 'howto.md')}
            text="How To Play"
          />
          <MarkdownButton
            onClick={this.props.markdownPage}
            path={path.join(__dirname, '..', 'md', 'info.md')}
            text="Information"
          />
        </div>
      </div>
    );
  }

  // hjälpfunktion som ger andra komponenter möjlighet att ändra state på menyn.
  stateSetter(value, state){
    var tempObject = {};
    tempObject[state] = value;
    this.setState(tempObject);
  }

  // startar spelet
  startGame(){
    // kräv minst 1 spelare
    if (this.state.players < 1) {
      this.addError({ message: 'Only positive players allowed.' });
      return;
    }

    // visar laddningsindikatorn genom att sätta loading state till true.
    this.stateSetter(true, 'loading');

    // skickar en request efter bilder genom min 'request.js' fil
    FlickrRequest.send({
      search: this.state.search,
      count: this.state.cards/2
    })
    .then((res) => { // om den får ett ok svar
      // tar bort laddningsindikatorn
      this.stateSetter(false, 'loading');

      // startar spelet med funktionen från react.jsx
      this.props.startGame({
        images: res,
        players: this.state.players,
        cards: this.state.cards
      });
    })
    .catch((error) => { // om det blir något under requesten.
      // tar bort laddningsindikatorn
      this.stateSetter(false, 'loading');

      // lägger till ett error
      this.addError(error);
    });
  }

  // funktioner för att lägga till och ta bort errors
  // slice används för att kopiera ett objekt istället för att referera
  addError(options) {
    this.setState((prevState) => {
      let errors = prevState.errors.slice(0);
      // lägger till ett nytt error i arrayen av de gamla med push.
      errors.push(options);
      return {errors}; // samma som return {errors: errors}
    });
  }
  removeError(id) {
    let errors = this.state.errors.slice(0);
    // tar bort ett error på en position i arrayen
    errors.splice(id, 1);
    this.setState({errors});
  }
}

// kontrollerar datatyperna i props och ser till ger ett varningserror om det
// blir fel
MainMenu.propTypes = {
  markdownPage: React.PropTypes.func.isRequired,
  startGame: React.PropTypes.func.isRequired
};

// exporterar hela klassen till någon som kallar på filen i require()
module.exports = MainMenu;
