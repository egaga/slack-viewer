import * as React from 'react';

/**
 * Provides React context for inserting styles when using universal-style-loader.
 */
class StyleContextProvider extends React.Component {

  //noinspection JSUnusedGlobalSymbols
  getChildContext() {
    const context = this.props.context;

    return {
      insertCss: context.insertCss || emptyFunction,
    };
  }

  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(this.props.styles);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    if (this.props.children.length > 1)
      throw "Only one child is allowed for context provider";

    return React.Children.toArray(this.props.children)[0];
  }
}

StyleContextProvider.propTypes = {
  styles: React.PropTypes.array,
  context: React.PropTypes.shape({
    insertCss: React.PropTypes.func,
  }),
  error: React.PropTypes.object,
};

StyleContextProvider.childContextTypes = {
  insertCss: React.PropTypes.func.isRequired,
};

export default StyleContextProvider;