var React = require('react');

// den lilla bilden som visas på alla av nuvarande spelarens par
class PairThumbnail extends React.Component {
  render(){
    // räknar vart i sin förälder kortet ska ligga så de sprider ut sig jämnt
    // och visas över varandra om det blir fullt.
    var percent;
    var pxOffset;

    if (this.props.count <= 1){
      percent = 50;
      pxOffset = 30;
    } else {
      var percentIncrements = 100 / (this.props.count - 1);
      percent = percentIncrements * this.props.index;
      pxOffset = 0.6 * percent;
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

PairThumbnail.propTypes = {
  count: React.PropTypes.number.isRequired,
  img: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired
};

module.exports = PairThumbnail;
