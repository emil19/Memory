var React = require('react');

var PairThumbnail = require('./react-pairThumbnail');

// spelaren i sidomenyn under spelets gång.
class Player extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className={
          // om det är nuvarande spelare ges den en class som gör att den visas
          // större
          `player ${this.props.player.current ? 'current' : ''}`
        }>
        <div className="points">{this.props.player.pairs.length}</div>
        <div className="info">
          <input
            type="text"
            value={this.props.player.name}
            disabled
          />
        <div className="pairs">
          {
            // gör PairThumbnail element av alla par spelaren har
            this.props.player.pairs.map(
              (pair, i) => (
                <PairThumbnail
                  img={pair.image}
                  index={i}
                  count={this.props.player.pairs.length}
                  key={i}
                />
              )
          )}
        </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  player: React.PropTypes.object.isRequired
};

module.exports = Player;
