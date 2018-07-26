import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'

import { translate } from 'react-i18next'

import Modal from './Modal'
import RegisterForm from '../../Auth/Register'
import * as actions from '../../../actions'

const RegisterModal = ({ t, closeModal, modalState }) => (
  <Modal closeModal={closeModal} modalState={modalState} title={t('index.header.registration')}>
    <RegisterForm />
  </Modal>
)

RegisterModal.propTypes = {
  t: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  modalState: state.account.modals.registerModal,
})

const mapDispatchToProps = {
  closeModal: () => actions.account.modals.changeState('registerModal', 'close'),
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RegisterModal)
