var React = require('react');
var Markdown = require('./react-markdown');

class MarkdownPage extends React.Component {
  render() {
    return (
      <Markdown filePath={this.props.filePath} />
    );
  }
}

module.exports = MarkdownPage;
