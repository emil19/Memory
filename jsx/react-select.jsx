var React = require('react');

class Select extends React.Component {
  constructor(props){
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  render(){

    // select elementet som ska renderas
    var select = (
      <select onChange={this.onChange}>
        {
          // tar array av valmäjligheter och gör dem till en ny array med option
          // element, map är en inbyggd funktion för att manipulera en array.
          this.props.options.map((o, i) =>
            <option value={o} key={i}> {o} </option>
          )
        }
      </select>
    );

    // returnera med en label om den har en.
    if (this.props.label)
      return (
        <label>
          <span> {this.props.label} </span>
          {select}
        </label>
      );

    // annars utan
    return select;
  }

  // skickar tillbaka till ägarens state när valet ändras
  onChange(e){
    this.props.changeCallback(e.target.value, this.props.id);
  }
}

Select.propTypes = {
  changeCallback: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]))
};

module.exports = Select;
