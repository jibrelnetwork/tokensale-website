import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'

import * as actions from '../../../actions'

const Pending = ({ t }) => (
  <div className="email-verification">
    <div className="img pending" />
    <p>{t('auth.emailVerification.inProgress')}</p>
  </div>
)

const mapDispatchToProps = {
  verifyEmail: actions.auth.email.verify,
}

Pending.propTypes = {
  t: PropTypes.func.isRequired,
}

const enhance = compose(
  translate(),
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
