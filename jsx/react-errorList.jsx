var React = require('react');
// react tillägg för att animera när ett element kommer eller tas bort.
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var ErrorMessage = require('./react-error');

class ErrorList extends React.Component {
  render(){
    return(
      <ReactCSSTransitionGroup
        className="errorList"
        transitionName="error"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {
          // tar emot error array och skapar errormeddelande element som visas
          this.props.errors.map(
          (error, i) =>
            <ErrorMessage
              error={error}
              key={i}
              removeError={this.props.removeError}
            />
          )
        }
      </ReactCSSTransitionGroup>
    );
  }
}

ErrorList.propTypes = {
  errors: React.PropTypes.array.isRequired,
  removeError: React.PropTypes.func.isRequired
};

module.exports = ErrorList;
