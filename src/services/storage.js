/* eslint-disable fp/no-mutation, no-use-before-define */

const storageKeys = {
  gaId: 'gaId',
  utmData: 'utmData',
  affiliateNetworks: 'affiliateNetworks',
  newTransaction: 'newTransaction',
}

const storageMethods = {}

function initStorage() {
  Object.keys(storageKeys).forEach((key) => {
    const keyCapitalized = `${key.charAt(0).toUpperCase()}${key.slice(1)}`
    addStorageMethods(keyCapitalized, storageKeys[key])
  })

  return storageMethods
}

function getStorage() {
  if (Object.keys(storageMethods).length > 0) {
    return storageMethods
  } else {
    return initStorage()
  }
}

function addStorageMethods(methodName, value) {
  storageMethods[`get${methodName}`] = function getItem(suffix = '') {
    try {
      return window.localStorage.getItem(getStorageKey(value, suffix))
    } catch (err) {
      console.error(err)

      return null
    }
  }

  storageMethods[`set${methodName}`] = function setItem(data = '', suffix = '') {
    try {
      window.localStorage.setItem(getStorageKey(value, suffix), data)
    } catch (err) {
      console.error(err)
    }
  }

  storageMethods[`remove${methodName}`] = function removeItem(suffix = '') {
    try {
      window.localStorage.removeItem(getStorageKey(value, suffix))
    } catch (err) {
      console.error(err)
    }
  }
}

function getStorageKey(key, suffix) {
  const additional = (suffix && suffix.length) ? `-${suffix.replace(/ /g, '-').toUpperCase()}` : ''

  return `${key}${additional}`
}

export default getStorage()

/* eslint-enable fp/no-mutation */
