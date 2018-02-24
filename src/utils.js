/* @flow */
import chroma from 'chroma-js';
import validUrl from 'valid-url';
import trianglify from 'trianglify';
import { emojify } from 'node-emoji';
import { COMPANY_COLORS, PROGRESSIVE_PUNCTS } from './constants';

const isValid = color => {
  try {
    return chroma(color) && true;
  } catch (_) {
    return false;
  }
};

module.exports.backgroundCSSGenerator = (background: string) => {
  if (Object.keys(COMPANY_COLORS).includes(background)) {
    return Array.isArray(COMPANY_COLORS[background])
      ? trianglify({
          seed: 'one19',
          variance: 0.5,
          cell_size: 45,
          width: window.innerWidth,
          height: window.innerHeight,
          x_colors: COMPANY_COLORS[background],
          y_colors: COMPANY_COLORS[background]
        })
      : `background-color: ${COMPANY_COLORS[background]}`;
  } else if (isValid(background)) {
    return `background-color: ${chroma(background).hex()}`;
  } else if (validUrl.isUri(background)) {
    return `
      background-image: url("${background}");
      background-size: cover
    `;
  }
  const [, pastelSat, pastelLight] = chroma('palegoldenrod').hsl();
  return `background-color: ${chroma
    .hsl(360 * Math.random(), pastelSat, pastelLight)
    .hex()}`;
};

const returnUnknown = name => name;
const insertProgressivePunct = (text: string): string =>
  Object.keys(PROGRESSIVE_PUNCTS).reduce(
    (returnText, key) =>
      PROGRESSIVE_PUNCTS[key].alias.reduce((innerText, alia) => {
        const safeKey = alia.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        const keyRegex = new RegExp(`${safeKey}[.,< \\]]`, 'ig');
        return innerText.replace(
          keyRegex,
          // it's more understandable this way
          // eslint-disable-next-line
          `<a href="${PROGRESSIVE_PUNCTS[key].url}"><icon>${key}</icon></a>${
            innerText.match(keyRegex) &&
            innerText.match(keyRegex)[0].slice(-1) === ']'
              ? ']'
              : ''
          }`
        );
      }, returnText),
    text
  );

module.exports.timeAgo = (date: ?string): string => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const times = {
    minute: 60,
    hour: 60 * 60,
    day: 60 * 60 * 24,
    week: 60 * 60 * 24 * 7,
    month: 60 * 60 * 24 * 30.4,
    year: 60 * 60 * 24 * 365.25
  };
  return Object.keys(times).reduce((returnText, key) => {
    const diff = Math.round(seconds / times[key]);
    if (diff >= 1) return `${diff} ${key}${diff > 1 ? 's' : ''} ago`;
    return returnText;
  }, '1 second ago');
};

module.exports.customTextParser = (text: string): string => {
  const imDoinIfied = text.replace(/(in)g(?![A-Za-z])/gi, "$1'");
  const withStrikethroughs = imDoinIfied.replace(/~~(.*)~~/, '<del>$1</del>');
  const withProgPunct = insertProgressivePunct(withStrikethroughs);
  const withEmojis = emojify(withProgPunct, returnUnknown);
  return withEmojis;
};
