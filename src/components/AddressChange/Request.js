import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { translate } from 'react-i18next'

import * as actions from '../../../actions'

const Request = ({ t }) => (
  <div className="address-change-confirm">
    <div className="img loading" />
    <p>{t('confirmations.changeAddress.request')}</p>
  </div>
)

Request.propTypes = {
  t: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  addressChangeConfirm: actions.account.address.changeConfirm,
}

const enhance = compose(
  translate(),
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
