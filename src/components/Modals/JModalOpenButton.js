// @flow

import React from 'react'
import { connect } from 'react-redux'
import type { Node } from 'react'

import { showModal } from '../../modules/modals'
import type { PopupNames } from '../../modules/modals'

type Props = {
  modalName: PopupNames,
  className?: string,
  children: Node,
  onShowModalClick: Function
}

const JModalOpenButton = ({ className, children, modalName, onShowModalClick }: Props) => (
  <button
    onClick={(e) => { onShowModalClick(modalName); e.preventDefault() }}
    className={className}
  >
    {children}
  </button>
)

JModalOpenButton.defaultProps = {
  className: '',
}

const mapDispatchToProps = (dispatch: Function) => ({
  onShowModalClick: (modalName) => dispatch(showModal(modalName)),
})

export default connect(
  null,
  mapDispatchToProps
)(JModalOpenButton)
