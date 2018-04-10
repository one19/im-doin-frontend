import { backgroundCSSGenerator, customTextParser } from '../src/utils';

describe('utils', () => {
  describe('backgroundCSSGenerator(string)', () => {
    it('it correctly wraps hexcode strings', () =>
      expect(backgroundCSSGenerator('#FAFAFA')).to.eql(
        'background-color: #fafafa'
      ));

    it('understands some cool brand colors', () =>
      expect(backgroundCSSGenerator('react')).to.eql(
        'background-color: #00d8ff'
      ));

    it('refuses to break if you get nuts with the caps in brands', () =>
      expect(backgroundCSSGenerator('ShortLyStEr')).to.eql(
        'background-color: #203d57'
      ));

    it('does semi-smart trianglify stuff to multi-color brands', () => {
      const trianglifiedGatech = backgroundCSSGenerator('gatech');
      expect(trianglifiedGatech.opts).to.include({
        seed: 'one19',
        variance: 0.5,
        cell_size: 45
      });
      expect(trianglifiedGatech.opts).to.have.property('x_colors');
      expect(trianglifiedGatech.opts).to.have.property('y_colors');
      expect(trianglifiedGatech).to.have.property('polys');
    });

    it('even minimal ones, with no hashes', () =>
      expect(backgroundCSSGenerator('faf')).to.eql(
        'background-color: #ffaaff'
      ));

    it('wraps rgb colors', () =>
      expect(backgroundCSSGenerator('rgb(0, 0, 0)')).to.eql(
        'background-color: #000000'
      ));

    it('and rgba colors', () =>
      expect(backgroundCSSGenerator('rgba(119, 119, 225, 0.25)')).to.eql(
        'background-color: #7777e1'
      ));

    it('trusts inputted urls to be background images', () =>
      expect(backgroundCSSGenerator('https://i.imgur.com/HlmWDMU.jpg')).to.eql(`
      background-image: url("https://i.imgur.com/HlmWDMU.jpg");
      background-size: cover
    `));

    it('returns a random pretty  color if the user-input string still doesn\t fit', () => {
      const terribleArg = 'lk2j3l2kjdfs32d';
      expect(backgroundCSSGenerator(terribleArg)).to.be.a('string');
      expect(backgroundCSSGenerator(terribleArg)).to.include(
        'background-color:'
      );
    });
  });
  describe('customTextParser(text)', () => {
    it('works with urls containing progressive punctuation matches', () => {
      // the following url will match progressive punctuation marks, but they're in the url
      const url =
        "[3d designin' the next thin' after this one](https://twitter.com/Werd_119/status/959998119118225408)";
      expect(customTextParser(url)).to.eql(url);
    });

    it('still allows progressive punctuation in normal situations', () => {
      expect(
        customTextParser('[This is the right path/.?](www.elgoog.com)')
      ).to.eql(
        '[This is the right path<a href="http://progressivepunctuation.com/mark/#doubt"><icon>&#57348;</icon></a>](www.elgoog.com)'
      );
    });

    it('still allows progressive punctuation as a line ender', () => {
      expect(customTextParser('This is a great test/s')).to.eql(
        'This is a great test<a href="http://progressivepunctuation.com/mark/#sarcmark"><icon>&#57357;</icon></a>'
      );
    });
  });
});
