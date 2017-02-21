var React = require('react');
var Markdown = require('./react-markdown');
var BackButton = require("./react-backButton");

// sidan där markdown-filerna visas med titel och tillbakaknapp
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

MarkdownPage.propTypes = {
  filePath: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  back: React.PropTypes.func.isRequired,
};

module.exports = MarkdownPage;
