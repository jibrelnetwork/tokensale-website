import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import * as actions from '../../../actions'

const Balance = ({ balance }) => (
  <div className="Balance">
    <div className="button bordered pull-right">Withdraw</div>
    <div className="balance pull-right">{`Balance – ${balance} JNT`}</div>
  </div>
)

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  balance: state.account.balance,
})

const mapDispatchToProps = {
  download: actions.account.balance.request,
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentWillMount() {
      // eslint-disable-next-line fp/no-this
      this.props.download()
    },
  }),
)

export default enhance(Balance)
