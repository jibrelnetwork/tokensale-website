import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ closeModal, children, title, modalState }) => (
  <div className={`modal ${modalState}`}>
    <div className="modal-overlay" onClick={closeModal} />
    <div className="modal-content">
      <div className="modal-header">
        <div className="modal-title">{title}</div>
        <div className="modal-close" onClick={closeModal} />
      </div>
      <div className="modal-body">{(modalState !== 'close') && children}</div>
    </div>
  </div>
)

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  /* optional */
  modalState: PropTypes.oneOf(['open', 'close', 'opening', 'closing']),
}

Modal.defaultProps = {
  modalState: 'close',
}

export default Modal
