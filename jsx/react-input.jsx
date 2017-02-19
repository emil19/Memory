var React = require('react');

class Input extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  render(){
    return(
      <input
        type={this.props.type}
        onChange={this.onChange}
        value={this.props.value}
      />
    );
  }
  onChange(e){
    this.props.changeCallback(e.target.value, this.props.id);
  }
}
Input.propTypes = {
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  changeCallback: React.PropTypes.func.isRequired
};

Input.defaultProps = {
  type: 'text',
  value: ''
};

module.exports = Input;
