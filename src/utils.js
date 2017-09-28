/* @flow */
import tc from 'tinycolor2';
import validUrl from 'valid-url';
import trianglify from 'trianglify';
import { COMPANY_COLORS, PROGRESSIVE_PUNCTS } from './constants';

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
  } else if (tc(background).isValid()) {
    return `background-color: ${tc(background).toString()}`;
  } else if (validUrl.isUri(background)) {
    return `
      background-image: url("${background}");
      background-size: cover
    `;
  }
  return `background-color: ${tc('palegoldenrod')
    .spin(360 * Math.random())
    .toString()}`;
};

const insertProgressivePunct = (text: string): string =>
  Object.keys(PROGRESSIVE_PUNCTS).reduce(
    (returnText, key) =>
      PROGRESSIVE_PUNCTS[key].alias.reduce((innerText, alia) => {
        const safeKey = alia.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        let keyRegex = new RegExp(safeKey, 'ig');
        if (alia.match(/\/[a-z]$/))
          keyRegex = new RegExp(`[^<]/${alia[1]}`, 'ig');

        return innerText.replace(
          keyRegex,
          `<a href="${PROGRESSIVE_PUNCTS[key].url}"><icon>${key}</icon></a>`
        );
      }, returnText),
    text
  );

module.exports.customTextParser = (text: string): string => {
  const imDoinIfied = text.replace(/(in)g(?![A-Za-z])/gi, "$1'");
  const withStrikethroughs = imDoinIfied.replace(/~~(.*)~~/, '<del>$1</del>');
  const withProgPunct = insertProgressivePunct(withStrikethroughs);
  return withProgPunct;
};
