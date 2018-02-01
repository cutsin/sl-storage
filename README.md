# Auto Fallback Storage

```javascript
// If browser in private mode, auto fallback to cache
// sessionStorage > memoryStorage
// localStorage > memoryStorage
```

## Usage

```javascript
import Storage from 'sl-storage'

// LocalStorage
Storage.LS.set('foo', 'bar')
Storage.LS.get('foo', 'bar') // >> bar
Storage.LS.getSet('foo', 'bar') // >> bar
Storage.LS.del('foo')

// SessionStorage
Storage.SS.set('foo', 'bar')
Storage.SS.get('foo', 'bar') // >> bar
Storage.SS.getSet('foo', 'bar') // >> bar
Storage.SS.del('foo')

// Both
Storage.SLS.set('foo', 'oops')
Storage.SLS.get('foo', 'oops') // >> oops
Storage.LS.get('foo', 'oops') // >> oops
Storage.SS.get('foo', 'oops') // >> oops
```
