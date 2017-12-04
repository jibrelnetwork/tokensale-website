import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Modal from './Modal'
import KYCStatusForm from './Forms/KYCStatus'
import * as actions from '../../../actions'

const KYCStatus = ({ closeModal, modalState }) => (
  <Modal closeModal={closeModal} modalState={modalState}>
    <KYCStatusForm />
  </Modal>
)

KYCStatus.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  modalState: state.account.modals.kycStatus,
})

const mapDispatchToProps = {
  closeModal: () => actions.account.modals.changeState('kycStatus', 'close'),
}

export default connect(mapStateToProps, mapDispatchToProps)(KYCStatus)
