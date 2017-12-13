import React from 'react'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'

import * as actions from '../../../actions'

const Request = () => (
  <div className="address-change-confirm">
    <div className="img loading" />
    <p>ETH address change confirmation...</p>
  </div>
)

const mapDispatchToProps = {
  addressChangeConfirm: actions.account.address.changeConfirm,
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
      this.props.addressChangeConfirm(operationId, token)
    },
  }),
)


export default enhance(Request)
