export var CODE_MESSAGE = {
  200: 'The server successfully returned the requested data. ',
  201: 'Create or modify data successfully. ',
  202: 'A request has entered the background queue (asynchronous task). ',
  204: 'Delete data successfully. ',
  400: 'There is an error in the request sent, and the server did not create or modify data. ',
  401: 'The user does not have permission (the token, username, password are wrong). ',
  403: 'The user is authorized, but access is forbidden. ',
  404: 'The request sent was for a record that did not exist, and the server did not operate. ',
  405: 'The request method is not allowed. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource is permanently deleted and will no longer be available. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'An error occurred in the server, please check the server. ',
  502: 'Gateway error. ',
  503: 'The service is unavailable, the server is temporarily overloaded or maintained. ',
  504: 'The gateway has timed out. '
};
export var HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};