var React = require('react');
var axios = require('axios');

var Markdown = require('./react-markdown');
var Select = require('./react-select');
var Input = require('./react-input');

class MainMenu extends React.Component {
  constructor(props){
    super(props);

    this.stateSetter = this.stateSetter.bind(this);
    this.startGame = this.startGame.bind(this);

    this.memorySizes = [16, 24, 36, 48, 64, 80, 100, 144, 196, 256];
    this.state = {
      players: 2,
      cards: 16,
      search: '',
      loading: false
    }
  }
  render(){
    var loader = (
      <div className="loader">
        <div className="bounce1" />
        <div className="bounce2" />
        <div />
      </div>
    )

    return(
      <div className="pageContainer">
        <h1 className="title">
          <span>
            Memory Game
          </span>
        </h1>
        <div className="container-24">
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
    )
  }
  stateSetter(value, state){
    var tempObject = {};
    tempObject[state] = value;
    this.setState(tempObject);
  }

  startGame(){
    this.setState({
      loading: true
    });

    var method = this.state.search === "" ?
      'flickr.interestingness.getList' : 'flickr.photos.search';

    var that = this;
    axios.get('https://api.flickr.com/services/rest/',{
      params: {
        method: method,
        format: 'json',
        nojsoncallback: '1',
        api_key: '182c38c67c13de0148a5f1b7d6240ed9',
        content_type: 1,
        sort: 'relevance',
        text: that.state.search,
        per_page: this.state.cards/2,
      }
    })
    .then(function(response) {
      console.log(response);

      var urlArray = response.data.photos.photo.map((p)=>{
        return(
          `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`
        );
      });

      that.setState({
        loading: false
      });

      that.props.startGame({
        images: urlArray,
        players: that.state.players,
        cards: that.state.cards
      });
    })
    .catch(function(error){
      console.log(error);

      that.setState({
        loading: false
      });
    });
  }
}

module.exports = MainMenu;
