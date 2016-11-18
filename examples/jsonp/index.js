import Req from './../../index';

Req.jsonp('http://api.fanfou.com/favorites/trochidae.json', {}).then((data) => {
  const body = data.body;
  body.forEach((row) => {
    document.write(`<br/><p>${row.text}</p><br/><hr/>`)
  })
});





