var ReactDOM = require('react-dom');
var React = require('react');

var MainMenu = require('./react-mainMenu');
var Game = require('./react-game');
var MarkdownPage = require('./react-markdownPage');

// Huvudkomponenten, i den finns alla andra komponenter.
class MainComponent extends React.Component {
  constructor(props){
    super(props);

    this.startGame = this.startGame.bind(this);
    this.markdownPage = this.markdownPage.bind(this);

    this.state = {
      gameState: 'menu'
    }
  }
  render(){
    if (this.state.gameState === 'menu')
      return(
        <MainMenu
          startGame={this.startGame}
          markdownPage={this.markdownPage}
        />
      );

    if (this.state.gameState === 'game')
      return(<Game options={this.gameOptions} startGame={this.startGame}/>);

    if (this.state.gameState === 'markdownPage')
      return(<MarkdownPage filePath={this.markdownPath} />);
  }

  startGame(options){
    this.gameOptions = options;
    this.setState({
      gameState: 'game'
    })
  }

  markdownPage(path){
    this.markdownPath = path;
    this.setState({
      gameState: 'markdownPage'
    });
  }
}

//renderar reacts huvudkomponent i DOMen sen sköter react resten.
ReactDOM.render(<MainComponent/>, document.getElementById('react'));
