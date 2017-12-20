import cx from 'classnames'
import React from 'react'
import numeral from 'numeral'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { translate, Interpolate } from 'react-i18next'

import * as actions from '../../../actions'

const Balance = ({ openWithdrawModal, balance, t /* , address */ }) => (
  <div className="Balance">
    <div
      className={cx('button bordered pull-right', { disabled: false /* !(address && balance) */})}
      onClick={openWithdrawModal /* (address && balance) ? openWithdrawModal : null */}
    >
      {t('account.withdraw.button')}
    </div>
    <div className="balance pull-right">
      <Interpolate
        i18nKey="account.balance"
        amount={numeral(balance).format('0.00')}
      />
    </div>
  </div>
)

Balance.propTypes = {
  t: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
  openWithdrawModal: PropTypes.func.isRequired,
  /* optional */
  // address: PropTypes.string,
}

Balance.defaultProps = {
  // address: undefined,
}

const mapStateToProps = (state) => ({
  // address: state.account.address,
  balance: state.account.balance,
})

const mapDispatchToProps = {
  openWithdrawModal: () => actions.account.modals.changeState('withdraw', 'open'),
  requestStart: actions.account.balance.request,
  requestCancel: actions.account.balance.requestCancel,
}

const enhance = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    /* eslint-disable fp/no-this */
    componentDidMount() { this.props.requestStart() },
    componentWillUnmount() { this.props.requestCancel() },
    /* eslint-enable */
  }),
)

export default enhance(Balance)
