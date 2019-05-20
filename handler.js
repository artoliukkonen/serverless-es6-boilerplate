import getHello from './src/get-healthcheck';
import getPromise from './src/get-promise';
import getError from './src/get-error';

// Map your functions to http events here
const RESOURCE_MAP = {
  '/': { GET: getHello },
  '/error': { GET: getError },
  '/promise': { GET: getPromise },
};

/*
  BOILERPLATE STARTS HERE
  Usually you don't have to touch anything below this.
  (unless you are using this for actual production app and need to use Cognito & SNS & such)
  */

// eslint-disable-next-line import/prefer-default-export
export async function request(event) {
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
    .then(sendProxySuccess.bind(), sendProxyError.bind()); // eslint-disable-line
}

const sendProxySuccess = (responseObj) => {
  const response = responseObj && responseObj.statusCode ? responseObj : {
    statusCode: 200,
    body: JSON.stringify(responseObj),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  return response;
};

const sendProxyError = (err) => {
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
  return response;
};
