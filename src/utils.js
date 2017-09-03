/* @flow */
const tc = require('tinycolor2');
const validUrl = require('valid-url');
const trianglify = require('trianglify');

const CONSTANTS = {
  airbnb: '#fd5c63',
  amazon: ['#146eb4', '#ff9900'],
  angular: ['#000000', '#b52e31'],
  canon: ['#000000', '#bc0024'],
  discord: ['#99aab5', '#7289da'],
  docker: ['#384d54', '#0db7ed'],
  facebook: '#3b5998',
  gatech: ['#c59353', '#fff', '#eeb211', '#00254c'],
  hackernews: '#ff6600',
  hangouts: '#0f9d58',
  heroku: ['#c9c3e6', '#6762a6'],
  html: '#e34f26',
  iftt: ['#e34f26', '#ff4400'],
  ikea: ['#ffcc00', '#003399'],
  instagram: [
    '#405de6',
    '#5851db',
    '#833ab4',
    '#c13584',
    '#e1306c',
    '#fd1d1d',
    '#f56040',
    '#f77737',
    '#fcaf45',
    '#ffdc80'
  ],
  jquery: ['#7acef4', '#0769ad'],
  kickstarter: ['#0f2105', '#2bde73'],
  linkedin: '#0077b5',
  medium: '#00ab6c',
  netflix: '#e50914',
  node: '#6cc24a',
  npm: '#cb3837',
  paypal: '#003087',
  raspi: ['#8cc04b', '#c7053d'],
  razer: '#00ff00',
  react: '#00d8ff',
  reddit: ['#ff4500', '#5f99cf'],
  shortlyster: '#203d57',
  skype: '#00aff0',
  slack: ['#3eb991', '#e01563', '#e9a820', '#6ecadc'],
  stripe: '#00afe1',
  snapchat: '#fffc00',
  tumblr: '#35465c',
  twitter: '#1da1f2',
  vue: ['#42b883', '#35495e'],
  wordpress: ['#464646', '#d54e21', '#21759b']
};

module.exports.backgroundCSSGenerator = (background: string): string => {
  if (Object.keys(CONSTANTS).includes(background)) {
    return Array.isArray(CONSTANTS[background])
      ? trianglify({
          seed: 'one19',
          variance: 0.5,
          cell_size: 45,
          width: window.innerWidth,
          height: window.innerHeight,
          x_colors: CONSTANTS[background],
          y_colors: CONSTANTS[background]
        })
      : `background-color: ${CONSTANTS[background]}`;
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
