// @flow

import React from 'react'
import type { Node } from 'react'

import { compose } from 'ramda'
import { connect } from 'react-redux'

import { translate } from 'react-i18next'
import type { TFunction } from 'react-i18next'

import {
  LoginForm,
  RegisterForm,
  PasswordResetEmailForm,
  DocumentSkipUpload,
} from '../Auth'

import { closeModals } from '../../modules'
import { modalsSelector } from '../../selectors/modals'

import type { State } from '../../modules'
import type { PopupState, PopupNames } from '../../modules/modals'

type Props = {
  t: TFunction,
  closeModal: Function,
  modalState: PopupState,
  modalName: PopupNames,
}

const selectModalContent = (modalName: PopupNames): Node => {
  switch (modalName) {
    case 'login':
      return <LoginForm />

    case 'register':
      return <RegisterForm />

    case 'resetPasswordEmail':
      return <PasswordResetEmailForm />

    case 'documentSkipUpload':
      return <DocumentSkipUpload />

    default:
      return <div />
  }
}

const translateTitle = (t: TFunction, modalName: PopupNames): string => t(`modals.title.${modalName}`)

const Modal = ({ t, closeModal, modalState, modalName }: Props) => (
  <div className={`modal ${modalState || 'close'}`}>
    <div className="modal-overlay" onClick={closeModal} />
    <div className="modal-content">
      {translateTitle(t, modalName) && <div className="modal-title">{translateTitle(t, modalName)}</div>}
      <div className="modal-close" onClick={closeModal} />
      <div className="modal-body">{(modalState !== 'close') && selectModalContent(modalName)}</div>
    </div>
  </div>
)

const mapStateToProps = (state: State) => ({
  modalState: modalsSelector(state).modalState,
  modalName: modalsSelector(state).modalName,
})

const mapDispatchToProps = (dispatch: Function) => ({
  closeModal: () => dispatch(closeModals()),
})

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Modal)
