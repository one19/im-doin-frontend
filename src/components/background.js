import { h } from 'preact';
import styled from 'styled-components';

type Props = {
  background: string | Object
};

const HiddenBackground = styled.div`
  width: 0;
  height 0;
  margin 0;
  padding: 0;
  display: none;
`;
const FullBackground = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  ${p => p.background};
`;

export default ({ background }: Props) => {
  // if the background is something trianglified(an object), put it on our canvas,
  // and hide the default background
  if (typeof background === 'object') {
    background.canvas(document.getElementById('trianglify'));
    return <HiddenBackground />;
  }

  // otherwise, return our background stringified deal
  return <FullBackground background={background} />;
};
