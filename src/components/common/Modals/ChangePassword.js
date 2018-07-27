import cx from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'lodash/fp'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import { Modal } from '../../common'
import * as actions from '../../../actions'

const ICONS = {
  confirm: 'gear',
  request: 'request',
  success: 'done',
  failure: 'error',
}

const BUTTON = {
  failure: 'account.changePassword.repeat',
  confirm: 'account.changePassword.submit',
  success: 'account.changePassword.close',
  request: undefined,
}

const ChangePasswordModal = ({
  t,
  close,
  isOpen,
  status,
  sendRequest,
  errorMessage,
}) => (
  <div className="ChangePasswordModal" style={{ display: 'none' }}>
    <Modal isOpen={isOpen} onClose={close}>
      <div className={cx('icon', ICONS[status])} />
      <div className="text">
        {status === 'failure'
          ? errorMessage || t('account.changePassword.failure')
          : t(`account.changePassword.${status}`)
        }
      </div>
      <div className="buttons center">
        <button
          type="submit"
          onClick={
            ['confirm', 'failure'].includes(status)
              ? sendRequest
              : close
          }
          disabled={status === 'request'}
          className="button bordered"
        >
          {t(BUTTON[status])}
        </button>
      </div>
    </Modal>
  </div>
)

ChangePasswordModal.propTypes = {
  t: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  status: PropTypes.oneOf([
    'request', // Request to password change sended to server
    'success', // Email with password reset link sended to user
    'failure', // Error of sending password reset link to user
    'confirm', // Waiting confirmation from user for password change
  ]),
  sendRequest: PropTypes.func.isRequired,
  errorMessage: PropTypes.func,
}

ChangePasswordModal.defaultProps = {
  status: undefined,
  errorMessage: undefined,
}

const mapStateToProps = (state) => ({
  isOpen: state.account.passwordChangeConfirmModal.isOpen,
  status: state.account.passwordChangeConfirmModal.status,
  errorMessage: state.account.passwordChangeConfirmModal.error,
})

const mapDispatchToProps = {
  open: actions.account.password.openChangeConfirm,
  close: actions.account.password.closeChangeConfirm,
  sendRequest: actions.account.password.changeConfirmRequest,
}

const enhance = compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)

export default enhance(ChangePasswordModal)
