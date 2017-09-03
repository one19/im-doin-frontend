import { backgroundCSSGenerator } from '../src/utils';

describe('backgroundCSSGenerator(string)', () => {
  it('it correctly wraps hexcode strings', () =>
    expect(backgroundCSSGenerator('#FAFAFA')).to.eql(
      'background-color: #fafafa'
    ));

  it('understands some cool brand colors', () =>
    expect(backgroundCSSGenerator('react')).to.eql(
      'background-color: #00d8ff'
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
    expect(backgroundCSSGenerator('faf')).to.eql('background-color: #ffaaff'));

  it('wraps rgb colors', () =>
    expect(backgroundCSSGenerator('rgb(0, 0, 0)')).to.eql(
      'background-color: rgb(0, 0, 0)'
    ));

  it('and rgba colors', () =>
    expect(backgroundCSSGenerator('rgba(119, 119, 225, 0.25)')).to.eql(
      'background-color: rgba(119, 119, 225, 0.25)'
    ));

  it('trusts inputted urls to be background images', () =>
    expect(backgroundCSSGenerator('https://i.imgur.com/HlmWDMU.jpg')).to.eql(`
      background-image: url("https://i.imgur.com/HlmWDMU.jpg");
      background-size: cover
    `));

  it('returns a random pretty  color if the user-input string still doesn\t fit', () => {
    const terribleArg = 'lk2j3l2kjdfs32d';
    expect(backgroundCSSGenerator(terribleArg)).to.be.a('string');
    expect(backgroundCSSGenerator(terribleArg)).to.include('background-color:');
  });
});
