import * as React from 'react';
import * as PropTypes from 'prop-types';

const emptyFunction = () => {};
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
  styles: PropTypes.array,
  context: PropTypes.shape({
    insertCss: PropTypes.func,
  }),
  error: PropTypes.object,
};

StyleContextProvider.childContextTypes = {
  insertCss: PropTypes.func.isRequired,
};

export default StyleContextProvider;