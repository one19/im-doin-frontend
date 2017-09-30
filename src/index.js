import { h, render } from 'preact';
import { injectGlobal } from 'styled-components';
import App from './components/app';

// require our font config file to use all those nice icons
require('./font');

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @font-face {
    font-family: 'ProgressivePunctuation';
    src:
      url('./fonts/progressive-punctuation.eot') format('embedded-opentype'),
      url('./fonts/progressive-punctuation.woff') format('woff'),
      url('./fonts/progressive-punctuation.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  body {
    font-family: 'helvetica';
    margin: 0;
    padding: 0;
    border: none;
  }
  a {
    color: inherit;
    font-style: italic;
  }
  icon {
    font-style: normal;
    font-family: 'ProgressivePunctuation';
  }
`;

render(<App />, document.body, document.querySelector('main'));
