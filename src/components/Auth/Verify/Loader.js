import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'lodash/fp'
import { translate } from 'react-i18next'

const Loader = ({ t, verifyStatus }) => (
  <div className="Loader">
    <div className="loader-content">
      <div className="loader">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
    <div className="status">
      <div className="item item-1">
        {t('verification.loader.stages.uploading')}
      </div>
      <div className="item item-2">
        {t('verification.loader.stages.scanning')}
      </div>
      <div className="item item-3">
        {t('verification.loader.stages.validity')}
      </div>
      <div className="item item-4">
        {t('verification.loader.stages.processing')}
      </div>
      <div className="item item-5">
        {t('verification.loader.stages.revise')}
      </div>
      <div className="item item-6">
        {t('verification.loader.stages.decision')}
      </div>
    </div>
    <div className={cx('message', verifyStatus.toLowerCase())}>
      <div className="img" />
      <p>{t(`verification.loader.results.${verifyStatus.toLowerCase()}`)}</p>
      <Link
        to="/account"
        className="button bordered"
      >
        {t('verification.loader.close')}
      </Link>
    </div>
  </div>
)

Loader.propTypes = {
  t: PropTypes.func.isRequired,
  verifyStatus: PropTypes.string,
}

Loader.defaultProps = {
  verifyStatus: 'Pending',
}

const mapStateToProps = (state) => ({
  verifyStatus: state.auth.verifyStatus,
})

export default compose(
  translate(),
  connect(mapStateToProps)
)(Loader)
