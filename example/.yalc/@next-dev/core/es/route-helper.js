export function filterRoutesByGroups(arr) {
  var groups = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var result = [];
  arr.forEach(function (item) {
    if (!item.group || groups.indexOf(item.group) !== -1) {
      var newItem = item;

      if (item.routes && item.routes.length > 0) {
        newItem.routes = filterRoutesByGroups(item.routes, groups);

        if (newItem.routes.length > 0) {
          result.push(newItem);
        }
      } else {
        result.push(newItem);
      }
    }
  });
  return result;
}
export function findRouteMenuByGroup(arr, group) {
  var result;
  arr.forEach(function (item) {
    if (item.group && item.group === group) {
      result = item;
      return;
    }

    if (item.routes && item.routes.length > 0) {
      result = findRouteMenuByGroup(item.routes, group);

      if (result) {
        return;
      }
    }
  });
  return result;
}
var routePrefix = '';
export function configRoutePrefix(prefix) {
  routePrefix = prefix;
}
export function patchRouteBase(arr) {
  if (!routePrefix) {
    return;
  }

  arr.forEach(function (item) {
    if (item.path === '/') {
      item.path = "".concat(routePrefix);
    } else {
      item.path = "".concat(routePrefix).concat(item.path);
    }

    if (item.redirect) {
      if (item.redirect === '/') {
        item.redirect = "".concat(routePrefix);
      } else {
        item.redirect = "".concat(routePrefix).concat(item.redirect);
      }
    }

    if (item.routes && item.routes.length > 0) {
      patchRouteBase(item.routes);
    }
  });
}
export function getRoutePreFix() {
  return routePrefix;
}
export var GROUP = {
  PLATFORM: '0',
  SPONSOR: '1',
  STUDYSITE: '2',
  ETHIC: '3',
  SMO: '4'
};