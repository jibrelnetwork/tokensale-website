// @flow

import React from 'react'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import {
  accountAddressChangeConfirm,
} from '../../modules'

type Props = {
  t: TFunction,
}

const Request = ({ t }: Props) => (
  <div className="address-change-confirm">
    <div className="img loading" />
    <p>{t('confirmations.changeAddress.request')}</p>
  </div>
)

const mapDispatchToProps = {
  addressChangeConfirm: accountAddressChangeConfirm,
}

const enhance = compose(
  translate(),
  connect(
    null,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      /* eslint-disable fp/no-this */
      const { operationId, token } = this.props.match.params
      this.props.addressChangeConfirm(operationId, token)
    },
  }),
)


export default enhance(Request)
