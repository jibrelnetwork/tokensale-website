// @flow

import React from 'react'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import {
  accountWithdrawConfirm,
} from '../../modules'

type Props = {
  t: TFunction,
}

const Request = ({ t }: Props) => (
  <div className="withdraw-confirm">
    <div className="img loading" />
    <p>{t('confirmations.withdraw.request')}</p>
  </div>
)

const mapDispatchToProps = {
  withdrawConfirm: accountWithdrawConfirm,
}

const enhance = compose(
  translate(),
  connect(
    undefined,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      /* eslint-disable fp/no-this */
      const { operationId, token } = this.props.match.params
      this.props.withdrawConfirm(operationId, token)
    },
  }),
)


export default enhance(Request)

