import React from 'react'
import { get } from 'lodash/fp'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Fail = (props) => (
  <div className="withdraw-confirm">
    <div className="img fail" />
    <p>{get(['location', 'state', 'message'], props) || props.t('confirmations.withdraw.fail')}</p>
    <Link to="/account" replace className="button">{props.t('index.header.account')}</Link>
  </div>
)

Fail.propTypes = {
  t: PropTypes.func.isRequired,
}

export default translate()(Fail)
