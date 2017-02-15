var React = require('react');

class Card extends React.Component {
  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);

    // Bilden på baksidan av korten.
    this.cardBack = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <rect width="512" height="512" />
        <path d="M296 324h-95v-9c0-16 2-29 6-39 4-10 9-19 16-28 7-8 24-23 49-44 14-11 20-21 20-30 0-9-3-16-8-21 -5-5-14-8-25-8 -12 0-22 4-29 12 -8 8-13 22-15 41l-97-12c3-36 16-64 39-86 23-22 57-33 104-33 36 0 66 8 88 23 30 21 46 48 46 82 0 14-4 28-12 41 -8 13-24 29-48 48 -17 13-27 24-32 32C298 301 296 311 296 324zM198 350h102v90H198V350z"/>
      </svg>
    );
  }
  render(){
    return(
      <div
        className="flip"
        onClick={this.onClick}
        style={{
          width: (90/this.props.gridSize.x) + '%',
          paddingBottom: (90/this.props.gridSize.x) + '%',
          margin: (5/this.props.gridSize.x) + '%'
        }}
      >
        <div className={"card" + (this.props.card.flipped ? " flipped" : "")}>
          <div className="face front">
            {this.cardBack}
          </div>
          <div
            className="face back"
            style={{
              backgroundImage: 'url('+this.props.card.image+')'
            }}
          />
        </div>
      </div>
    );
  }
  onClick(){
    this.props.onClick(this.props.card);
  }
}

module.exports = Card;
