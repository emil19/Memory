var React = require('react');

var PairThumbnail = require('./react-pairThumbnail');

class Player extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className={`player ${this.props.player.current ? 'current' : ''}`}>
        <div className="points">{this.props.player.pairs.length}</div>
        <div className="info">
          <input
            type="text"
            value={this.props.player.name}
            disabled
          />
        <div className="pairs">
          {this.props.player.pairs.map(
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

module.exports = Player;
