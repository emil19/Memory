var React = require('react');

class ErrorMessage extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="error">
        <div className="text">
          {this.props.error.message}
        </div>
        <div
          className="close"
          onClick={() => this.props.removeError(this.key)}>
          ✖
        </div>
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  error: React.PropTypes.shape({
    message: React.PropTypes.string
  }),
  removeError: React.PropTypes.func.isRequired
};

ErrorMessage.defaultProps = {
  error: {
    message: 'Unknown Error'
  }
};

module.exports = ErrorMessage;
