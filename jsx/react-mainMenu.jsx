var React = require('react');

var FlickrRequest = new (require('./request'));

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

    this.memorySizes = [16, 24, 36, 48, 64, 80, 100, 144, 196, 256];
    this.state = {
      players: 2,
      cards: 16,
      search: '',
      loading: false,
      errors: []
    };
  }

  render(){
    var loader = (
      <div className="loader">
        <div className="bounce1" />
        <div className="bounce2" />
        <div />
      </div>
    );

    return(
      <div className="pageContainer">
        <h1 className="title">
          <span>
            Memory Game
          </span>
        </h1>
        <div className="container-24">
          <ErrorList
            errors={this.state.errors}
            removeError={this.removeError}
          />
          <label>
            <span>Amount of players:</span>
            <Input
              type="number"
              id="players"
              value={this.state.players}
              changeCallback={this.stateSetter}
            />
          </label>
          <label>
            <span>Amount of cards:</span>
            <Select
              options={this.memorySizes}
              id="cards"
              value={this.state.cards}
              changeCallback={this.stateSetter}
            />
          </label>
          <label>
            <span>Image theme:</span>
            <Input
              type="text"
              id="search"
              value={this.state.search}
              changeCallback={this.stateSetter}
            />
          </label>
          <a href="#" className="button extended" onClick={this.startGame}>
            { this.state.loading ? loader : 'Start Game' }
          </a>
          <a
            href="#"
            className="button secondary extended"
            onClick={this.props.markdownPage.bind(
              null,
              './md/howto.md',
              "How To Play"
            )}
          >
            How To Play
          </a>
          <a
            href="#"
            className="button secondary extended"
            onClick={this.props.markdownPage.bind(
              null,
              './md/info.md',
              "Information"
            )}
          >
            Information
          </a>
          <a
            href="#"
            className="button secondary extended"
            onClick={this.props.markdownPage.bind(
              null,
              './md/todo.md',
              "To Do"
            )}
          >
            To Do
          </a>
        </div>
      </div>
    );
  }

  stateSetter(value, state){
    var tempObject = {};
    tempObject[state] = value;
    this.setState(tempObject);
  }

  startGame(){
    this.stateSetter(true, 'loading');
    FlickrRequest.send({
      search: this.state.search,
      count: this.state.cards/2
    })
    .then((res) => {
      this.stateSetter(false, 'loading');

      this.props.startGame({
        images: res,
        players: this.state.players,
        cards: this.state.cards
      });
    })
    .catch((error) => {
      this.stateSetter(false, 'loading');
      this.addError(error);
    });
  }

  addError(options) {
    this.setState((prevState) => {
      let errors = prevState.errors.slice(0);
      errors.push(options);
      return {errors};
    });
  }
  removeError(id) {
    let errors = this.state.errors.slice(0);
    errors.splice(id, 1);
    this.setState({errors});
  }
}

MainMenu.propTypes = {
  markdownPage: React.PropTypes.func.isRequired,
  startGame: React.PropTypes.func.isRequired
};

module.exports = MainMenu;
