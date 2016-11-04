import Req from '../index';
import Promise from 'ahbing-promise';
import chai from 'chai';
import sinon from 'sinon';
let expect = chai.expect;

describe('#',() => {
  Req.get('/', {}).then(function(data) {
    console.log('data====', data);
  },)
});
