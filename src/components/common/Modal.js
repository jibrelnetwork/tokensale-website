import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ onClose, children, title, isOpen }) => (
  <div className="Modal">
    <div className={`modal ${isOpen ? 'open' : 'close'}`}>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-close" onClick={onClose} />
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
)

Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

Modal.defaultProps = {
  title: undefined,
  isOpen: false,
}

export default Modal
