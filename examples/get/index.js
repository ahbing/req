import Req from './../../index';

Req.get('https://cnodejs.org/api/v1/topics').then((data) => {
  const list = JSON.parse(data.body).data;
  list.forEach((item) => {
    document.write(`<br/><div>${item.content}</div><hr><br/>`)
  });
});





