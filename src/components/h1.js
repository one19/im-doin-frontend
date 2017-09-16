import styled from 'styled-components';
import tc from 'tinycolor2';

export default styled.h1`
  font-family: 'helvetica';
  width: 100%;
  margin: 0 auto;
  position: absolute;
  text-align: center;
  top: 50vh;
  color: #000;
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
