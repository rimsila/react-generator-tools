import storeWithExp from './store';
var token_name = "TOKEN";
export var configTokenName = function configTokenName(tokenName) {
  token_name = tokenName;
};
export var setToken = function setToken(token, exp) {
  storeWithExp.set(token_name, token, exp);
};
export var getToken = function getToken() {
  return storeWithExp.get(token_name);
};
export var clearToken = function clearToken() {
  storeWithExp.remove(token_name);
};