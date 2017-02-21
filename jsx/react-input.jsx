var React = require('react');

class Input extends React.Component {
  constructor(props){
    super(props);
    
    this.onChange = this.onChange.bind(this);
  }
  render() {
    // input elementet som ska renderas
    var input = (
      <input
        type={this.props.type}
        onChange={this.onChange}
        value={this.props.value}
      />
    );

    // returnera med en label om den har en.
    if (this.props.label)
      return (
        <label>
          <span> {this.props.label} </span>
          {input}
        </label>
      );

    // annars utan
    return input;
  }

  // skickar tillbaka till ägarens state när texten i rutan ändras
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
  changeCallback: React.PropTypes.func.isRequired,
  label: React.PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  value: ''
};

module.exports = Input;
