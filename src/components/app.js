import { h, Component } from 'preact';
import styled from 'styled-components';
import snarkdown from 'snarkdown';
import Background from './background';
import H1 from './h1';
import { backgroundCSSGenerator } from '../utils';

const AbsoluteCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
`;

export default class App extends Component {
  componentWillMount() {
    this.firebaseRef = new Firebase(
      'https://glowing-heat-4029.firebaseio.com/im-doin'
    );
    this.firebaseRef.on('value', dataSnapshot =>
      this.setState(dataSnapshot.val())
    );
  }

  render() {
    const { message = 'Loading...', background } = this.state;
    const mdMessage = snarkdown(message.replace(/(in)g(?![A-Za-z])/gi, "$1'"));
    const parsedBackground = backgroundCSSGenerator(background);

    return (
      <div>
        <AbsoluteCanvas id="trianglify" />
        <Background background={parsedBackground} />
        <H1 background={parsedBackground}>
          <div dangerouslySetInnerHTML={{ __html: mdMessage }} />
        </H1>
      </div>
    );
  }
}
