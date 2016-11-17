import Req from './../../Req';

Req.jsonp('http://api.fanfou.com/favorites/trochidae.json', {}).then((data) => {
  console.log(data);
})




