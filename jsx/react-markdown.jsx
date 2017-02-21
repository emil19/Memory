var React = require('react');
var MarkdownIt = require('markdown-it')();
var fs = require('fs'); // Inbyggd node library för att läsa i filsystemet

class Markdown extends React.Component {
  constructor(props){
    super(props);

    // sätter texten till tom innan den hinner läsa in filen
    this.state = {
      text: ''
    };
  }
  componentWillMount(){
    // läser in filen async om uppdaterar state när den är klar
    fs.readFile(
      this.props.filePath,
      'utf-8',
      (err, text) => {
        if (err) throw err;
        this.setState({ text });
      }
    );
  }
  render () {
    // kompilerar markdown till html med markdown-it
    return (
      <div
        dangerouslySetInnerHTML={
          {__html: MarkdownIt.render(this.state.text)}
        }
      />
    );
  }
}

Markdown.propTypes = {
  filePath: React.PropTypes.string.isRequired
};

module.exports = Markdown;
