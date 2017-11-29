/* eslint-disable more/no-window */

function generateNInt(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 9)).join('')
}

function generateGaId() {
  return `7777${generateNInt(6)}.1111${generateNInt(6)}`
}

function getGaId() {
  try {
    const id = window.localStorage.getItem('gaId')

    return id || window.ga.getAll()[0].get('clientId')
  } catch (err) {
    console.error(err)

    return generateGaId()
  }
}

function setGaId(id) {
  try {
    window.localStorage.setItem('gaId', id)
  } catch (err) {
    console.error(err)
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
    const data = window.localStorage.getItem('utmData')

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
  try {
    window.localStorage.setItem('utmData', JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

function init() {
  const id = getGaId()
  setGaId(id)

  const newUtmData = parseUtmParams()
  const utmData = getUtmParams()
  setUtmParams((Object.keys(newUtmData).length > 0) ? newUtmData : utmData)
}

function get() {
  const id = getGaId()
  const utmData = getUtmParams() || {}

  return { ...utmData, ga_id: id }
}

export default { init, get }

/* eslint-enable more/no-window */
