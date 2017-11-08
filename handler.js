import getHello from './get-hello';

// Map your functions to http events here
const RESOURCE_MAP = {
  '/': { GET: getHello },
};

/*
  BOILERPLATE STARTS HERE
  Usually you don't have to touch anything below this.
  (unless you are using this for actual production app and need to use Cognito & SNS & such)
  */

export default function request(event, context, callback) {
  return Promise.resolve()
    .then(() => {
      if (event.httpMethod && event.resource) {
        console.log('PROCESSING HTTP EVENT', event.httpMethod, event.resource);
        const resource = RESOURCE_MAP[event.resource];
        const resourceMethod = resource && resource[event.httpMethod];
        if (!resourceMethod) return Promise.reject(new Error('[404] Route Not Found'));
        return resourceMethod(event);
      }
      console.log('UNKNOWN EVENT', event);
      return {};
    })
    .then(sendProxySuccess.bind(null, callback), sendProxyError.bind(null, callback)); // eslint-disable-line
}

function sendProxySuccess(callback, responseObj) {
  const response = responseObj && responseObj.statusCode ? responseObj : {
    statusCode: 200,
    body: JSON.stringify(responseObj),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  callback(null, response);
}

function sendProxyError(callback, err) {
  console.log('ERROR:', err.stack || err);
  let status = 500;
  let message = err.message || JSON.stringify(err);
  const m = err.message && err.message.match(/^\[(\d+)\] *(.*)$/);
  if (m) {
    [, status, message] = m;
  }
  const response = {
    statusCode: status,
    body: JSON.stringify({ errorMessage: message }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  callback(null, response);
}
