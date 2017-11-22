import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Modal from './Modal'
import SetAddressForm from './Forms/SetAddress'
import * as actions from '../../../actions'

const SetAddress = ({ closeModal, modalState }) => (
  <Modal title="Set Address" closeModal={closeModal} modalState={modalState}>
    <SetAddressForm />
  </Modal>
)

SetAddress.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  modalState: state.account.modals.setAddress,
})

const mapDispatchToProps = {
  closeModal: () => actions.account.modals.changeState('setAddress', 'close'),
}

export default connect(mapStateToProps, mapDispatchToProps)(SetAddress)
