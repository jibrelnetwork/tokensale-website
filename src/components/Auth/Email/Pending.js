// @flow

import React from 'react'
import { compose } from 'lodash/fp'
import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import type { TFunction } from 'react-i18next'

import { accountEmailVerify } from '../../../modules'

type Props = {
  t: TFunction
}

const Pending = ({ t }: Props) => (
  <div className="email-verification">
    <div className="img pending" />
    <p>{t('auth.emailVerification.inProgress')}</p>
  </div>
)

const mapDispatchToProps = {
  accountEmailVerify,
}

const enhance = compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      // console.log(1111)
      // eslint-disable-next-line fp/no-this
      console.log(this.props.match.params.key)
      // eslint-disable-next-line fp/no-this
      this.props.accountEmailVerify(this.props.match.params.key)
      // accountEmailVerify(this.props.match.params.key)
    },
  }),
)


export default enhance(Pending)
