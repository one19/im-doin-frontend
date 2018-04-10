/* @flow */
import chroma from 'chroma-js';
import validUrl from 'valid-url';
import trianglify from 'trianglify';
import { lib as emojilib } from 'emojilib';
import { COMPANY_COLORS, PROGRESSIVE_PUNCTS } from './constants';

const isValid = color => {
  try {
    return chroma(color) && true;
  } catch (_) {
    return false;
  }
};

const emojify = message => {
  const bugs = [
    'bug',
    'butterfly',
    'beetle',
    'ant',
    'grasshopper',
    'spider',
    'honeybee'
  ];
  const emojiRe = /:([a-z0-9_-]+):/gi;
  return message.replace(emojiRe, emojiAttempt => {
    const match = emojilib[emojiAttempt.replace(/:/g, '')];
    return match
      ? match.char
      : emojilib[bugs[Math.floor(Math.random() * bugs.length)]].char;
  });
};

module.exports.backgroundCSSGenerator = (background = '') => {
  const downCasedBackground = background.toLowerCase();
  if (Object.keys(COMPANY_COLORS).includes(downCasedBackground)) {
    return Array.isArray(COMPANY_COLORS[downCasedBackground])
      ? trianglify({
          seed: 'one19',
          variance: 0.5,
          cell_size: 45,
          width: window.innerWidth,
          height: window.innerHeight,
          x_colors: COMPANY_COLORS[downCasedBackground],
          y_colors: COMPANY_COLORS[downCasedBackground]
        })
      : `background-color: ${COMPANY_COLORS[downCasedBackground]}`;
  } else if (isValid(background)) {
    return `background-color: ${chroma(downCasedBackground).hex()}`;
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

const insertProgressivePunct = (text: string): string =>
  Object.keys(PROGRESSIVE_PUNCTS).reduce(
    (returnText, key) =>
      PROGRESSIVE_PUNCTS[key].alias.reduce((innerText, alia) => {
        const safeKey = alia.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        const keyRegex = new RegExp(`${safeKey}([.,< \\]]|$)`, 'ig');
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
  const imDoinIfied = text.replace(
    /(^|[ _-]+)([a-z]{2,}in)g([ :;!?.,_]+|$)/gi,
    "$1$2'$3"
  );
  const withStrikethroughs = imDoinIfied.replace(/~~(.*)~~/, '<del>$1</del>');
  const withProgPunct = insertProgressivePunct(withStrikethroughs);
  const withEmojis = emojify(withProgPunct);
  return withEmojis;
};
