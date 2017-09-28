import { h, Component } from 'preact';
import styled from 'styled-components';
import firebase from 'firebase';
import tc from 'tinycolor2';
import snarkdown from 'snarkdown';
import Background from './background';
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

const AbsoluteCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
`;
const AppReadable = styled.div`
  -webkit-text-stroke: unset;
  -webkit-text-fill-color: unset;
  ${p => {
    const isColor =
      typeof p.background === 'string' &&
      p.background.match(/background-color: (.*)/);

    // return the most readable text color for the background
    if (isColor) {
      const color = tc.mostReadable(isColor[1], ['#fff', '#000']);
      return `color: ${color}`;
    }

    // default to white text for images/canvasses
    return `-webkit-text-stroke: 2px #000;
            -webkit-text-fill-color: #fff`;
  }};
`;

export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config);
    this.firebaseRef = firebase.database().ref('im-doin');
    this.firebaseRef.on('value', dataSnapshot =>
      this.setState(dataSnapshot.val())
    );
  }

  render() {
    const { message = 'Loading...', background } = this.state;
    const mdMessage = snarkdown(customTextParser(message));
    const parsedBackground = backgroundCSSGenerator(background);

    return (
      <AppReadable background={parsedBackground}>
        <AbsoluteCanvas id="trianglify" />
        <Background background={parsedBackground} />
        <H1>
          <div
            dangerouslySetInnerHTML={{ __html: customTextParser(mdMessage) }}
          />
        </H1>
      </AppReadable>
    );
  }
}
