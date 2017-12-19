import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'

const Modal = ({ onClose, children, title, isOpen }) => (
  <Transition in={isOpen} timeout={300}>
    {(state) => (
      <div className={`Modal ${state}`}>
        <div className="overlay" onClick={onClose} />
        <div className="content">
          {title && <div className="title">{title}</div>}
          <div className="close" onClick={onClose} />
          <div className="body">{children}</div>
        </div>
      </div>
    )}
  </Transition>
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
