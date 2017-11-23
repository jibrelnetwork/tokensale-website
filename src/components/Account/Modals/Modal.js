import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ closeModal, children, title, modalState }) => (
  <div className={`modal ${modalState}`}>
    <div className="modal-overlay" onClick={closeModal} />
    <div className="modal-content">
      {title && <div className="modal-title">{title}</div>}
      <div className="modal-close" onClick={closeModal} />
      <div className="modal-body">{(modalState !== 'close') && children}</div>
    </div>
  </div>
)

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  /* optional */
  modalState: PropTypes.oneOf(['open', 'close', 'opening', 'closing']),
  title: PropTypes.string,
}

Modal.defaultProps = {
  modalState: 'close',
  title: undefined,
}

export default Modal
