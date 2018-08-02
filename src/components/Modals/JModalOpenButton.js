// @flow

import React from 'react'
import { connect } from 'react-redux'

import { showModal } from '../../modules/modals'

/* ::
import type { Node } from 'react'
import type { PopupNames } from '../../modules'
*/
type Props = {
  modalName: PopupNames,
  className?: string,
  children: Node,
  onShowModalClick: Function
}

const JModalOpenButton = ({ className, children, modalName, onShowModalClick }: Props) => (
  <a
    href="#"
    onClick={(e) => { onShowModalClick(modalName); e.preventDefault() }}
    className={className}
  >
    {children}
  </a>
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
