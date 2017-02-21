var React = require('react');

// knappkomponent för huvudmenyn
class Button extends React.Component {
  render(){
    return (
      <a href="#"
        className={"button extended " + this.props.extraClass}
        onClick={this.props.onClick}>
        { this.props.children }
      </a>
    );
  }
}

// en förkonfigurerad knapp att använda för att länka till markdownsidorna
class MarkdownButton extends React.Component {
  render(){
    return (
      <Button
        extraClass="secondary"
        onClick={() => this.props.onClick(this.props.path, this.props.text)}
        >
        { this.props.text }
      </Button>
    );
  }
}

Button.propTypes = {
  extraClass: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.any.isRequired
};

MarkdownButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  path: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
};

// exporterar flera klasser i samma fil
module.exports = { Button, MarkdownButton };
