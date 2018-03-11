import chroma from 'chroma-js';
import styled, { keyframes } from 'styled-components';

// make an array of rainbow colors
const spectralRainbow = chroma.brewer.spectral;

/*
* create an animation that simply cycles the text color through those colors
*/
const rainbowGasm = keyframes`
  ${spectralRainbow.reduce((animation, color, i) => {
    const percent = (100 * i / (spectralRainbow.length - 1)).toFixed(3);
    const last = !!(i === spectralRainbow.length - 1);
    return `${animation}${percent}% { color: ${color}; }${last ? '' : '\n'}`;
  }, '')}
`;

/*
* create a 100-frame animation that is a cycling linear gradient made of our fun colors
*/
const GRADIENT_FRAMES = 100;
const gradientRainbowGasm = keyframes`
  ${[...new Array(GRADIENT_FRAMES + 1)].reduce((animation, _, i) => {
    const percent = Math.round(100 * i / GRADIENT_FRAMES);
    const last = !!(i === GRADIENT_FRAMES);

    const gradientString = spectralRainbow.reduce(
      (ret, color, i) =>
        `${ret}${color}${i === spectralRainbow.length - 1 ? '' : ', '}`,
      ''
    );
    const gradientSlice = `linear-gradient(${Math.round(
      360 * percent / 100
    )}deg, ${gradientString})`;
    return `${animation}${percent}% { background-image: ${gradientSlice}; }${
      last ? '' : '\n'
    }`;
  }, '')}
`;

export default styled.h1`
  top: 50vh;
  width: 100%;
  margin: 0 auto;
  position: absolute;
  text-align: center;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  ${p =>
    p.textColor
      ? `
    div {
      width: fit-content;
      background-size: 0.6rem 0.6rem;

      ${
        p.textColor === 'simple'
          ? `animation: ${rainbowGasm} 3s linear infinite`
          : `
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-color: red;
      animation: ${gradientRainbowGasm} 3s linear infinite;
      `
      }
    }
  `
      : ''};
`;
