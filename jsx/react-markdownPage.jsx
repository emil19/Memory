var React = require('react');
var Markdown = require('./react-markdown');
var BackButton = require("./react-backButton");

class MarkdownPage extends React.Component {
  render() {
    return (
      <div className="pageContainer">
        <h1 className="title">
          <BackButton to={this.props.back} />
          <span>
            {this.props.title}
          </span>
        </h1>
        <div className="container-40">
          <Markdown filePath={this.props.filePath} />
        </div>
      </div>
    );
  }
}

module.exports = MarkdownPage;
