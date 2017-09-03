import { h, Component } from 'preact';
import styled from 'styled-components';
import Background from './background';
import H1 from './h1';

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

    return (
      <div>
        <AbsoluteCanvas id="trianglify" />
        <Background background={background} />
        <H1>
          {message}
        </H1>
      </div>
    );
  }
}
