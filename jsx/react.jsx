// huvudfilen för react

// bibliotek som används installerade från npm
var ReactDOM = require('react-dom');
var React = require('react');

// hemmagjorda filer som används (börjar med ./ för att leta i samma mapp)
// om filerna jag länkar här börjar på './react-' har de med react att göra
// övriga filer är oberoende av react.
var MainMenu = require('./react-mainMenu');
var Game = require('./react-game');
var MarkdownPage = require('./react-markdownPage');

// Huvudkomponenten, i den finns alla andra komponenter.
class MainComponent extends React.Component {
  constructor(props){
    // skickar vidare props till reacts grundkomponent om man har en egen
    // konstruktor, props är vad react kallar attributerna man skickar i html.
    super(props);

    // gör så this kan användas i funktionerna.
    this.startGame = this.startGame.bind(this);
    this.markdownPage = this.markdownPage.bind(this);
    this.mainMenu = this.mainMenu.bind(this);

    // när man uppdaterar this.state med this.setState() uppdaterar react
    // automatiskt all html.
    this.state = {
      gameState: 'menu'
    };
  }
  render(){
    // i jsx är taggar som börjar på stor bokstav andra reactkomponenter.
    // övriga taggar tolkas som vanliga htmltaggar.

    // kollar vilket state spelet är i och visar passande komponenter
    // jag skickar med olika funkioner de behöver som props.
    if (this.state.gameState === 'menu')
      return(
        <MainMenu
          startGame={this.startGame}
          markdownPage={this.markdownPage}
        />
      );

    else if (this.state.gameState === 'game')
      return(
        <Game
          options={this.gameOptions}
          startGame={this.startGame}
          back={this.mainMenu}
        />
      );

    else if (this.state.gameState === 'markdownPage')
      return(
        <MarkdownPage
          filePath={this.markdownPath}
          back={this.mainMenu}
          title={this.markdownTitle}
        />
      );
    return null;
  }

  // navigeringsfunktioner

  // sätter igång spelet och visar Game komponenten
  startGame(options){
    this.gameOptions = options;
    this.setState({
      gameState: 'game'
    });
  }

  // visar en informationssida från en markdown-fil i md mappen
  markdownPage(path, title){
    this.markdownPath = path;
    this.markdownTitle = title;
    this.setState({
      gameState: 'markdownPage'
    });
  }

  // går tillbaka till huvudmenyn
  mainMenu(){
    this.setState({
      gameState: 'menu'
    });
  }
}

// renderar reacts huvudkomponent i DOMen, detta görs bara en gång eftersom alla
// andra komponenter finns inkluderade i denna.
ReactDOM.render(<MainComponent/>, document.getElementById('react'));
