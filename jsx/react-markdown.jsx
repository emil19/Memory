var React = require('react');
var MarkdownIt = require('markdown-it')();
var path = require('path');
var fs = require('fs'); // Inbyggd node library för att läsa i filsystemet

class Markdown extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    }
  }
  componentWillMount(){
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
    return (
      <div
        dangerouslySetInnerHTML={
          {__html: MarkdownIt.render(this.state.text)}
        }
      />
    );
  }
}

module.exports = Markdown;
