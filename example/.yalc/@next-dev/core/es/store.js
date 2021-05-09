import store from 'store';
var storeWithExp = {
  set: function set(key, val, exp) {
    store.set(key, {
      val: val,
      exp: exp,
      time: exp !== undefined ? new Date().getTime() : undefined
    });
  },
  get: function get(key) {
    var info = store.get(key);

    if (!info) {
      return null;
    }

    if (info.exp && new Date().getTime() - info.time > info.exp * 1000) {
      storeWithExp.remove(key);
      return null;
    }

    return info.val;
  },
  remove: function remove(key) {
    store.remove(key);
  },
  clear: function clear() {
    store.clearAll();
  }
};
export default storeWithExp;