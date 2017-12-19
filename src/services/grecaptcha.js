/* eslint-disable fp/no-mutation, no-use-before-define */

import LogRocket from 'logrocket'

const GRECAPTCHA_API_URL = 'https://www.google.com/recaptcha/api.js'

function trackScriptLoad() {
  window.onerror = function onLoadCaptchaError(errorMsg) {
    if ((errorMsg && errorMsg.indexOf(GRECAPTCHA_API_URL)) > -1) {
      trackLoadError()
    }
  }
}

function trackLoadError() {
  LogRocket.track('LoadCaptchaError')
}

function trackLoginError() {
  LogRocket.track('LoginCaptchaError')
}

function trackRegisterError() {
  LogRocket.track('RegisterCaptchaError')
}

export default { trackScriptLoad, trackLoginError, trackRegisterError }

/* eslint-enable */
