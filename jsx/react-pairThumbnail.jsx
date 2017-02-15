var React = require('react');

class PairThumbnail extends React.Component {
  render(){
    var percent;
    var pxOffset;

    if (this.props.count <= 1){
      percent = 50;
      pxOffset = 30;
    } else {
      var percentIncrements = 100 / (this.props.count-1);
      percent = percentIncrements * this.props.index;
      pxOffset = .6 * percent;
    }

    return(
      <div
        className="pairThumbnail"
        style={{
          backgroundImage: `url(${this.props.img})`,
          left: `calc(${percent}% - ${pxOffset}px)`
        }}
      />
    );
  }
}

module.exports = PairThumbnail;
