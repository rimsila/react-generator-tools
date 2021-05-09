import { configBase64Map, configRSAKey } from './crypto';
import { configRoutePrefix } from './route-helper';
import { configGlobalHeader, configRefreshToken, configInstance } from './nextRequest';
export function initNextDevCore(props) {
  props.RSAKey && configRSAKey(props.RSAKey);
  props.Base64MAP && configBase64Map(props.Base64MAP);
  props.routeProfix && configRoutePrefix(props.routeProfix);
  props.setGlobalHeader && configGlobalHeader(props.setGlobalHeader);
  props.configRefreshToken && configRefreshToken(props.configRefreshToken);
  props.configInstance && configInstance(props.configInstance);
}