var React = require('react');

//errormeddelande som kommer upp i errorlistan
class ErrorMessage extends React.Component {
  render(){
    return(
      <div className="error">
        <div className="text">
          {
            // skriver ut meddelandet
            this.props.error.message
          }
        </div>
        <div
          className="close"
          onClick={
            // tar bort errormeddelandet när man klickar kryss
            () => this.props.removeError(this.key)
          }>
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
