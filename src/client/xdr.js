// Internet Explorer versions 8 and 9 supported cross domain requests (CORS) using XDomainRequest.
// https://msdn.microsoft.com/en-us/library/cc288060%28VS.85%29.aspx

import Promise from 'ahbing-promise';

export default function xdr(request) {
  return Promise((resolve) => {
    const xdr = new XDomainRequest();
    
    const handler = ({ type }) => {
      let status = 0;
    
      if (type === 'load') {
        status = 200;
      } else if (type === 'error') {
        status = 500;
      }

      resolve(request.responseWith(xdr.responseText, { status }));
    };

    request.abort = () => xdr.abort();

    xdr.onerror = handler;
    xdr.onload = handler;
    xdr.ontimeout = handler;
    xdr.onprocess = () => {};
    
    xdr.open(request.method, request.getUrl());
    
    xdr.send(request.getBody());

  });
};
