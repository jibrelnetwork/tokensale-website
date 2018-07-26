import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'

import { translate } from 'react-i18next'

import Modal from './Modal'
import LoginForm from '../../Auth/Login'
import * as actions from '../../../actions'

const LoginModal = ({ t, closeModal, modalState }) => (
  <Modal closeModal={closeModal} modalState={modalState} title={t('index.header.login')}>
    <LoginForm />
  </Modal>
)

LoginModal.propTypes = {
  t: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  modalState: state.account.modals.loginModal,
})

const mapDispatchToProps = {
  closeModal: () => actions.account.modals.changeState('loginModal', 'close'),
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginModal)
