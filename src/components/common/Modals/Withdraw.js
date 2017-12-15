import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Modal from './Modal'
import WithdrawForm from './Forms/Withdraw'
import * as actions from '../../../actions'

const Withdraw = ({ closeModal, modalState }) => (
  <Modal closeModal={closeModal} modalState={modalState}>
    <WithdrawForm />
  </Modal>
)

Withdraw.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  modalState: state.account.modals.withdraw,
})

const mapDispatchToProps = {
  closeModal: () => actions.account.modals.changeState('withdraw', 'close'),
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw)
