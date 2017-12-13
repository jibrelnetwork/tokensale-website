import React from 'react'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'

import * as actions from '../../../actions'

const Request = () => (
  <div className="withdraw-confirm">
    <div className="img loading" />
    <p>Withdraw confirmation...</p>
  </div>
)

const mapDispatchToProps = {
  withdrawConfirm: actions.account.balance.withdrawConfirm,
}

const enhance = compose(
  connect(
    undefined,
    mapDispatchToProps,
  ),
  lifecycle({
    componentWillMount() {
      /* eslint-disable fp/no-this */
      const { operationId, token } = this.props.match.params
      this.props.withdrawConfirm(operationId, token)
    },
  }),
)


export default enhance(Request)

