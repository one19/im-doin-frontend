import { render } from 'react-dom';
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
  * {
    color: inherit;
    -webkit-text-stroke: inherit;
    -webkit-text-fill-color: inherit;
  }
  body {
    font-family: 'helvetica';
    margin: 0;
    padding: 0;
    border: none;
  }
  a {
    font-style: italic;
  }
  icon {
    font-style: normal;
    font-family: 'ProgressivePunctuation';
  }
`;

render(<App />, document.getElementById('app'));
