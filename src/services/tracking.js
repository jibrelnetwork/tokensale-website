// @flow

import storage from 'jwallet-web-storage'

import { tracking as config } from '../config'

function generateNInt(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 9)).join('')
}

function generateGaId(): string {
  return `7777${generateNInt(6)}.1111${generateNInt(6)}`
}

function getGaId(): string {
  try {
    return storage.getItem(config.storageKeyGAID) || window.ga.getAll()[0].get('clientId')
  } catch (err) {
    return generateGaId()
  }
}

function initGaId(): void {
  storage.setItem(config.storageKeyGAID, getGaId())
}

function parseDataFromStorage(data: ?string): ?Object {
  try {
    if (!data) {
      return null
    }

    const parsedData: Object = JSON.parse(data)

    if (Object.keys(parsedData).length === 0) {
      return null
    }

    return parsedData
  } catch (err) {
    return null
  }
}

function parseUtmParams(): Object {
  const data = {}

  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    if (key.indexOf('utm_') > -1) {
      data[key] = value.replace(/[#/].*/g, '') // eslint-disable-line fp/no-mutation
    }
  })

  return data
}

function getUtmParams(): ?Object {
  try {
    const data: ?string = storage.getItem(config.storageKeyUTMData)

    return parseDataFromStorage(data)
  } catch (err) {
    return null
  }
}

function setUtmParams(data: Object): void {
  storage.setItem(config.storageKeyUTMData, JSON.stringify(data))
}

function initUtmData(): void {
  const newUtmData: Object = parseUtmParams()
  const utmData: ?Object = getUtmParams()

  setUtmParams((Object.keys(newUtmData).length > 0) ? newUtmData : utmData || {})
}

function parseAffiliateNetworks(): Object {
  const data = {}

  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    config.affiliateNetworks.forEach((affiliate) => {
      if (key === affiliate) {
        data[key] = value.replace(/[#/].*/g, '') // eslint-disable-line fp/no-mutation
      }
    })
  })

  return data
}

function getAffiliateNetworks(): ?Object {
  try {
    const data: ?string = storage.getItem(config.storageKeyAffiliateNetworks)

    return parseDataFromStorage(data)
  } catch (err) {
    return null
  }
}

function setAffiliateNetworks(data: Object): void {
  storage.setItem(config.storageKeyAffiliateNetworks, JSON.stringify(data))
}

function initAffiliateNetworks(): void {
  const newAN: Object = parseAffiliateNetworks()
  const aNetworks: ?Object = getAffiliateNetworks()

  setAffiliateNetworks((Object.keys(newAN).length > 0) ? newAN : aNetworks || {})
}

function init(): void {
  initGaId()
  initUtmData()
  initAffiliateNetworks()
}

function get(): Object {
  const id: string = getGaId()
  const utmData: Object = getUtmParams() || {}
  const affiliates: Object = getAffiliateNetworks() || {}

  return { ...utmData, ...affiliates, ga_id: id }
}

export default {
  get,
  init,
}
