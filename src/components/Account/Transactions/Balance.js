// @flow

import React from 'react'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Interpolate } from 'react-i18next'

import { ModalOpenButton } from '../../common'

type Props = {
  balance: number,
}

const Balance = ({ balance /* , address */ }: Props) => (
  <div className="Balance">
    <ModalOpenButton
      modalName="withdraw"
      className="pull-right"
      value="account.withdraw.button"
    />
    <div className="balance pull-right">
      <Interpolate
        i18nKey="account.balance"
        amount={numeral(balance).format('0.00')}
      />
    </div>
  </div>
)

Balance.defaultProps = {
  // address: undefined,
}

const mapStateToProps = (state) => ({
  // address: state.account.address,
  balance: state.account.balance,
})

export default connect(
  mapStateToProps,
)(Balance)
