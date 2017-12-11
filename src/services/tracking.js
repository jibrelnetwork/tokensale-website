/* eslint-disable no-use-before-define */

import storage from './storage'

const AFFILIATE_NETWORKS = ['clicksureclickid', 'track_id', 'actionpay', 'adpump']

function init() {
  initGaId()
  initUtmData()
  initAffiliateNetworks()
  reloadPageWithCleanUrl()
}

function get() {
  const id = getGaId()
  const utmData = getUtmParams() || {}
  const affiliates = getAffiliateNetworks() || {}

  return { ...utmData, ...affiliates, ga_id: id }
}

function initGaId() {
  storage.setGaId(getGaId())
}

function initUtmData() {
  const newUtmData = parseUtmParams()
  const utmData = getUtmParams()
  setUtmParams((Object.keys(newUtmData).length > 0) ? newUtmData : utmData || {})
}

function initAffiliateNetworks() {
  const newAN = parseAffiliateNetworks()
  const aNetworks = getAffiliateNetworks()
  setAffiliateNetworks((Object.keys(newAN).length > 0) ? newAN : aNetworks || {})
}

function reloadPageWithCleanUrl() {
  try {
    const { origin, hash } = window.location

    window.location.href = `${origin}/${hash}` // eslint-disable-line fp/no-mutation
  } catch (err) {
    console.error(err)
  }
}

function getGaId() {
  try {
    return storage.getGaId() || window.ga.getAll()[0].get('clientId')
  } catch (err) {
    console.error(err)

    return generateGaId()
  }
}

function parseUtmParams() {
  const data = {}

  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    if (key.indexOf('utm_') > -1) {
      data[key] = value.replace(/[#\/].*/g, '') // eslint-disable-line fp/no-mutation
    }
  })

  return data
}

function parseAffiliateNetworks() {
  const data = {}

  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    AFFILIATE_NETWORKS.forEach((affiliate) => {
      if (key === affiliate) {
        data[key] = value.replace(/[#\/].*/g, '') // eslint-disable-line fp/no-mutation
      }
    })
  })

  return data
}

function getUtmParams() {
  try {
    const data = storage.getUtmData()

    return parseDataFromStorage(data)
  } catch (err) {
    console.error(err)

    return null
  }
}

function getAffiliateNetworks() {
  try {
    const data = storage.getAffiliateNetworks()

    return parseDataFromStorage(data)
  } catch (err) {
    console.error(err)

    return null
  }
}

function setUtmParams(data) {
  storage.setUtmData(JSON.stringify(data))
}

function setAffiliateNetworks(data) {
  storage.setAffiliateNetworks(JSON.stringify(data))
}

function generateGaId() {
  return `7777${generateNInt(6)}.1111${generateNInt(6)}`
}

function generateNInt(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 9)).join('')
}

function parseDataFromStorage(data) {
  try {
    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data)

    if (Object.keys(parsedData).length === 0) {
      return null
    }

    return parsedData
  } catch (err) {
    console.error(err)

    return null
  }
}

export default { init, get }

/* eslint-enable no-use-before-define */
