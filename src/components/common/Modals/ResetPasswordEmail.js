import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'

import { translate } from 'react-i18next'

import Modal from './Modal'
import ResetPasswordForm from '../../Auth/Password/Reset'
import * as actions from '../../../actions'

const ResetPasswordEmail = ({ t, closeModal, modalState }) => (
  <Modal closeModal={closeModal} modalState={modalState} title={t('auth.sendResetPasswordEmail.title')}>
    <ResetPasswordForm />
  </Modal>
)

ResetPasswordEmail.propTypes = {
  t: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  modalState: state.account.modals.resetPasswordEmail,
})

const mapDispatchToProps = {
  closeModal: () => actions.account.modals.changeState('resetPasswordEmail', 'close'),
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ResetPasswordEmail)
