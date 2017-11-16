import React from 'react'
import PropType from 'prop-types'
import Recaptcha from 'react-grecaptcha'

const RECAPTCHA_SITE_KEY = '6Lcd-DgUAAAAAJj89dm3aR43OMwW5_OS3Q4tg9MO'

const Captcha = ({ input: { onChange }, meta: { error, touched } }) => (
  <div className="Captcha">
    <Recaptcha
      sitekey={RECAPTCHA_SITE_KEY}
      callback={() => onChange(true)}
      expiredCallback={() => window.grecaptcha.reset()} // eslint-disable-line more/no-window
    />
    {touched && (error && <div className="error">{error}</div>)}
  </div>
)

Captcha.propTypes = {
  input: PropType.shape({
    onChange: PropType.func.isRequired,
  }).isRequired, // redux-form injected props
  meta: PropType.shape({ // redux-form injected props
    error: PropType.oneOfType([PropType.array, PropType.string]),
    touched: PropType.bool,
  }).isRequired,
}

export default Captcha
