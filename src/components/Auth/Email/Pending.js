import React from 'react'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import * as actions from '../../../actions'

const Pending = () => (
  <div className="email-verification">
    <div className="img pending" />
    <p>
      Validating your email...
    </p>
  </div>
)

const mapDispatchToProps = {
  verifyEmail: actions.auth.email.verify,
}

const enhance = compose(
  connect(
    undefined,
    mapDispatchToProps,
  ),
  lifecycle({
    componentWillMount() {
      // eslint-disable-next-line fp/no-this
      this.props.verifyEmail(this.props.match.params.key)
    },
  }),
)


export default enhance(Pending)
