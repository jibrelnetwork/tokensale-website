// @flow

import React from 'react'
import numeral from 'numeral'
import PropTypes from 'prop-types'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { translate, Interpolate } from 'react-i18next'

import { JModalOpenButton } from '../../Modals'

type Props = {
  t: TFunction,
  balance: number,
}

const Balance = ({ balance, t /* , address */ }: Props) => (
  <div className="Balance">
    <JModalOpenButton modalName="withdraw" className="button small dark pull-right">
      {t('account.withdraw.button')}
    </JModalOpenButton>
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
const enhance = compose(
  translate(),
  connect(
    mapStateToProps,
  )
)

export default enhance(Balance)
