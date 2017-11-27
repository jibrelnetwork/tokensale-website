import gtm from '../services/gtm'

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

export const change = () => (next) => (action) => {
  if (action.type && (action.type === LOCATION_CHANGE)) {
    gtm.pushPageView(action.payload.pathname)
  }

  return next(action)
}
