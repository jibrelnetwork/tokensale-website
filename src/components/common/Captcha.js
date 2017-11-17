import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import Recaptcha from 'react-grecaptcha'

const RECAPTCHA_SITE_KEY = '6Lcd-DgUAAAAAJj89dm3aR43OMwW5_OS3Q4tg9MO'

const Captcha = ({ input: { onChange }, meta: { error, touched } }) => (
  <div className="Captcha">
    <div className={cx('field', 'captcha', { error: error && touched })}>
      <Recaptcha
        sitekey={RECAPTCHA_SITE_KEY}
        callback={onChange}
        expiredCallback={() => window.grecaptcha.reset()} // eslint-disable-line more/no-window
      />
      {touched && error && <div className="error-text">{error}</div>}
    </div>
  </div>
)

Captcha.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }).isRequired, // redux-form injected props
  meta: PropTypes.shape({ // redux-form injected props
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    touched: PropTypes.bool,
  }).isRequired,
}

export default Captcha
