'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

// sessionStorage > memoryStorage
// localStorage > memoryStorage
var memoryStorage = {
  data: {},
  getItem: function getItem(key) {
    return this.data[key];
  },
  setItem: function setItem(key, val) {
    this.data[key] = val;
  },
  removeItem: function removeItem(key) {
    delete this.data[key];
  }
};

var FallbackStorage =
/*#__PURE__*/
function () {
  function FallbackStorage(storage) {
    _classCallCheck(this, FallbackStorage);

    // try supported
    try {
      storage.setItem('a', 1);
      storage.removeItem('a');
      this.storage = storage;
    } catch (e) {
      this.storage = memoryStorage;
    }
  }

  _createClass(FallbackStorage, [{
    key: "get",
    value: function get(key, defVal) {
      var val = this.storage ? this.storage.getItem(key) : null;
      if (val === 'null') val = null;

      if (val === null && defVal !== undefined) {
        this.set(key, defVal);
        val = defVal;
      }

      try {
        val = JSON.parse(val);
      } catch (e) {}

      return val;
    }
  }, {
    key: "set",
    value: function set(key, val) {
      var _val = val;
      if (typeof _val === 'undefined') _val = val = null;

      if (typeof val !== 'string') {
        try {
          _val = JSON.stringify(val).replace(/,"\$\$hashKey":.*?"(,|})/g, '$1');
        } catch (e) {}
      }

      try {
        this.storage.setItem(key, _val);
      } catch (e) {}

      return val;
    }
  }, {
    key: "del",
    value: function del(key) {
      this.storage.removeItem(key);
    }
  }]);

  return FallbackStorage;
}();

var Storage = {
  LS: new FallbackStorage(window.localStorage),
  SS: new FallbackStorage(window.sessionStorage)
};
Storage.SLS = {
  get: function get(key) {
    return Storage.SS.get(key) || Storage.LS.get(key);
  },
  set: function set(key, val) {
    Storage.SS.set(key, val);
    Storage.LS.set(key, val);
    return val;
  }
};

module.exports = Storage;
