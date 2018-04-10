import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/database';
import { contrast } from 'chroma-js';
import snarkdown from 'snarkdown';
import Background from './background';
import Footer from './footer';
import Header from './header';
import H1 from './h1';
import { backgroundCSSGenerator, customTextParser } from '../utils';

const config = {
  apiKey: 'AIzaSyCfSoWWocJ9JY9empbh8uxsJGN6Kc9pWIk',
  authDomain: 'glowing-heat-4029.firebaseapp.com',
  databaseURL: 'https://glowing-heat-4029.firebaseio.com',
  projectId: 'glowing-heat-4029',
  storageBucket: 'glowing-heat-4029.appspot.com',
  messagingSenderId: '299654116848'
};

const blackOrWhite = color =>
  contrast(color, '000') >= contrast(color, 'fff') ? '#000000' : '#ffffff';

const AbsoluteCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
`;
const AppReadable = styled.div`
  -webkit-text-stroke: initial;
  -webkit-text-fill-color: initial;
  ${p => {
    const isColor =
      typeof p.background === 'string' &&
      p.background.match(/background-color: (.*)/);

    // return the most readable text color for the background
    if (isColor) {
      return `color: ${blackOrWhite(isColor[1])}`;
    }

    // default to white text for images/canvasses
    return `-webkit-text-stroke: 2px #000;
            -webkit-text-fill-color: #fff`;
  }};
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Loading...', startTime: new Date() };
  }

  componentWillMount() {
    if (firebase.apps.length < 1) {
      firebase.initializeApp(config);
    }

    this.firebaseRef = firebase.database().ref('im-doin');
    this.firebaseRef.on('value', dataSnapshot => {
      this.setState(dataSnapshot.val());
    });
  }

  render() {
    const { message, startTime, background, textColor } = this.state;

    const mdMessage = snarkdown(customTextParser(message));
    const parsedBackground = backgroundCSSGenerator(background);

    return (
      <AppReadable background={parsedBackground}>
        <AbsoluteCanvas id="trianglify" />
        <Background background={parsedBackground} />
        <Header />
        <H1 textColor={textColor}>
          <div
            dangerouslySetInnerHTML={{ __html: customTextParser(mdMessage) }}
          />
        </H1>
        <Footer startTime={startTime} background={background} />
      </AppReadable>
    );
  }
}
