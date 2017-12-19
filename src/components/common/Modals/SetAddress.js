import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Modal from './Modal'
import * as actions from '../../../actions'
import SetAddressForm from './Forms/SetAddress'

const SetAddress = ({ t, closeModal, modalState }) => (
  <Modal title={t('account.setETHAddress.title')} closeModal={closeModal} modalState={modalState}>
    <SetAddressForm />
  </Modal>
)

SetAddress.propTypes = {
  t: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  modalState: state.account.modals.setAddress,
})

const mapDispatchToProps = {
  closeModal: () => actions.account.modals.changeState('setAddress', 'close'),
}

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SetAddress)
