/* eslint-disable more/no-window */

function generateGaId() {
  const randomFirst = Array.from({ length: 4 }, () => Math.floor(Math.random() * 9)).join('')
  const randomSecond = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join('')

  return `7777${randomFirst}.1111${randomSecond}`
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
      data[key] = value // eslint-disable-line fp/no-mutation
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

    return JSON.parse(data)
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

  const utmData = getUtmParams()
  setUtmParams(utmData || parseUtmParams())
}

function get() {
  const id = getGaId()
  const utmData = getUtmParams() || {}

  return { ...utmData, ga_id: id }
}

export default { init, get }

/* eslint-enable more/no-window */
