import Req from '../index';
import Promise from 'ahbing-promise';
import chai from 'chai';
const expect = chai.expect;

describe('#',() => {
  it('for test test', function() {
    Req.get('index.php', {params: { a: 1, b: 2 }, root: 'http://ahbing.me'}).then(function() {
      expect(1).to.equal(1);
    })
  });
});

