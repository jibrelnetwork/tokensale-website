import storage from './storage'

function generateNInt(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 9)).join('')
}

function generateGaId() {
  return `7777${generateNInt(6)}.1111${generateNInt(6)}`
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

function getUtmParams() {
  try {
    const data = storage.getUtmData()

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

function setUtmParams(data) {
  storage.setUtmData(JSON.stringify(data))
}

function init() {
  storage.setGaId(getGaId())

  const newUtmData = parseUtmParams()
  const utmData = getUtmParams()
  setUtmParams((Object.keys(newUtmData).length > 0) ? newUtmData : utmData || {})
}

function get() {
  const id = getGaId()
  const utmData = getUtmParams() || {}

  return { ...utmData, ga_id: id }
}

export default { init, get }
