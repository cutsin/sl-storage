// sessionStorage > memoryStorage
// localStorage > memoryStorage

const memoryStorage = {
  data: {},
  getItem (key) { return this.data[key] },
  setItem (key, val) { this.data[key] = val },
  removeItem (key) { delete this.data[key] }
}

class FallbackStorage {
  constructor (storage) {
    // try supported
    try {
      storage.setItem('a', 1)
      storage.removeItem('a')
      this.storage = storage
    } catch (e) {
      this.storage = memoryStorage
    }
  }
  get (key) {
    let val = this.storage ? this.storage.getItem(key) : null
    if (!val || val === 'null') return null
    try {
      val = JSON.parse(val)
    } catch (e) {}
    return val
  }
  set (key, val) {
    var _val = val
    if (typeof _val === 'undefined') _val = val = null
    if (typeof val !== 'string') {
      try {
        _val = JSON.stringify(val).replace(/,"\$\$hashKey":.*?"(,|})/g, '$1')
      } catch (e) {}
    }
    try { this.storage.setItem(key, _val) } catch (e) {}
    return val
  }
  getSet (key, val) {
    let _val = this.get(key)
    if (!_val) this.set(key, val)
    return _val || val
  }
  del (key) { this.storage.removeItem(key) }
}

const Storage = {
  LS: new FallbackStorage(window.localStorage),
  SS: new FallbackStorage(window.sessionStorage)
}
Storage.SLS = {
  get (key) {
    return Storage.SS.get(key) || Storage.LS.get(key)
  },
  set (key, val) {
    Storage.SS.set(key, val)
    Storage.LS.set(key, val)
    return val
  }
}

export default Storage
