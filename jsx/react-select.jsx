var React = require('react');

class Select extends React.Component {
  constructor(props){
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  render(){
    return(
      <select onChange={this.onChange}>
        {this.props.options.map((o, i) => {
          return(
            <option value={o} key={i}>{o}</option>
          );
        })}
      </select>
    )
  }
  onChange(e){
    this.props.changeCallback(e.target.value, this.props.id);
  }
}

module.exports = Select;
