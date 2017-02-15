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
    this.mainMenu = this.mainMenu.bind(this);

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
      return(
        <Game
          options={this.gameOptions}
          startGame={this.startGame}
          back={this.mainMenu}
        />
      );

    if (this.state.gameState === 'markdownPage')
      return(
        <MarkdownPage
          filePath={this.markdownPath}
          back={this.mainMenu}
          title={this.markdownTitle}
        />
      );
  }

  startGame(options){
    this.gameOptions = options;
    this.setState({
      gameState: 'game'
    })
  }

  markdownPage(path, title){
    this.markdownPath = path;
    this.markdownTitle = title;
    this.setState({
      gameState: 'markdownPage'
    });
  }

  mainMenu(){
    this.setState({
      gameState: 'menu'
    });
  }
}

//renderar reacts huvudkomponent i DOMen sen sköter react resten.
ReactDOM.render(<MainComponent/>, document.getElementById('react'));
