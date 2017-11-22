import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Modal from './Modal'
import SetPasswordForm from './Forms/SetPassword'
import * as actions from '../../../actions'

const SetPassword = ({ closeModal, modalState }) => (
  <Modal title="Set New Password" closeModal={closeModal} modalState={modalState}>
    <SetPasswordForm />
  </Modal>
)

SetPassword.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  modalState: state.account.modals.setPassword,
})

const mapDispatchToProps = {
  closeModal: () => actions.account.modals.changeState('setPassword', 'close'),
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword)
